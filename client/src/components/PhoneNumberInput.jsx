import React from "react";
import MaskedInput from "react-text-mask";
import { Button } from "@src/@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";

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
                className="flex h-10 w-full rounded-md border border-mid-purple px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-dim-purple focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-lavender-purple"
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
                    className="clear-button text-gray-500 focus:outline-none transition duration-300 ease-in-out bg-full-purple hover:hover-full-purple absolute right-0 mx-2 p-1.5 h-6 w-6"
                    size="icon"
                >
                    <Cross2Icon className="h-4 w-4" />
                </Button>
            )}
        </div>
    );
}

export default PhoneNumberInput;
