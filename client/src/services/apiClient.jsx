import axios from "axios";
import { errorTypes } from "./errorTypes";

const API_URL = import.meta.env.VITE_API_URL;

class ApiClient {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl;
        this.token = localStorage.getItem("token") || null;
        this.tokenName = "token";
    }

    setToken(token) {
        this.token = token;
        localStorage.setItem(this.tokenName, token);
    }

    async request({ endpoint, method = "GET", data = {} }) {
        const url = `${this.remoteHostUrl}/${endpoint}`;

        const headers = {
            "Content-Type": "application/json",
            Authorization: this.token ? `Bearer ${this.token}` : "",
        };

        try {
            const res = await axios({ url, method, data, headers });
            return { data: res.data, error: null };
        } catch (error) {
            console.error({ errorResponse: error.response });

            const serverError = error?.response?.data?.error;

            const errorMessage =
                errorTypes[serverError] || "An unexpected error occurred";

            return {
                data: null,
                error: errorMessage,
            };
        }
    }

    async login(phoneNumber) {
        return await this.request({
            endpoint: "users/login",
            method: "POST",
            data: { phoneNumber },
        });
    }

    async completeLogin(phoneNumber, code) {
        return await this.request({
            endpoint: "users/login/complete",
            method: "POST",
            data: { phoneNumber, code },
        });
    }

    async registerUser(phoneNumber) {
        return await this.request({
            endpoint: "users/signup",
            method: "POST",
            data: { phoneNumber },
        });
    }

    async completeRegistration(
        phoneNumber,
        code,
        name,
        dexcomUser,
        dexcomPass
    ) {
        return await this.request({
            endpoint: "users/signup/complete",
            method: "POST",
            data: {
                phoneNumber,
                code,
                name,
                dexcomUser,
                dexcomPass,
            },
        });
    }

    async logout() {
        this.setToken(null);
        // No need to make an API request since logout is handled by removing the token
    }

    async refreshUser(phoneNumber) {
        return await this.request({
            endpoint: "users/refresh-user",
            method: "POST",
            data: { phoneNumber },
        });
    }

    async updateDexcomSessionId(phoneNumber, dexcomUser, dexcomPass) {
        return await this.request({
            endpoint: "users/update-dexcom",
            method: "POST",
            data: { phoneNumber, dexcomUser, dexcomPass },
        });
    }

    async updateUser(phoneNumber) {
        return await this.request({
            endpoint: "users/update",
            method: "POST",
            data: { phoneNumber },
        });
    }

    async deleteUser(phoneNumber) {
        return await this.request({
            endpoint: `users/delete/${phoneNumber}`,
            method: "DELETE",
        });
    }

    async getUserContacts(userId) {
        return await this.request({
            endpoint: `users/${userId}/contacts`,
            method: "GET",
        });
    }

    async addContact(userId, phoneNumber, firstName, lastName, relationship) {
        return await this.request({
            endpoint: `users/${userId}/contacts`,
            method: "POST",
            data: {
                phoneNumber,
                firstName,
                lastName,
                relationship,
            },
        });
    }

    async verifyContact(
        userId,
        phoneNumber,
        code,
        firstName,
        lastName,
        relationship
    ) {
        return await this.request({
            endpoint: `users/${userId}/contacts/complete`,
            method: "POST",
            data: {
                phoneNumber,
                code,
                firstName,
                lastName,
                relationship,
            },
        });
    }

    async toggleContactActiveStatus(userId, contactId) {
        return await this.request({
            endpoint: `users/${userId}/contacts/${contactId}/toggle`,
            method: "PUT",
        });
    }

    async editContact(userId, contactId, firstName, lastName, relationship) {
        // console.log(
        //     "Editing contact, userId:",
        //     userId,
        //     "contactId:",
        //     contactId,
        //     "firstName:",
        //     firstName,
        //     "lastName:",
        //     lastName,
        //     "relationship:",
        //     relationship
        // );
        return await this.request({
            endpoint: `users/${userId}/contacts/${contactId}`,
            method: "PATCH",
            data: {
                firstName: firstName,
                lastName: lastName,
                relationship: relationship,
            },
        });
    }

    async deleteContact(userId, contactId) {
        return await this.request({
            endpoint: `users/${userId}/contacts/${contactId}`,
            method: "DELETE",
        });
    }
}

const API = new ApiClient(API_URL ? API_URL : "http://localhost:3001");

export default API;
