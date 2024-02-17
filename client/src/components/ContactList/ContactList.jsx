import React from "react";
import AvatarDemo from "./AvatarDemo";
import { Switch } from "@src/@/components/ui/switch";

const mockContacts = [
    { firstName: "Jane", lastName: "Doe", enabled: true },
    { firstName: "Jesal", lastName: "Gandhi", enabled: false },
    { firstName: "Aidan", lastName: "Giordano", enabled: true },
    { firstName: "Federico", lastName: "Yacoubian", enabled: true },
    // Add more contacts as needed
];

const EmergencyContacts = () => {
    // TODO: Implement the enable/disable contact functionality
    const handleToggleContact = (contact) => {
        console.log("Toggle contact enabled status for:", contact.firstName);
        // Logic to enable/disable contact in the database goes here
    };

    return (
        <div>
            <h2 className="text-l font-bold mb-2">
                Your Emergency Contact List
            </h2>
            <div className="grid grid-cols-3 gap-4 overflow-auto p-4">
                {mockContacts.map((contact, index) => (
                    <div
                        key={index}
                        className="space-y-2 flex flex-col items-center"
                    >
                        <AvatarDemo
                            firstName={contact.firstName}
                            lastName={contact.lastName}
                            size="large"
                        />
                        <div className="flex justify-between items-center w-full">
                            <span className="text-xs text-center">
                                {contact.firstName} {contact.lastName.charAt(0)}
                                .
                            </span>
                            <Switch
                                checked={contact.enabled}
                                onChange={() => handleToggleContact(contact)}
                                className="ml-2"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmergencyContacts;
