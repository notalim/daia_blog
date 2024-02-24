import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PhoneNumberInput from "../components/PhoneNumberInput";
import RegisterButton from "../components/RegisterButton"; // Rename this as needed
import GradientBackground from "../components/GradientBackground";

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
			// now handled in the context
			// const { data, error } = await API.login(
			//     "+1" + phoneNumber.replace(/\D/g, "")
			// );

			const { data, error } = await loginUser(
				"+1" + phoneNumber.replace(/\D/g, "")
			);

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
				{isVerificationCodeSent && (
					<div className="text-dim-purple text-center mb-4">
						Verification code has been sent
					</div>
				)}
				{error && (
					<div className="text-red-500 text-center mb-4">{error}</div>
				)}
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
						<PhoneNumberInput
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
