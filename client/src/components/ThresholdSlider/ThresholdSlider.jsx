// ThresholdSlider.jsx
import React, { useState } from "react";
import VerticalSlider from "./VerticalSlider";
import { Toast } from "@src/@/components/ui/toast";

const ThresholdSlider = ({ initialThreshold, onThresholdChange, onSave }) => {
    const [threshold, setThreshold] = useState(initialThreshold);
    const [showToast, setShowToast] = useState(false);

    const handleSave = () => {
        // Call onSave prop function when the save button is clicked
        onSave(threshold);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleChange = (newThreshold) => {
        setThreshold(newThreshold);
        onThresholdChange(newThreshold); 
    };

    return (
        <div className="flex flex-col items-center">
            <VerticalSlider
                min={50}
                max={400}
                value={threshold}
                onChange={(newValue) => setThreshold(newValue)} // This will update the threshold state in real-time as the slider moves
            />
            <button
                onClick={handleSave}
                className="mt-2 bg-full-purple hover:hover-full-purple text-white font-bold py-2 px-4 rounded mb-4"
            >
                Save
            </button>
            {showToast && (
                <Toast className="mt-4" variant="success">
                    Low Alarm saved!
                </Toast>
            )}
        </div>
    );
};

export default ThresholdSlider;
