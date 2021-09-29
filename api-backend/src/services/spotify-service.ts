import axios from 'axios';

export default class SpotifyService {

    public static getArtistas(nomeArtista: string, token: string): Promise<any> {
        return axios({
            url: "https://api.spotify.com/v1/search?query=" + nomeArtista + "&type=artist",
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + token,
            }
        });
    }

    public static getRecomendacoes(idArtista: string, token: string): Promise<any> {
        return axios({
            url: "https://api.spotify.com/v1/recommendations?seed_artists=" + idArtista,
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + token,
            }
        });
    }
}