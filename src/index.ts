import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import convert, {xml2js} from 'xml-js';
import {TestModel} from './interfaces/testModel';
import {dbTest} from './env/database';

const BASE_URL: string = 'https://www.lemonde.fr/rss/en_continu.xml';
const app = express();
const port: number = 3000;
app.use(bodyParser.json());
app.use(cors());


app.get('/', async (req, res) => {

    const rssFeed = await axios.get(`${BASE_URL}`);
    const xmL2JS = convert.xml2js(rssFeed.data, {compact: true});
    const tab = Object.values(xmL2JS).splice(1,1);
    return res.send(tab);









});







app.post('/addTest', async (req, res) => {
    try {
        const addNewTest = await dbTest.add(req.body);
        return res.send(addNewTest);
    } catch (err) {
        console.log(err);
        throw err;
    }
});

app.delete('/deleteTest/:id', async (req, res) => {
    try {
        const deleteDoc = await dbTest.doc(req.params.id).delete();
        return res.send(deleteDoc);
    } catch (err) {
        console.log(err);
        throw err;
    }
});

app.put('/modifyTest/:id', async (req, res) => {
    try {
        const newChange = req.body;
        const modifyTest = await dbTest.doc(req.params.id).update(newChange);
        return res.send(modifyTest);
    } catch (err) {
        console.log(err);
        throw err;
    }
});


app.listen(port, function () {
    console.log(`--------------> Écoute sur le port : ${port}`);
});

/*

try {
    const tab: TestModel[] = [];
    const testRef = await dbTest.get();

    testRef.forEach(test => tab.push(test.data() as TestModel));
    return res.send(tab);
} catch (err) {
    console.log(err);
    throw err;
}*/
