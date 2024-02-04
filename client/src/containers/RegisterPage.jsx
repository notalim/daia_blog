import React, { useState, useEffect } from "react";
import "../containers/styles/RegisterPage.css";
import Input from "../components/Input";
import PhoneNumberInput from "../components/PhoneNumberInput";
import GradientBackground from "../components/GradientBackground";
import RegisterButton from "../components/RegisterButton";

import API from "../services/apiClient";
import validation from "../services/validation";

const initialFormFields = ["Phone Number"];
const additionalFormFields = [
    "Verification Code",
    "Dexcom Username",
    "Dexcom Password",
    "Your Name",
    "Password",
    "Confirm Password",
];

const validateRegistrationForm = (formData) => {
    const errors = {};
    if (
        !validation.phoneValidation(
            "+1" + formData["Phone Number"].replace(/\D/g, "")
        )
    ) {
        errors.phone = "Invalid phone number format";
    }
    if (!validation.codeValidation(formData["Verification Code"])) {
        errors.code = "Invalid verification code";
    }
    if (!validation.nameValidation(formData["Your Name"])) {
        errors.name = "Invalid name";
    }
    if (!validation.usernameValidation(formData["Dexcom Username"])) {
        errors.username = "Invalid username";
    }
    if (!validation.passwordValidation(formData["Password"])) {
        errors.password = "Invalid password format";
    }
    if (
        !validation.confirmPasswordValidation(
            formData["Password"],
            formData["Confirm Password"]
        )
    ) {
        errors.confirmPassword = "Passwords do not match";
    }
    return errors;
};

function RegisterPage() {
    const [error, setError] = useState("");

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
        setError("");

        if (!formData["Phone Number"]) {
            setError("Please enter your phone number.");
            return;
        }

        if (
            !validation.phoneValidation(
                "+1" + formData["Phone Number"].replace(/\D/g, "")
            )
        ) {
            setError("Invalid phone number format.");
            return;
        }

        try {
            let concatPhoneNumber =
                "+1" + formData["Phone Number"].replace(/\D/g, "");

            const { data, error } = await API.registerUser(concatPhoneNumber);

            if (error) {
                setError(error);
                return;
            }

            setIsVerificationCodeSent(true);
            setCurrentFormFields(additionalFormFields);
        } catch (error) {
            setError(error.message || "Failed to register. Please try again.");
        }
    };

    const handleCompleteRegistration = async (event) => {
        event.preventDefault();
        setError("");

        const errors = validateRegistrationForm(formData);
        if (Object.keys(errors).length > 0) {
            setError(Object.values(errors)[0]);
            return;
        }

        if (isVerificationCodeSent) {
            try {
                let concatPhoneNumber =
                    "+1" + formData["Phone Number"].replace(/\D/g, "");

                const { data, error } = await API.completeRegistration(
                    concatPhoneNumber,
                    formData["Verification Code"],
                    formData["Dexcom Username"],
                    formData["Dexcom Password"],
                    formData["Your Name"],
                    formData["Password"],
                    formData["Confirm Password"]
                );

                if (error) {
                    setError(error);
                    return;
                }
            } catch (error) {
                setError(
                    error.message ||
                        "Failed to complete registration. Please try again."
                );
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
                        {isVerificationCodeSent && (
                            <div className="text-dim-purple text-center mb-4">
                                Verification code has been sent
                            </div>
                        )}
                        {error && (
                            <div className="text-red-500 text-center">
                                {error}
                            </div>
                        )}
                        <div className="flex flex-col items-end mb-4">
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
