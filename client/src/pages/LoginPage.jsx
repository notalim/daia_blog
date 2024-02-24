import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../contexts/useAuth";
import { useToast } from "@src/@/components/ui/use-toast";

import PhoneNumberInput from "../components/PhoneNumberInput";

import RegisterButton from "../components/RegisterButton"; 
import GradientBackground from "../components/GradientBackground";

import validation from "../services/validation";
import { errorTypes } from "../services/errorTypes";

import { Input } from "@src/@/components/ui/input";

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
		<div className="min-h-screen flex flex-col items-center justify-center bg-background-purple relative">
			<GradientBackground />
			<div className="z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
				<div className="mb-8 text-center">
					<h2 className="text-4xl font-bold text-gray-900 leading-tight">
						Log In for Live Glucose <br />
						Tracking and Instant Alerts
					</h2>
					<p className="text-lg">
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
				
				<form
					onSubmit={
						isVerificationCodeSent
							? handleVerifyCode
							: handleSubmitPhoneNumber
					}
					className="flex flex-col items-center space-y-4"
				>
					<div className="mb-4 w-full max-w-md">
						<PhoneNumberInput
							placeholder="Phone Number"
							value={phoneNumber}
							onChange={handleChangePhoneNumber}
						/>
					</div>
					{isVerificationCodeSent && (
						<Input
							type="tel"
							placeholder="Testing Verification Code"
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
						className="w-full max-w-md"
					>
						{isVerificationCodeSent ? "Verify" : "Log In"}
					</RegisterButton>
				</form>
			</div>
		</div>
	);
}

export default LoginPage;
