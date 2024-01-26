import React, { useState, useEffect } from "react";
import "../containers/styles/RegisterPage.css";
import Input from "../components/Input";
import RegisterButton from "../components/RegisterButton";

const initialFormFields = ["Phone Number"];
const additionalFormFields = [
    "Verification Code",
    "Dexcom Username",
    "Dexcom Password",
    "Your Name",
];

function RegisterPage() {
    const [formData, setFormData] = useState({
        "Phone Number": "",
        "Verification Code": "",
        "Dexcom Username": "",
        "Dexcom Password": "",
        "Your Name": "",
    });

    const [currentFormFields, setCurrentFormFields] =
        useState(initialFormFields);
    const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);

    const handleChange = (field) => (event) => {
        setFormData({ ...formData, [field]: event.target.value });
    };

    const handlePhoneNumberSubmit = async (event) => {
        event.preventDefault();
        if (!formData["Phone Number"]) return;

        try {
            const response = await fetch("http://localhost:3000/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ phoneNumber: formData["Phone Number"] }),
            });

            const message = await response.text();

            if (!response.ok) {
                throw new Error(
                    `HTTP error! status: ${response.status} - ${message}`
                );
            }

            console.log(message);
            setIsVerificationCodeSent(true);
            setCurrentFormFields(additionalFormFields);
        } catch (error) {
     
            console.error("There was an error!", error);
        }
    };
    const handleCompleteRegistration = async (event) => {
        event.preventDefault();
        if (isVerificationCodeSent) {
            try {
                const response = await fetch(
                    "http://localhost:3000/users/signup/complete",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(formData),
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data);
            } catch (error) {

                console.error("There was an error!", error);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center bg-background-purple">
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
                            {" "}
                            Login here!
                        </a>
                    </p>
                </div>
                <div className="w-full max-w-xs">
                    <form
                        onSubmit={
                            isVerificationCodeSent
                                ? handleCompleteRegistration
                                : handlePhoneNumberSubmit
                        }
                        className="space-y-4 bg-white p-4 shadow rounded-lg"
                    >
                        {currentFormFields.map((fieldName, index) => (
                            <Input
                                key={index}
                                type={
                                    fieldName === "Phone Number" ||
                                    fieldName === "Verification Code"
                                        ? "tel"
                                        : fieldName === "Dexcom Password"
                                        ? "password"
                                        : "text"
                                }
                                placeholder={fieldName}
                                value={formData[fieldName]}
                                onChange={handleChange(fieldName)}
                                disabled={
                                    currentFormFields.length > 1 &&
                                    fieldName === "Phone Number"
                                }
                            />
                        ))}

                        <RegisterButton
                            type="submit"
                            disabled={
                                !formData["Phone Number"] &&
                                !isVerificationCodeSent
                            }
                        >
                            {isVerificationCodeSent ? "Register" : "Submit"}
                        </RegisterButton>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
