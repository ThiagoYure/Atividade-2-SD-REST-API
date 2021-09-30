import { Request, Response, Router } from 'express';
import SpotifyService from '../services/spotify-service';
import axios from 'axios';
import { base64encode, base64decode } from 'nodejs-base64';
import dotenv from 'dotenv'

const routes = Router();
dotenv.config();

routes.get('/artista/:nome', (req: Request, res: Response) => {
    const credentials = base64encode(process.env.CLIENT_ID+":"+process.env.CLIENT_SECRET);
    const nomeArtista = encodeURI(req.params.nome as string);
    axios({
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + credentials,
        },
        data: 'grant_type=client_credentials',
    }).then(resu => {
        const token = resu.data.access_token;
        const result = SpotifyService.getArtistas(nomeArtista, token);
        result.then(data => {
            res.status(200).json(data.data.artists.items);
        }).catch(error => {
            res.status(400).json({
                "error": "Bad Request"
            })
        })
    }).catch(error => {
        console.log(error.response);
        res.json({"error": "Error"})
    })
});

routes.get('/recomendacao/:id', (req: Request, res: Response) => {
    const credentials = base64encode(process.env.CLIENT_ID+":"+process.env.CLIENT_SECRET);
    const idArtista = req.params.id as string;
    axios({
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + credentials,
        },
        data: 'grant_type=client_credentials',
    }).then(resu => {
        const token = resu.data.access_token;
        const result = SpotifyService.getRecomendacoes(idArtista, token);
        result.then(data => {
            res.status(200).json(data.data.tracks);
        }).catch(error => {
            res.status(400).json(error);
        })
    }).catch(error => {
        console.log(error.response);
        res.json({"error": "Error"})
    })
})
export default routes;