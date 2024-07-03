import axios from 'axios';
import {Router} from "express";

const router = Router();

class TmdbApiService {
    apiKey: string;
    baseUrl: string;

    constructor() {
        this.apiKey = process.env.VUE_APP_TMDB_API_KEY
        this.baseUrl = process.env.VUE_APP_TMDB_BASE_URL
    }

    callApi(endpoint: string, params: any = {}) {
        const options = {
            method: 'GET',
            url: `${this.baseUrl}${endpoint}`,
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + this.apiKey
            },
            params: params
        };

        return axios
            .request(options)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.error(error);
                return {
                    error: 'Internal server error.'
                }
            });
    }
}

router.get('/*', async (req, res) => {
    const tmdbApiService = new TmdbApiService();
    const result = await tmdbApiService.callApi(req.params[0], req.query);
    res.json(result);
});

export default router;