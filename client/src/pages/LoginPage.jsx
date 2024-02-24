import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../components/Input";
import RegisterButton from "../components/RegisterButton"; // Rename this as needed
import PhoneNumberInput from "../components/PhoneNumberInput";

import API from "../services/apiClient";
import validation from "../services/validation";
import { errorTypes } from "../services/errorTypes";

import useAuth from "../contexts/useAuth";

function LoginPage() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { loginUser, completeLogin } = useAuth();

    const handleChangePhoneNumber = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handleChangeVerificationCode = (event) => {
        setVerificationCode(event.target.value);
    };

    const handleSubmitPhoneNumber = async (event) => {
        event.preventDefault();
        setError("");

        if (!phoneNumber) {
            setError(errorTypes.PHONE_NUMBER_REQUIRED);
            return;
        }

        if (
            !validation.phoneValidation("+1" + phoneNumber.replace(/\D/g, ""))
        ) {
            setError(errorTypes.INVALID_PHONE_NUMBER);
            return;
        }

        try {
            const {data, error} = await loginUser( "+1" + phoneNumber.replace(/\D/g, ""));

            if (error) {
                setError(error);
                return;
            }

            
            if (data && !error) {
                setIsVerificationCodeSent(true);
            }
        } catch (error) {
            setError(error.message || "Failed to log in. Please try again.");
        }
    };

    const handleVerifyCode = async (event) => {
        event.preventDefault();
        setError("");

        if (!validation.codeValidation(verificationCode)) {
            setError(errorTypes.INVALID_VERIFICATION_CODE);
            return;
        }

        try {
            await completeLogin(
                "+1" + phoneNumber.replace(/\D/g, ""),
                verificationCode
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
                error.message || "Failed to verify code. Please try again."
            );
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
                    {isVerificationCodeSent && (
                        <div className="text-dim-purple text-center mb-4">
                            Verification code has been sent
                        </div>
                    )}
                    {error && (
                        <div className="text-red-500 text-center mb-4">
                            {error}
                        </div>
                    )}
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
