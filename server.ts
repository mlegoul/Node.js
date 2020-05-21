import express from 'express';
import axios from 'axios';
import convert from 'xml-js';
import {RssModel} from './src/models/rssModel';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());


const BASE_URL: string = 'https://www.lemonde.fr/rss/en_continu.xml';
const port: number = 3000;


app.get('/', async (req, res) => {

    const rssFeed = await axios.get(`${BASE_URL}`);
    const xmL2JS = convert.xml2js(rssFeed.data).elements;

    const tab = Object.values(xmL2JS)
        .map(value1 => value1 as RssModel)
        .map(value2 => value2.elements);

    for (let data in tab) {
        res.send(Object.values(tab[data] as RssModel)
            .map(value1 => value1 as RssModel)
            .map(value2 => Object.values(value2.elements)
                .splice(7, 10)
                .map(value1 => value1 as RssModel)
                .map(value2 => Object.values(value2.elements)
                    .map(value3 => Object.values(value3))
                )
            )
        )
    }
});

app.listen(port, () => {
    console.log(`ÉCOUTE SUR LE PORT =====> ${port}`);
});
