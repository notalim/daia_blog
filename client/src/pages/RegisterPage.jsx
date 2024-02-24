import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../contexts/useAuth";
import validation from "../services/validation";
import { errorTypes } from "../services/errorTypes";
import useProcessMessages from "../contexts/useProcessMessages";

import Input from "../components/Input";
import RegisterButton from "../components/RegisterButton";
import PhoneNumberInput from "../components/PhoneNumberInput";
import GradientBackground from "../components/GradientBackground";

const initialFormFields = ["Phone Number"];
const additionalFormFields = [
    "Verification Code",
    "Your Name",
    "Dexcom Username",
    "Dexcom Password",
];

function RegisterPage() {
    const [formData, setFormData] = useState({
        "Phone Number": "",
        "Verification Code": "",
        "Your Name": "",
        "Dexcom Username": "",
        "Dexcom Password": "",
    });
    const [currentFormFields, setCurrentFormFields] =
        useState(initialFormFields);
    const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
    const { registerUser, completeRegistration } = useAuth();
    const { processError } = useProcessMessages();
    const navigate = useNavigate();

    const handleChange = (field) => (event) => {
        setFormData({ ...formData, [field]: event.target.value });
    };

    useEffect(() => {
        if (isVerificationCodeSent) {
            setCurrentFormFields(additionalFormFields);
        }
    }, [isVerificationCodeSent]);

    const handlePhoneNumberSubmit = async (event) => {
        event.preventDefault();

        if (!formData["Phone Number"]) {
            processError(new Error(errorTypes.PHONE_NUMBER_REQUIRED));
            return;
        }

        if (
            !validation.phoneValidation(
                "+1" + formData["Phone Number"].replace(/\D/g, "")
            )
        ) {
            processError(new Error(errorTypes.INVALID_PHONE_NUMBER));
            return;
        }

        try {
            const { error } = await registerUser(
                "+1" + formData["Phone Number"].replace(/\D/g, "")
            );
            if (error) {
                processError(new Error(error));
            } else {
                setIsVerificationCodeSent(true);
            }
        } catch (error) {
            processError(error);
        }
    };

    const handleCompleteRegistration = async (event) => {
        event.preventDefault();

        const errors = validateRegistrationForm(formData);
        if (Object.keys(errors).length > 0) {
            processError(new Error(Object.values(errors)[0]));
            return;
        }

        if (isVerificationCodeSent) {
            try {
                let concatPhoneNumber =
                    "+1" + formData["Phone Number"].replace(/\D/g, "");
                const { error } = await completeRegistration(
                    concatPhoneNumber,
                    formData["Verification Code"],
                    formData["Your Name"],
                    formData["Dexcom Username"],
                    formData["Dexcom Password"]
                );

                if (error) {
                    processError(new Error(error));
                } else {
                    navigate("/dashboard");
                }
            } catch (error) {
                processError(error);
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
