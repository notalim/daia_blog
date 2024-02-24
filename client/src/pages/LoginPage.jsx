import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import useAuth from "../contexts/useAuth";
import { useToast } from "@src/@/components/ui/use-toast";

import Input from "../components/Input";
import RegisterButton from "../components/RegisterButton"; // Rename this as needed
import PhoneNumberInput from "../components/PhoneNumberInput";

import validation from "../services/validation";
import { errorTypes } from "../services/errorTypes";

import useProcessMessages from "../contexts/useProcessMessages";

function LoginPage() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { loginUser, completeLogin } = useAuth();
    const { processError, processSuccess } = useProcessMessages();

    const handleChangePhoneNumber = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handleChangeVerificationCode = (event) => {
        setVerificationCode(event.target.value);
    };

    const handleSubmitPhoneNumber = async (event) => {
        event.preventDefault();

        if (!phoneNumber) {
            processError(new Error(errorTypes.PHONE_NUMBER_REQUIRED));
            return;
        }

        if (
            !validation.phoneValidation("+1" + phoneNumber.replace(/\D/g, ""))
        ) {
            processError(new Error(errorTypes.INVALID_PHONE_NUMBER));
            return;
        }

        try {
            const { error } = await loginUser(
                "+1" + phoneNumber.replace(/\D/g, "")
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
    const handleVerifyCode = async (event) => {
        event.preventDefault();

        if (!validation.codeValidation(verificationCode)) {
            processError(new Error(errorTypes.INVALID_VERIFICATION_CODE));
            return;
        }

        try {
            const { error } = await completeLogin(
                "+1" + phoneNumber.replace(/\D/g, ""),
                verificationCode
            );
            if (error) {
                processError(new Error(error));
            } else {
                navigate("/dashboard");
            }
        } catch (error) {
            processError(error);
        }
    };
    return (
        <div className="min-h-screen flex items-center bg-background-purple">
            <div className="w-full max-w-4xl mx-auto flex justify-between items-start">
                <div className="space-y-6 p-8">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Log In for Live Glucose Tracking and Instant Alerts
                    </h2>
                    <p>
                        If you don’t have an account, you can
                        <a
                            href="/register"
                            className="text-purple-600 hover:text-purple-700"
                        >
                            {" "}
                            Sign up here!
                        </a>
                    </p>
                </div>
                <div className="w-full max-w-xs">
                    <form
                        onSubmit={
                            isVerificationCodeSent
                                ? handleVerifyCode
                                : handleSubmitPhoneNumber
                        }
                        className="space-y-4 bg-white p-4 shadow rounded-lg"
                    >
                        <div className="flex flex-col items-end mb-4">
                            <PhoneNumberInput
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={handleChangePhoneNumber}
                            />
                        </div>

                        {isVerificationCodeSent && (
                            <Input
                                type="tel"
                                placeholder="Verification Code"
                                value={verificationCode}
                                onChange={handleChangeVerificationCode}
                            />
                        )}
                        <RegisterButton
                            type="submit"
                            disabled={
                                isVerificationCodeSent
                                    ? !verificationCode
                                    : !phoneNumber
                            }
                        >
                            {isVerificationCodeSent ? "Verify" : "Log In"}
                        </RegisterButton>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
