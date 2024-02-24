import React, { useState, useContext } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@src/@/components/ui/dialog";
import { Button } from "@src/@/components/ui/button";
import { Input } from "@src/@/components/ui/input";
import SelectContactType from "./SelectContactType";
import { Avatar, AvatarFallback } from "@src/@/components/ui/avatar";
import { Plus } from "lucide-react";
import validation from "../../services/validation";

import { AuthContext } from "../../contexts/AuthContext";

const AddContactButton = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "+1",
        relationship: "",
        enableContact: false,
        verificationCode: "",
    });

    const [errors, setErrors] = useState({});

    const [isVerifying, setIsVerifying] = useState(false);

    const { user, addContact, verifyContact } = useContext(AuthContext);

    const handleVerifyContact = async (e) => {
        e.preventDefault();

        const newErrors = {
            firstName: validation.nameValidation(formData.firstName)
                ? ""
                : "Invalid first name",
            lastName: validation.nameValidation(formData.lastName)
                ? ""
                : "Invalid last name",
            phoneNumber: validation.phoneValidation(formData.phoneNumber)
                ? ""
                : "Invalid phone number",
            relationship: formData.relationship
                ? ""
                : "Please select a relationship",
        };

        if (Object.values(newErrors).some((error) => error !== "")) {
            setErrors(newErrors);
        } else {
            setIsVerifying(true);

            let concatPhoneNumber =
                "+" + formData.phoneNumber.replace(/\D/g, "");

            const { data, error } = await addContact(
                user._id,
                concatPhoneNumber,
                formData.firstName,
                formData.lastName,
                formData.relationship
            );

            if (!error) {
                console.log("Contact verification initiated.", data);
            } else {
                setErrors({ form: error });
                setIsVerifying(false);
            }
        }
    };

    const handleVerificationCodeSubmit = async (e) => {
        e.preventDefault();

        if (validation.codeValidation(formData.verificationCode)) {
            const { data, error } = await verifyContact(
                user._id,
                formData.phoneNumber,
                formData.verificationCode,
                formData.firstName,
                formData.lastName,
                formData.relationship
            );

            if (!error) {
                console.log("Contact verified successfully.", data);
                setIsVerifying(false);

                setFormData({
                    firstName: "",
                    lastName: "",
                    phoneNumber: "+1",
                    relationship: "",
                    enableContact: false,
                    verificationCode: "",
                });
            } else {
                setErrors({ verificationCode: error });
            }
        } else {
            setErrors({ verificationCode: "Invalid verification code" });
        }
    };

    const handlePhoneNumberChange = (event) => {
        const newPhoneNumber = event.target.value.trim();
        if (/^\+1\d*$/.test(newPhoneNumber) && newPhoneNumber.length <= 12) {
            setFormData({ ...formData, phoneNumber: newPhoneNumber });
        }
    };

    const handleChange = (eventOrValue) => {
        const value = eventOrValue.target
            ? eventOrValue.target.value
            : eventOrValue;
        const name = eventOrValue.target
            ? eventOrValue.target.name
            : "relationship";

        setFormData({ ...formData, [name]: value });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Avatar className="w-16 h-16 rounded-full bg-lavender-purple cursor-pointer flex items-center justify-center">
                    <AvatarFallback>
                        <Plus className="w-6 h-6 text-mid-purple" />
                    </AvatarFallback>
                </Avatar>
            </DialogTrigger>
            <DialogContent className="bg-background-purple p-6">
                <DialogHeader className="border-b border-dim-purple pb-4">
                    <DialogTitle className="text-full-purple">
                        Add New Contact
                    </DialogTitle>
                    <DialogDescription className="text-dim-purple">
                        Enter the details for your new emergency contact.
                    </DialogDescription>
                </DialogHeader>
                {Object.values(errors).map(
                    (error, index) =>
                        error && (
                            <p key={index} className="text-red-500 mt-1 mb-1">
                                {error}
                            </p>
                        )
                )}
                {!isVerifying ? (
                    <form onSubmit={handleVerifyContact} className="space-y-4">
                        <Input
                            name="firstName"
                            placeholder="First Name"
                            className="w-full"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        <Input
                            name="lastName"
                            placeholder="Last Name"
                            className="w-full"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                        <Input
                            name="phoneNumber"
                            type="tel"
                            placeholder="Phone Number"
                            className="w-full"
                            value={formData.phoneNumber}
                            onChange={handlePhoneNumberChange}
                            maxLength={12}
                        />
                        <SelectContactType
                            value={formData.relationship}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            className="w-full bg-background-purple text-input-text placeholder-input-text"
                        >
                            Verify Contact
                        </Button>
                    </form>
                ) : (
                    <form
                        onSubmit={handleVerificationCodeSubmit}
                        className="space-y-4"
                    >
                        <Input
                            name="verificationCode"
                            placeholder="Verification Code"
                            className="w-full"
                            value={formData.verificationCode}
                            onChange={handleChange}
                            maxLength={6}
                        />
                        <Button
                            type="submit"
                            className="w-full bg-background-purple text-input-text placeholder-input-text"
                        >
                            Save Contact
                        </Button>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default AddContactButton;
