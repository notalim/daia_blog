import React, { useState, useEffect } from "react";
import "../containers/styles/RegisterPage.css";
import Input from "../components/Input";
import PhoneNumberInput from "../components/PhoneNumberInput";
import GradientBackground from "../components/GradientBackground";
import RegisterButton from "../components/RegisterButton";

const initialFormFields = ["Phone Number"];
const additionalFormFields = [
    "Verification Code",
    "Dexcom Username",
    "Dexcom Password",
    "Your Name",
];

function RegisterPage() {
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

    const handleChange = (field) => (event) => {
        setFormData({ ...formData, [field]: event.target.value });
    };

    const handlePhoneNumberSubmit = async (event) => {
        event.preventDefault();
        if (!formData["Phone Number"]) return;

        let concatPhoneNumber = "+1" + formData["Phone Number"];

        try {
            const response = await fetch("http://localhost:3000/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ phoneNumber: concatPhoneNumber }),
            });

            const message = await response.text();

            if (!response.ok) {
                throw new Error(
                    `HTTP error! status: ${response.status} - ${message}`
                );
            }

            console.log(message);
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
                const response = await fetch(
                    "http://localhost:3000/users/signup/complete",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(formData),
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error("There was an error!", error);
            }
        }
    };

 return (
     <div className="min-h-screen flex items-center justify-center bg-background-purple relative">
         <GradientBackground />
         <div className="z-10 w-full max-w-6xl mx-auto flex justify-between items-start">
             {/* Left column */}
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
             {/* Right column */}
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
                         <label className="text-gray-500 mr-2 mb-2">+1</label>
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
                                 type={
                                     fieldName === "Verification Code"
                                         ? "tel"
                                         : fieldName === "Dexcom Password"
                                         ? "password"
                                         : "text"
                                 }
                                 placeholder={fieldName}
                                 value={formData[fieldName]}
                                 onChange={handleChange(fieldName)}
                                 className="mb-4" // Assuming your Input component accepts className prop for styling
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
