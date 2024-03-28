import moment from "moment-timezone";
import "chartjs-adapter-moment";

export const createGhostPoint = (time, y = null) => {
    return {
        x: time.format("YYYY-MM-DDTHH:mm:ss"),
        y: y,
        missing: true,
    };
};

export const interpolateY = (currentTime, momentData) => {
    // Find the closest point before the current time
    let beforePoint = null;
    let afterPoint = null;

    for (let i = 0; i < momentData.length; i++) {
        if (moment(momentData[i].moment).isBefore(currentTime)) {
            beforePoint = momentData[i];
        } else if (
            moment(momentData[i].moment).isAfter(currentTime) &&
            afterPoint == null
        ) {
            afterPoint = momentData[i];
            break; // Found the immediate next point, exit the loop
        }
    }

    // Ensure we have valid points to interpolate between
    if (beforePoint && afterPoint) {
        let slope =
            (afterPoint.Value - beforePoint.Value) /
            moment(afterPoint.moment).diff(
                moment(beforePoint.moment),
                "milliseconds"
            );
        let interpolatedY =
            beforePoint.Value +
            slope *
                currentTime.diff(moment(beforePoint.moment), "milliseconds");

        return Math.round(interpolatedY);
    }

    // If we can't interpolate, return null
    return null;
};

export const processData = (data) => {
    const intervalCount = 12; // The number of data points we expect
    const expectedInterval = 5 * 60 * 1000; // 5 minutes in milliseconds
    const results = [];

    const validData = data.filter((entry) => entry != null);

    // Sort the incoming data by time
    const sortedData = validData
        .map((dp) => ({
            ...dp,
            moment: moment(dp.WT),
            Value: dp.Value,
        }))
        .sort((a, b) => a.moment.valueOf() - b.moment.valueOf());

    // The end time is the last data point's time
    const endTime =
        sortedData.length > 0
            ? sortedData[sortedData.length - 1].moment
            : moment();
    const startTime = endTime
        .clone()
        .subtract((intervalCount - 1) * expectedInterval, "milliseconds");

    let lastKnownValue = null;
    for (let i = 0; i < intervalCount; i++) {
        let expectedTime = startTime
            .clone()
            .add(i * expectedInterval, "milliseconds");

        let realPoint = sortedData.find((d) =>
            moment(d.moment).isSame(expectedTime, "minute")
        );
        if (realPoint) {
            results.push({
                x: realPoint.moment.format("YYYY-MM-DDTHH:mm:ss"),
                y: realPoint.Value,
                missing: false,
            });
            lastKnownValue = realPoint.Value;
        } else {
            let interpolatedY = interpolateY(expectedTime, sortedData);
            if (interpolatedY !== null) {
                results.push(createGhostPoint(expectedTime, interpolatedY));
            } else if (lastKnownValue !== null) {
                results.push(createGhostPoint(expectedTime, lastKnownValue));
            } else {
                // If there's no last known value, we have no basis to create a ghost point, so do nothing
                // This should only happen if there's no data at the start of the hour
            }
        }
    }
    while (results.length < intervalCount) {
        let timeToAdd = moment(results[0].x).subtract(
            expectedInterval,
            "milliseconds"
        );

        results.unshift(createGhostPoint(timeToAdd, lastKnownValue)); // Use the last known value or null
    }

    return results;
};
