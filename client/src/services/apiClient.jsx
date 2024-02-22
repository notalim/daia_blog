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
            // console.log(res)
            return { data: res.data, error: null };
        } catch (error) {
            console.error("APIclient.makeRequest.error:");
            console.error({ errorResponse: error.response });
            const serverError = error?.response?.data?.message;
            // console.log(error);
            // console.log(data)
            return {
                data: res.error,
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

    async updateUser(phoneNumber) {
        return await this.request({
            endpoint: "users/update",
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

    async deleteUser(phoneNumber) {
        return await this.request({
            endpoint: `users/delete/${phoneNumber}`, // Assuming the server can handle this endpoint format
            method: "DELETE",
        });
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

const TEST_SERVER_URL = "https://daia-test-server.onrender.com";

const API = new ApiClient(TEST_SERVER_URL);
export default API;
