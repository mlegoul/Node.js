import express from 'express';
import bodyParser from 'body-parser';
import {TestModel} from './interfaces/testModel';
import {dbTest} from './env/database';


const app = express();
const port = 3000;
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    const userRef = await dbTest.get();
    const userOb: TestModel[] = [];

    userRef.forEach(user => userOb.push(user.data() as TestModel));
    res.status(200).send(userOb);
    console.log(userOb);
});

app.post('/addTest', async (req, res) => {
    const addNewTest = await dbTest.add(req.body);
    res.status(201).send(addNewTest);
});

app.delete('/deleteTest/:id', async (req, res) =>{
    const deleteDoc = await dbTest.doc(req.params.id).delete();
    res.send(deleteDoc);
});

app.listen(port, function () {
    console.log(`--------------> Écoute sur le port : ${port}`);
});
