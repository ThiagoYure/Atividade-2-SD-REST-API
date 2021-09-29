import express, { Express, json} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT
app.set('port', port);
app.use(json());
app.use(cors());
export default app;