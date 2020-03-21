import express from 'express';
import bodyParser from 'body-parser';
import {TestModel} from './interfaces/testModel';
import admin from 'firebase-admin';


const app = express();
const port = 3000;
const serviceAccount = require('/Users/mehdi/WebstormProjects/Node.js/src/app/env/key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://nodejs-af04c.firebaseio.com'
});


const ref = admin.firestore();
const dbTest = ref.collection('test');

app.use(bodyParser.json());

app.get('/', async (req, res) => {
    const userRef = await dbTest.get();
    const userOb: TestModel[] = [];

    userRef.forEach(user => userOb.push(user.data() as TestModel));
    res.status(200).send(userOb);
    console.log(userOb);
});


app.listen(port, function () {
    console.log(`--------------> Écoute sur le port : ${port}`);
});
