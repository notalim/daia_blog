import React, { useState, useContext } from "react";
import { Switch } from "@src/@/components/ui/switch";
import AvatarDemo from "./AvatarDemo";
import { AuthContext } from "../../contexts/AuthContext";
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
import SelectContactType from "./SelectContactType";
import useProcessMessages from "../../contexts/useProcessMessages";

import validation from "../../services/validation";

const ContactItem = ({ contact, onToggleContact }) => {
    const { user, editContact, deleteContact } = useContext(AuthContext);
    const { processError, processSuccess } = useProcessMessages();

    const [formData, setFormData] = useState({
        firstName: contact.contactFirstName,
        lastName: contact.contactLastName,
        relationship: contact.contactRelationship,
    });

    const [lockedPhoneNumber] = useState(
        contact.contactPhoneNumber || "Not available"
    );

    const handleEditContact = async (e) => {
        e.preventDefault();
        if (!validation.nameValidation(formData.firstName)) {
            processError("Invalid first name");
            return;
        }

        if (!validation.nameValidation(formData.lastName)) {
            processError("Invalid last name");
            return;
        }

        if (!formData.relationship) {
            processError("Please select a relationship");
            return;
        }

        try {
            // console.log("Submitting the following data:", formData);
            const { error } = await editContact(
                user._id,
                contact._id,
                formData.firstName,
                formData.lastName,
                formData.relationship
            );
            if (!error) {
                processSuccess("Contact updated successfully.");
            } else {
                processError(error);
            }
        } catch (error) {
            processError(error);
        }
    };

    const handleDeleteContact = async () => {
        const { error } = await deleteContact(user._id, contact._id);
        if (!error) {
            processSuccess("Contact deleted successfully.");
            closeEditModal();
        } else {
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
    return (
        <Dialog>
            <div className="flex flex-col items-center justify-center p-2">
                <DialogTrigger asChild>
                    <div className="cursor-pointer">
                        <AvatarDemo
                            firstName={contact.contactFirstName}
                            lastName={contact.contactLastName}
                            size="large"
                        />

                        <div className="text-xs text-center mt-2">
                            {contact.contactFirstName}
                        </div>
                    </div>
                </DialogTrigger>

                <Switch
                    checked={contact.active}
                    onCheckedChange={() => onToggleContact(contact)}
                    className="transform scale-75 mt-1" // Ensure this is the same as in AddContactButton
                />
            </div>

            <DialogContent className="bg-background-purple p-6">
                <DialogHeader className="border-b border-dim-purple pb-4">
                    <DialogTitle className="text-full-purple">
                        Edit Contact
                    </DialogTitle>
                    <DialogDescription className="text-dim-purple">
                        Update the contact information below.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleEditContact} className="space-y-4">
                    <Input
                        type="text"
                        name="phoneNumber"
                        value={lockedPhoneNumber}
                        disabled
                    />

                    <Input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                    <SelectContactType
                        name="relationship"
                        value={formData.relationship}
                        onChange={handleChange}
                    />
                    <div className="flex justify-between space-x-4">
                        <Button type="button" onClick={handleDeleteContact}>
                            Delete
                        </Button>
                        <Button type="submit">Save</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ContactItem;
