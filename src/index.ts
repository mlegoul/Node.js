import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/routing';

const app = express();
app.use(bodyParser.json());
app.use(cors());


const port: number = 3000;

app.use('/', router);


app.listen(port, () => {
    console.log(`ÉCOUTE SUR LE PORT =====> ${port}`);
});
