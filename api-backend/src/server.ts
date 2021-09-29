import app from './app';
import { Router } from 'express';
import SpotifyRoutes from './routes/spotify-route';

const routes = Router();

routes.use(SpotifyRoutes);

const port = app.get('port');
app.use('/', routes);
app.get('/', function (req, res) {
    res.send("Server Running!");
});

app.listen(port, () => {
    console.log(`Server running on address http://localhost:${port}/`);
})

export default routes;