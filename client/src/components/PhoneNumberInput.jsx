import React from "react";
import MaskedInput from "react-text-mask";
import { Button } from "@src/@/components/ui/button";
import { Cross2Icon } from '@radix-ui/react-icons';

function PhoneNumberInput({ onChange, value, disabled }) {
    const phoneMask = [
        "(",
        /[1-9]/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
    ];

    const handlePhoneChange = (event) => {
        onChange(event);
    };

    const clearInput = () => {
        handlePhoneChange({ target: { value: "" } });
    };

    return (
        <div className="flex items-center relative">
            <span className="text-gray-500 mr-2">+1</span>
            <MaskedInput
                mask={phoneMask}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 p-3 h-10"
                placeholder="Phone Number"
                guide={false}
                value={value}
                onChange={handlePhoneChange}
                disabled={disabled}
            />
            {/* Clear button */}
            {value && (
                <Button
                    type="button"
                    onClick={clearInput}
                    className="clear-button text-gray-500 focus:outline-none transition duration-300 ease-in-out hover:text-red-500 absolute right-0 mx-2 p-1.5 h-6 w-6"
                    variant="outline" 
                    size="icon"
                >
                    <Cross2Icon className="h-4 w-4"/>
                </Button>
            )}
        </div>
    );
}

export default PhoneNumberInput;
