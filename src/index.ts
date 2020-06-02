import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import rssRouter from './routes/rss.routes';
import authRouter from './routes/auth.routes';


const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(cors());
app.use('/api/rss', rssRouter);
app.use('/api/auth', authRouter);


app.listen(port, () => {
    console.log(`ÉCOUTE SUR LE PORT =====> ${port}`);
});
