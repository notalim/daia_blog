import React, { useContext, useEffect, useState } from "react";
import AvatarDemo from "./AvatarDemo";
import { Switch } from "@src/@/components/ui/switch";

import AddContactButton from "./AddContactButton";
import ContactItem from "./ContactItem";

import { AuthContext } from "../../contexts/AuthContext";

const ContactList = () => {
    const { user, getUserContacts, toggleContactActiveStatus } =
        useContext(AuthContext);
    const [userContacts, setUserContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            if (user && user._id) {
                try {
                    // console.log("Fetching contacts for user:", user._id);
                    const { data } = await getUserContacts(user._id);
                    const contacts = data.contacts;
                    // console.log("Contacts:", contacts);

                    setUserContacts(contacts);
                } catch (error) {
                    console.error("Failed to fetch contacts:", error);
                }
            }
        };

        fetchContacts();
    }, [user, getUserContacts]);

    const handleToggleContact = async (contact) => {
        // console.log("Toggling contact:", contact._id);
        const response = await toggleContactActiveStatus(user._id, contact._id);
        if (!response.error) {
            // Optimistically update the UI
            setUserContacts((prevContacts) =>
                prevContacts.map((c) =>
                    c._id === contact._id ? { ...c, enabled: !c.enabled } : c
                )
            );
        }
    };
    return (
        <div className="text-sm p-4 border rounded-lg bg-lavender-purple mt-4">
            <h2 className="text-l font-bold mb-2">
                Your Emergency Contact List
            </h2>
            <div className="grid grid-cols-3 gap-4 overflow-auto p-4 lg:grid-cols-6">
                {userContacts.length > 0
                    ? userContacts.map((contact, index) => (
                          <ContactItem
                              key={index}
                              contact={contact}
                              onToggleContact={handleToggleContact}
                          />
                      ))
                    : null}
                <div className="space-y-2 flex flex-col items-center justify-end">
                    <AddContactButton />
                </div>
            </div>
        </div>
    );
};

export default ContactList;
