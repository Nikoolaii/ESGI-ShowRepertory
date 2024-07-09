import ApiService from "../services/api-service.ts";
import {RouteParamValue} from "vue-router";

async function getSaisons(serieId: string | RouteParamValue[], nbSeasons: number) {
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

export async function checkEpisodeSeen(episodeId: string | RouteParamValue[], userId: number | RouteParamValue[], serieType: string | RouteParamValue[]) {
    try {
        const seen = await ApiService.callApi('seen/' + serieType + '/' + userId + '/' + episodeId, 'get');
        if (!seen.error) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error fetching seen:', error);
        return false;
    }
}

export async function createSeen(episodeId: string | RouteParamValue[], userId: number | RouteParamValue[], serieType: string | RouteParamValue[]) {
    try {
        const seen = await ApiService.callApi('seen', 'post', {
            userId: userId,
            episodeId: episodeId,
            serieType: serieType
        });
        if (!seen.error) {
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}

export async function deleteSeen(serieId: string | RouteParamValue[], userId: number | RouteParamValue[], serieType: string | RouteParamValue[]) {
    try {
        const seen = await ApiService.callApi('seen/' + serieType + '/' + userId + '/' + serieId, 'delete');
        if (!seen.error) {
            return true;
        }
        return false
    } catch (error) {
        return false;
    }
}

export default getSaisons;