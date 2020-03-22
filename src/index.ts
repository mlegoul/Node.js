import express from 'express';
import bodyParser from 'body-parser';
import {TestModel} from './interfaces/testModel';
import {dbTest} from './env/database';


const app = express();
const port: number = 3000;
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    try {
        const tab: TestModel[] = [];
        const testRef = await dbTest.get();

        testRef.forEach(test => tab.push(test.data() as TestModel));
        return res.send(tab);
    } catch (err) {
        console.log(err);
        throw err;
    }
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
