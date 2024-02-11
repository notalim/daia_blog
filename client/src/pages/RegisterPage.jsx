import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../components/Input";
import PhoneNumberInput from "../components/PhoneNumberInput";
import GradientBackground from "../components/GradientBackground";
import RegisterButton from "../components/RegisterButton";

import API from "../services/apiClient";
import validation from "../services/validation";
import { errorTypes } from "../services/errorTypes";

import useAuth from "../contexts/useAuth";

const initialFormFields = ["Phone Number"];
const additionalFormFields = [
    "Verification Code",
    "Your Name",
    "Dexcom Username",
    "Dexcom Password",
];

const validateRegistrationForm = (formData) => {
    const errors = {};
    if (
        !validation.phoneValidation(
            "+1" + formData["Phone Number"].replace(/\D/g, "")
        )
    ) {
        errors.phone = errorTypes.INVALID_PHONE_NUMBER;
    }
    if (!validation.codeValidation(formData["Verification Code"])) {
        errors.code = errorTypes.INVALID_VERIFICATION_CODE;
    }
    if (!validation.nameValidation(formData["Your Name"])) {
        errors.name = errorTypes.INVALID_NAME;
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
    });

    const [currentFormFields, setCurrentFormFields] =
        useState(initialFormFields);
    const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
    const {registerUser, completeRegistration} = useAuth();

    const handleChange = (field) => (event) => {
        setFormData({ ...formData, [field]: event.target.value });
    };

    useEffect(() => {
        if (isVerificationCodeSent) {
            setCurrentFormFields(additionalFormFields);
        }
    }, [isVerificationCodeSent]);

    const navigate = useNavigate();

    const getInputType = (fieldName) => {
        switch (fieldName) {
            case "Dexcom Password":
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
            setError(errorTypes.PHONE_NUMBER_REQUIRED);
            return;
        }

        if (
            !validation.phoneValidation(
                "+1" + formData["Phone Number"].replace(/\D/g, "")
            )
        ) {
            setError(errorTypes.INVALID_PHONE_NUMBER);
            return;
        }

        try {
            let concatPhoneNumber =
                "+1" + formData["Phone Number"].replace(/\D/g, "")

            await registerUser(concatPhoneNumber);

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

                await completeRegistration(
                    concatPhoneNumber,
                    formData["Verification Code"],
                    formData["Your Name"],
                    formData["Dexcom Username"],
                    formData["Dexcom Password"],
                );

                if (error) {
                    setError(error);
                    return;
                }

                if (!error) {
                    navigate("/dashboard");
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
