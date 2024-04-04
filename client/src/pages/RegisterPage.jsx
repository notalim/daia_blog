import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../contexts/useAuth";
import validation from "../services/validation";
import { errorTypes } from "../services/errorTypes";
import useProcessMessages from "../contexts/useProcessMessages";

// import Input from "../components/Input";
import PhoneNumberInput from "../components/PhoneNumberInput";
import GradientBackground from "../components/GradientBackground";
import RegisterButton from "../components/RegisterButton";
import { Button } from "@src/@/components/ui/button";
import { Input } from "@src/@/components/ui/input";
import { Label } from "@src/@/components/ui/label";
import OTP from "../components/OTP";

const initialFormFields = ["Phone Number"];
const additionalFormFields = [
    "Verification Code",
    "Your Name",
    "Dexcom Username",
    "Dexcom Password",
];

const getInputType = (fieldName) => {
    if (fieldName === "Phone Number") {
        return "tel";
    }
    if (fieldName === "Verification Code") {
        return "text";
    }
    return "text";
};

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
    const [verificationCode, setVerificationCode] = useState("");

    const { registerUser, completeRegistration } = useAuth();
    const { processError } = useProcessMessages();
    const navigate = useNavigate();

    const handleChange = (field) => (event) => {
        setFormData({ ...formData, [field]: event.target.value });
    };

    const handleChangeVerificationCode = (value) => {
        setFormData({ ...formData, "Verification Code": value });
    };

    useEffect(() => {
        if (isVerificationCodeSent) {
            setCurrentFormFields(additionalFormFields);
        }
    }, [isVerificationCodeSent]);

    const handlePhoneNumberSubmit = async (event) => {
        event.preventDefault();

        if (!formData["Phone Number"]) {
            processError(errorTypes.PHONE_NUMBER_REQUIRED);
            return;
        }

        if (
            !validation.phoneValidation(
                "+1" + formData["Phone Number"].replace(/\D/g, "")
            )
        ) {
            processError(errorTypes.INVALID_PHONE_NUMBER);
            return;
        }

        try {
            const { error } = await registerUser(
                "+1" + formData["Phone Number"].replace(/\D/g, "")
            );
            if (error) {
                processError(error);
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
            processError(Object.values(errors)[0]);
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
                    processError(error);
                } else {
                    navigate("/dashboard");
                }
            } catch (error) {
                processError(error);
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background-purple relative">
            <GradientBackground />
            <div className="z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
                <div className="flex-1 text-center mb-8">
                    <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                        Sign Up for Live Glucose <br />
                        Tracking and Instant Alerts
                    </h2>

                    <p className="text-lg">
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
                <form
                    onSubmit={
                        isVerificationCodeSent
                            ? handleCompleteRegistration
                            : handlePhoneNumberSubmit
                    }
                >
                    <div className="mb-2 w-full max-w-md">
                        <PhoneNumberInput
                            placeholder="Phone Number"
                            onChange={handleChange("Phone Number")}
                            value={formData["Phone Number"]}
                            disabled={isVerificationCodeSent}
                        />
                    </div>
                    {currentFormFields.map((fieldName, index) => {
                        if (fieldName === "Verification Code") {
                            return (
                                isVerificationCodeSent && (
                                    <OTP
                                        key={fieldName}
                                        value={formData["Verification Code"]}
                                        onChange={handleChangeVerificationCode}
                                    />
                                )
                            );
                        } else {
                            return (
                                <Input
                                    key={fieldName}
                                    type={getInputType(fieldName)}
                                    placeholder={fieldName}
                                    value={formData[fieldName]}
                                    onChange={handleChange(fieldName)}
                                    className="my-2 w-full max-w-md"
                                    disabled={
                                        !isVerificationCodeSent &&
                                        fieldName !== "Phone Number"
                                    }
                                />
                            );
                        }
                    })}
                    <div className="w-full max-w-md">
                        <RegisterButton
                            type="submit"
                            disabled={
                                !formData["Phone Number"] ||
                                (isVerificationCodeSent &&
                                    !formData["Verification Code"])
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
            <div className="mt-2 w-full max-w-md text-xs text-gray-700 text-center">
                Make sure to enable Dexcom Sharing
            </div>
        </div>
    );
}

export default RegisterPage;
