import React, { useState } from "react";
import Input from "../components/Input";
import RegisterButton from "../components/RegisterButton"; // Assuming this can be reused for the login button

function LoginPage() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);

    const handleChangePhoneNumber = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handleSubmitPhoneNumber = async (event) => {
        event.preventDefault();
        if (!phoneNumber) return;

        try {
            const response = await fetch("http://localhost:3000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ phoneNumber }),
            });

            const message = await response.text();

            if (!response.ok) {
                throw new Error(
                    `HTTP error! status: ${response.status} - ${message}`
                );
            }

            console.log(message);
            setIsVerificationCodeSent(true);
        } catch (error) {
            console.error("There was an error!", error);
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
                        onSubmit={handleSubmitPhoneNumber}
                        className="space-y-4 bg-white p-4 shadow rounded-lg"
                    >
                        <Input
                            type="tel"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={handleChangePhoneNumber}
                        />
                        <RegisterButton
                            type="submit"
                            disabled={!phoneNumber || isVerificationCodeSent}
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
