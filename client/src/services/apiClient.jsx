// apiClient.js
import axios from "axios";

import { errorTypes } from "./errorTypes";

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
             console.error("APIclient.makeRequest.error:");
             console.error({ errorResponse: error.response });
             const serverError = error?.response?.data?.message;
             return {
                 data: null,
                 error: serverError || "An unexpected error occurred",
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
        dexcomUser,
        dexcomPass,
        name,
        password,
        confirmPassword
    ) {
        return await this.request({
            endpoint: "users/signup/complete",
            method: "POST",
            data: {
                phoneNumber,
                code,
                dexcomUser,
                dexcomPass,
                name,
                password,
                confirmPassword,
            },
        });
    }

    async logout() {
        this.setToken(null);
        // No need to make an API request since logout is handled by removing the token
    }

    async addContact(
        phoneNumber,
        contactPhoneNumber,
        contactName,
        contactRelationship
    ) {
        return await this.request({
            endpoint: "users/contacts",
            method: "POST",
            data: {
                phoneNumber,
                contactPhoneNumber,
                contactName,
                contactRelationship,
            },
        });
    }

    async verifyContact(
        phoneNumber,
        contactPhoneNumber,
        code,
        contactName,
        contactRelationship
    ) {
        return await this.request({
            endpoint: "users/contacts/verify",
            method: "POST",
            data: {
                phoneNumber,
                contactPhoneNumber,
                code,
                contactName,
                contactRelationship,
            },
        });
    }
}

const API = new ApiClient(
    import.meta.env.VITE_API_URL || "http://localhost:3000"
);

export default API;
