import ApiService from "../services/api-service.ts";
import {RouteParamValue} from "vue-router";

async function get_saisons(serieId: string | RouteParamValue[], nbSeasons: number) {
    try {
        const episodesPromises = [];
        for (let i = 1; i <= nbSeasons; i++) {
            const seasonPromise = ApiService.callApi('tmdb/tv/' + serieId + '/season/' + i, 'get').then((response) => {
                return response;
            });
            episodesPromises.push(seasonPromise);
        }
        const episodes = await Promise.all(episodesPromises);
        return episodes.flat();
    } catch (error) {
        console.error('Error fetching episodes:', error);
        return [];
    }
}

export default get_saisons;