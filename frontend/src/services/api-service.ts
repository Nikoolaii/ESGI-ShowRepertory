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
                if (error.code == "ERR_NETWORK") {
                    return {
                        error: "Network error."
                    }
                }
                
                if (error.response.data.error == "Unauthorized") {
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