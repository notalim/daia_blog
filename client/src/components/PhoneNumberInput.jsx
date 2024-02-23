import React from "react";
import Input from "./Input";

import MaskedInput from "react-text-mask";

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

    return (
        <div className="flex items-center">
            <span className="text-gray-500 mr-2">+1</span>
            <MaskedInput
                mask={phoneMask}
                className="bg-input-background appearance-none border rounded-lg w-full py-3 px-4 text-input-text border-input-text leading-tight focus:outline-none focus:border-primary transition duration-300 ease-in-out"
                placeholder="Phone Number"
                guide={false}
                value={value}
                onChange={handlePhoneChange}
                disabled={disabled}
            />
            {/* You can add the (x) button here to clear the input */}
            {value && (
                <button
                    type="button"
                    onClick={() => handlePhoneChange({ target: { value: "" } })}
                    className="clear-button"
                >
                    x
                </button>
            )}
        </div>
    );
}

export default PhoneNumberInput;
