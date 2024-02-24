import React, { useContext, useEffect, useState } from "react";
import AvatarDemo from "./AvatarDemo";
import { Switch } from "@src/@/components/ui/switch";

import AddContactButton from "./AddContactButton";

import { AuthContext } from "../../contexts/AuthContext";

const EmergencyContacts = () => {
    const { user, getUserContacts } = useContext(AuthContext);
    const [userContacts, setUserContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            if (user && user._id) {
                try {
                    // console.log("Fetching contacts for user:", user._id);
                    const {data} = await getUserContacts(user._id);
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
                {userContacts.length > 0
                    ? userContacts.map((contact, index) => (
                          <div
                              key={index}
                              className="space-y-2 flex flex-col items-center"
                          >
                              <AvatarDemo
                                  firstName={contact.contactFirstName}
                                  lastName={contact.contactLastName}
                                  size="large"
                              />
                              <div className="flex justify-between items-center w-full">
                                  <span className="text-xs text-center">
                                      {contact.contactFirstName}{" "}
                                      {contact.contactLastName?.charAt(0) || ""}
                                      .
                                  </span>
                                  <Switch
                                      checked={contact.enabled}
                                      onChange={() =>
                                          handleToggleContact(contact)
                                      }
                                      className="ml-2"
                                  />
                              </div>
                          </div>
                      ))
                    : {}}
                <div className="space-y-2 flex flex-col items-center">
                    <AddContactButton />
                    <div className="flex justify-between items-center w-full">
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
