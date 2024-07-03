import axios from 'axios';
import LocalStorageService from "./local-storage-service.ts";
import {disconnect} from "../controller/connexion-controller.ts";

export default class ApiService {
    static baseUrl = "http://localhost:3001/";

    static async callApi(endpoint: string, method: string, data?: any) {
        if (method === 'GET' && data) {
            endpoint += '?';
            for (const key in data) {
                endpoint += key + '=' + data[key] + '&';
            }
            endpoint = endpoint.slice(0, -1);
        }
        const options = {
            method: method,
            url: this.baseUrl + endpoint,
            headers: {
                accept: 'application/json',
                authorization: 'Bearer ' + LocalStorageService.getItem('token')
            },
            data: data
        };

        return axios
            .request(options)
            .then(function (response) {
                return response.data;

            })
            .catch(function (error) {
                console.error(error);
                if (error.code == "ERR_NETWORK") {
                    return {
                        error: "Network error."
                    }
                }

                if (error.code == "ERR_BAD_REQUEST") {
                    return {
                        error: "Bad request."
                    }

                }

                if (error.code == "UNAUTHORIZED") {
                    disconnect();
                    return {
                        error: "Unauthorized."
                    }
                }
                return {
                    error: error.response.data.error
                }
            });
    }
}