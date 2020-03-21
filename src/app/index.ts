import express from 'express';
import bodyParser from 'body-parser';
import admin from 'firebase-admin';

const serviceAccount = require('src/app/env/key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://node-js-a9f9e.firebaseio.com"
});

const app = express();
const port = 3000;

app.use(bodyParser.json());


app.get('/', async function (req: any, res: any) {
    await res.send('Hello boys!');
});

app.listen(port, function () {
    console.log(`Écoute sur le port : ${port}`);
});
