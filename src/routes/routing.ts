import express from 'express';
import axios from 'axios';
import convert from 'xml-js';
import {RssModel} from '../models/rss-model';


const router = express.Router();
const BASE_URL: string = 'https://www.lemonde.fr/rss/en_continu.xml';


router.get('/', (async (req, res) => {
    const rssFeed = await axios.get(`${BASE_URL}`);

    try {
        const xmL2JS = convert.xml2js(rssFeed.data).elements
            .map(value1 => value1 as RssModel)
            .map(value2 => value2.elements
                .map((value3: RssModel) => value3.elements)
                .map(value4 => value4
                    .slice(7, 8)
                )
            )

        for (let data in xmL2JS) {
            res.send(...Object.values(xmL2JS[data]))
        }
    } catch (err) {
        throw err;
    }

}));


router.use((req, res) => {
    return res.status(404).send('<h2 align=center>Page Not Found !</h2>');
});


export default router;
