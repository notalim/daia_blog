import * as SliderPrimitive from "@radix-ui/react-slider";
import { styled } from "@stitches/react";

const StyledTrack = styled(SliderPrimitive.Track, {
    backgroundColor: "gainsboro",
    position: "relative",
    flexGrow: 1,
});

const StyledRange = styled(SliderPrimitive.Range, {
    position: "absolute",
    backgroundColor: "dodgerblue",
});

const StyledThumb = styled(SliderPrimitive.Thumb, {
    display: "block",
    width: 25,
    height: 25,
    backgroundColor: "white",
    borderRadius: "50%",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
});

const StyledSlider = styled(SliderPrimitive.Root, {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    height: 200,
    width: 25,
});

const VerticalSlider = ({ min, max, value, onChange }) => {

    const handleValueChange = (values) => {
        const newValue = values[0];
        onChange(newValue);
    };

    return (
        <StyledSlider
            orientation="vertical"
            min={min}
            max={max}
            value={[value]} 
            onValueChange={handleValueChange} 
        >
            <StyledTrack>
                <StyledRange />
            </StyledTrack>
            <StyledThumb />
        </StyledSlider>
    );
};

export default VerticalSlider;
