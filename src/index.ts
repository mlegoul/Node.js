import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/routing';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use('/', router);

router.use((req, res) => {
    return res.status(404).send('<h2 align=center>Page Not Found !</h2>');
});

app.listen(port, () => {
    console.log(`ÉCOUTE SUR LE PORT =====> ${port}`);
});
