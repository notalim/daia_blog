import React, { useState, useEffect } from "react";
import "../containers/styles/RegisterPage.css";
import Input from "../components/Input";
import PhoneNumberInput from "../components/PhoneNumberInput";
import GradientBackground from "../components/GradientBackground";
import RegisterButton from "../components/RegisterButton";

import API from "../services/apiClient";

const initialFormFields = ["Phone Number"];
const additionalFormFields = [
    "Verification Code",
    "Dexcom Username",
    "Dexcom Password",
    "Your Name",
    "Password",
    "Confirm Password",
];

function RegisterPage() {
    const [formData, setFormData] = useState({
        "Phone Number": "",
        "Verification Code": "",
        "Dexcom Username": "",
        "Dexcom Password": "",
        "Your Name": "",
        Password: "",
        "Confirm Password": "",
    });

    const [currentFormFields, setCurrentFormFields] =
        useState(initialFormFields);

    const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);

    const handleChange = (field) => (event) => {
        setFormData({ ...formData, [field]: event.target.value });
    };

    useEffect(() => {
        if (isVerificationCodeSent) {
            setCurrentFormFields(additionalFormFields);
        }
    }, [isVerificationCodeSent]);

    const getInputType = (fieldName) => {
        switch (fieldName) {
            case "Dexcom Password":
            case "Password":
            case "Confirm Password":
                return "password";
            case "Verification Code":
                return "tel";
            default:
                return "text";
        }
    };

    const handlePhoneNumberSubmit = async (event) => {
        event.preventDefault();
        if (!formData["Phone Number"]) return;

        let concatPhoneNumber =
            "+1" + formData["Phone Number"].replace(/\D/g, "");

        try {
            const { data, error } = await API.registerUser({
                phoneNumber: concatPhoneNumber,
            });

            if (error) {
                throw new Error(`HTTP error! - ${error}`);
            }

            let concatPhoneNumber = "+1" + formData["Phone Number"];

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
                let concatPhoneNumber =
                    "+1" + formData["Phone Number"].replace(/\D/g, "");

                const { data, error } = await API.completeRegistration({
                    phoneNumber: concatPhoneNumber,
                    code: formData["Verification Code"],
                    dexcomUser: formData["Dexcom Username"],
                    dexcomPass: formData["Dexcom Password"],
                    name: formData["Your Name"],
                    password: formData["Password"],
                    confirmPassword: formData["Confirm Password"],
                });

                if (error) {
                    throw new Error(`HTTP error! status: ${error}`);
                }
                // console.log(formData);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                console.log(response);
            } catch (error) {
                console.error("There was an error!", error);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-purple relative">
            <GradientBackground />
            <div className="z-10 w-full max-w-6xl mx-auto flex justify-between items-start">
                <div className="flex-1">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                        Sign Up for Live Glucose <br />
                        Tracking and Instant Alerts
                    </h2>
                    <p className="text-lg mb-8">
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
                <div className="flex-1 bg-white bg-opacity-50 p-4 shadow rounded-lg">
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold">Welcome!</h2>
                    </div>
                    <form
                        onSubmit={
                            isVerificationCodeSent
                                ? handleCompleteRegistration
                                : handlePhoneNumberSubmit
                        }
                        className="flex flex-col items-end"
                    >
                        <div className="flex flex-col items-end mb-4">
                            <label className="text-gray-500 mr-2 mb-2">
                                +1
                            </label>
                            <PhoneNumberInput
                                placeholder="Phone Number"
                                onChange={handleChange("Phone Number")}
                                value={formData["Phone Number"]}
                                disabled={currentFormFields.length > 1}
                            />
                        </div>
                        {currentFormFields
                            .filter((fieldName) => fieldName !== "Phone Number")
                            .map((fieldName, index) => (
                                <Input
                                    key={index}
                                    type={getInputType(fieldName)}
                                    placeholder={fieldName}
                                    value={formData[fieldName]}
                                    onChange={handleChange(fieldName)}
                                    className="mb-4"
                                />
                            ))}
                        <div className="mt-4">
                            <RegisterButton
                                type="submit"
                                disabled={
                                    !formData["Phone Number"] &&
                                    !isVerificationCodeSent
                                }
                                className="w-full"
                            >
                                {isVerificationCodeSent
                                    ? "Complete Registration"
                                    : "Send Code"}
                            </RegisterButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
