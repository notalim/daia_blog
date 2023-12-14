import React, { useState } from "react";
import "../containers/styles/RegisterPage.css";
import Input from "../components/Input";
import RegisterButton from "../components/RegisterButton";

const initialFormFields = [{ name: "Phone Number", type: "tel" }];

const additionalFormFields = [
    { name: "Verification Code", type: "tel" },
    { name: "Dexcom Username", type: "text" },
    { name: "Dexcom Password", type: "password" },
    { name: "Your Name", type: "text" },
];

function RegisterPage() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberEntered, setPhoneNumberEntered] = useState(false);
    const [formFields, setFormFields] = useState(initialFormFields);

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handlePhoneNumberSubmit = () => {

        if (!phoneNumber) return;
        
        setPhoneNumberEntered(true);
        setFormFields(additionalFormFields);
    };

    return (
        <div className="min-h-screen flex items-center bg-gradient-to-r from-brand to-brand-end">
            <div className="w-full max-w-4xl mx-auto flex justify-between items-start">
                <div className="space-y-6 p-8">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Sign Up for Live Glucose Tracking and Instant Alerts
                    </h2>
                    <p>
                        If you already have an account, you can
                        <a
                            href="/login"
                            className="text-purple-600 hover:text-purple-700"
                        >
                            Login here!
                        </a>
                    </p>
                </div>
                <div className="w-full max-w-xs">
                    <form className="space-y-4 bg-white p-4 shadow rounded-lg">
                        {formFields.map((field, index) => (
                            <Input
                                key={index}
                                type={field.type}
                                placeholder={field.name}
                                disabled={
                                    phoneNumberEntered &&
                                    field.name === "Phone Number"
                                }
                                onChange={
                                    field.name === "Phone Number"
                                        ? handlePhoneNumberChange
                                        : undefined
                                }
                                value={
                                    field.name === "Phone Number"
                                        ? phoneNumber
                                        : ""
                                }
                            />
                        ))}
                        <RegisterButton
                            onClick={handlePhoneNumberSubmit}
                            disabled={phoneNumberEntered && !phoneNumber}
                        >
                            {phoneNumberEntered ? "Register" : "Submit"}
                        </RegisterButton>
                    </form>
                    {/* ... Social Icons ... */}
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
