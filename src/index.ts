import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import apiRoutes from './routes/api.routes';


const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(cors());
app.use('/api', apiRoutes);



app.listen(port, () => {
    console.log(`ÉCOUTE SUR LE PORT =====> ${port}`);
});
