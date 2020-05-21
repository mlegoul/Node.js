import express from 'express';
import axios from 'axios';
import convert from 'xml-js';
import {RssModel} from '../models/rss-model';


const router = express.Router();
const BASE_URL: string = 'https://www.lemonde.fr/rss/en_continu.xml';


router.get('/', (async (req, res) => {
    const rssFeed = await axios.get(`${BASE_URL}`);
    const xmL2JS = convert.xml2js(rssFeed.data).elements;

    const tab = Object.values(xmL2JS)
        .map(value1 => value1 as RssModel)
        .map(value2 => value2.elements);

    for (let data in tab) {
        res.send(...Object.values(tab[data] as RssModel)
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
}));


router.use((req, res) => {
    return res.status(404).send('<h2 align=center>Page Not Found !</h2>');
});


export default router;
