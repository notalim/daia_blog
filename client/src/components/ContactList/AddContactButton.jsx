import React, { useState } from "react";
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
import { Label } from "@src/@/components/ui/label";

import { Avatar, AvatarFallback } from "@src/@/components/ui/avatar";

import { Plus } from "lucide-react";

const AddContactButton = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [relationship, setRelationship] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you would call the API to submit the form data
        // For now, just log it to the console
        console.log({ firstName, lastName, phoneNumber, relationship });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className={`bg-dim-purple hover:bg-hover-dim-purple text-full-purple font-bold p-2 rounded-full flex items-center justify-center w-16 h-16`}
                >
                    <Plus className="w-6 h-6" />
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-lavender-purple">
                <DialogHeader>
                    <DialogTitle>Add New Contact</DialogTitle>
                    <DialogDescription>
                        Enter the details for your new emergency contact.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="firstName" className="text-right">
                            First Name
                        </Label>
                        <Input
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="lastName" className="text-right">
                            Last Name
                        </Label>
                        <Input
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phoneNumber" className="text-right">
                            Phone Number
                        </Label>
                        <Input
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="relationship" className="text-right">
                            Relationship
                        </Label>
                        <Input
                            id="relationship"
                            value={relationship}
                            onChange={(e) => setRelationship(e.target.value)}
                            className="col-span-3 "
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            className="bg-full-purple hover:bg-hover-full-purple text-white"
                        >
                            Save Contact
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddContactButton;
