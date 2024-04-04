import React, { useState, useContext } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@src/@/components/ui/dialog";
import { Button } from "@src/@/components/ui/button";
import { Input } from "@src/@/components/ui/input";
import OTP from "../OTP";
import SelectContactType from "./SelectContactType";
import { Avatar, AvatarFallback } from "@src/@/components/ui/avatar";

import { Plus } from "lucide-react";

import validation from "../../services/validation";

import { useAuth } from "../../contexts/useAuth";
import useProcessMessages from "../../contexts/useProcessMessages";

const AddContactButton = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "+1",
        relationship: "",
        enableContact: false,
        verificationCode: "",
    });

    const [isVerifying, setIsVerifying] = useState(false);
    const { user, addContact, verifyContact } = useAuth();
    const { processError } = useProcessMessages();

    const handleVerifyContact = async (e) => {
        e.preventDefault();

        if (!validation.nameValidation(formData.firstName)) {
            processError("Invalid first name");
            return;
        }

        if (!validation.nameValidation(formData.lastName)) {
            processError("Invalid last name");
            return;
        }

        if (!validation.phoneValidation(formData.phoneNumber)) {
            processError("Invalid phone number");
            return;
        }

        if (!formData.relationship) {
            processError("Please select a relationship");
            return;
        }

        setIsVerifying(true);
        let concatPhoneNumber = "+" + formData.phoneNumber.replace(/\D/g, "");

        try {
            const { error } = await addContact(
                user._id,
                concatPhoneNumber,
                formData.firstName,
                formData.lastName,
                formData.relationship
            );

            if (error) {
                processError(error);
                setIsVerifying(false);
            }
        } catch (error) {
            processError(error);
            setIsVerifying(false);
        }
    };

    const handleChangeVerificationCode = (value) => {
        setFormData({ ...formData, verificationCode: value });
    };

    const handleVerificationCodeSubmit = async (e) => {
        e.preventDefault();

        if (!validation.codeValidation(formData.verificationCode)) {
            processError("Invalid verification code");
            return;
        }

        try {
            console.log(formData);
            const { error } = await verifyContact(
                user._id,
                formData.phoneNumber,
                formData.verificationCode,
                formData.firstName,
                formData.lastName,
                formData.relationship
            );

            if (error) {
                processError(error);
            } else {
                setIsVerifying(false);
                setFormData({
                    firstName: "",
                    lastName: "",
                    phoneNumber: "+1",
                    relationship: "",
                    enableContact: false,
                    verificationCode: "",
                });
            }
        } catch (error) {
            processError(error);
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

    const handlePhoneNumberChange = (event) => {
        const newPhoneNumber = event.target.value.trim();
        if (/^\+1\d*$/.test(newPhoneNumber) && newPhoneNumber.length <= 12) {
            setFormData({ ...formData, phoneNumber: newPhoneNumber });
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="">
                    <Avatar className="w-16 h-16 rounded-full bg-lavender-purple cursor-pointer flex items-center justify-center">
                        <AvatarFallback>
                            <Plus className="w-6 h-6 text-mid-purple" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex justify-between items-center w-full h-6 align-center text-xs">
                        Add new contact
                    </div>
                </div>
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
                        className="space-y-2"
                    >
                        <div className="flex justify-center text-gray-500 text-xs">
                            Verification code
                        </div>
                        <div className="flex justify-center">
                            <OTP
                                value={formData["Verification Code"]}
                                onChange={handleChangeVerificationCode}
                            />
                        </div>
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
