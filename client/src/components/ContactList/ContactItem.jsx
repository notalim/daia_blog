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

const ContactItem = ({ contact, onToggleContact }) => {
    const { user, editContact, deleteContact } = useContext(AuthContext);
    const { processError, processSuccess } = useProcessMessages();
    const [isEditing, setIsEditing] = useState(false);

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
        // ! Your validation and edit logic here
        try {
            console.log("Submitting the following data:", formData);
            const { error } = await editContact(
                user._id,
                contact._id,
                formData.firstName,
                formData.lastName,
                formData.relationship
            );
            if (!error) {
                processSuccess("Contact updated successfully.");
                closeEditModal();
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const closeEditModal = () => {
        setIsEditing(false);
    };

    return (
        <Dialog>
            <div className="space-y-2 flex flex-col items-center justify-end">
                <DialogTrigger asChild>
                    <div>
                        <AvatarDemo
                            firstName={contact.contactFirstName}
                            lastName={contact.contactLastName}
                            size="large"
                        />
                    </div>
                </DialogTrigger>
                <div className="flex justify-between items-center w-full">
                    <span className="text-xs text-center">
                        {contact.contactFirstName}
                    </span>
                    <Switch
                        checked={contact.active}
                        onCheckedChange={() => onToggleContact(contact)}
                        className="ml-2 transform scale-80"
                    />
                </div>
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
                        value={formData.firstName}
                        onChange={handleChange}
                        label="First Name"
                        required
                    />
                    <Input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        label="Last Name"
                        required
                    />
                    <Input
                        type="text"
                        name="relationship"
                        value={formData.relationship}
                        onChange={handleChange}
                        label="Relationship"
                        required
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
