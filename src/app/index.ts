import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', async function (req: any, res: any) {
    await res.send('Hello boys!');
});


app.listen(port, function () {
    console.log(`Écoute sur le port : ${port}`);
});
