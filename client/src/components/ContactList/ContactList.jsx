import React, { useContext, useEffect, useState } from "react";
import AvatarDemo from "./AvatarDemo";
import { Switch } from "@src/@/components/ui/switch";

import AddContactButton from "./AddContactButton";

import { AuthContext } from "../../contexts/AuthContext";

const EmergencyContacts = () => {
    const { user, getUserContacts, toggleContactStatus} = useContext(AuthContext);
    const [userContacts, setUserContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            if (user && user._id) {
                try {
                    // console.log("Fetching contacts for user:", user._id);
                    const { data } = await getUserContacts(user._id);
                    const contacts = data.contacts;
                    console.log("Contacts:", contacts);

                    setUserContacts(contacts);
                } catch (error) {
                    console.error("Failed to fetch contacts:", error);
                }
            }
        };

        fetchContacts();
    }, [user, getUserContacts]);

    const handleToggleContact = (contact) => {
        toggleContactStatus(user._id, contact._id);
    };

    return (
        <div>
            <h2 className="text-l font-bold mb-2">
                Your Emergency Contact List
            </h2>
            <div className="grid grid-cols-3 gap-4 overflow-auto p-4">
                {userContacts.length > 0
                    ? userContacts.map((contact, index) => (
                          <div
                              key={index}
                              className="space-y-2 flex flex-col items-center justify-end"
                          >
                              <AvatarDemo
                                  firstName={contact.contactFirstName}
                                  lastName={contact.contactLastName}
                                  size="large"
                              />
                              <div className="flex justify-between items-center w-full">
                                  <span className="text-xs text-center">
                                      {contact.contactFirstName}
                                  </span>
                                  <Switch
                                      checked={contact.enabled}
                                      onChange={() =>
                                          handleToggleContact(contact)
                                      }
                                      className="ml-2 transform scale-80"
                                  />
                              </div>
                          </div>
                      ))
                    : null}
                <div className="space-y-2 flex flex-col items-center justify-end">
                    <AddContactButton />
                    <div className="flex justify-between items-center w-full h-6 align-center">
                        <span className="text-xs text-center">
                            Add new contact
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmergencyContacts;
