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
            .map(value1 => value1.elements
                .map((value2: RssModel) => value2.elements)
                .map(value3 => value3
                    .slice(7, 8)
                    .map((value4: RssModel) => value4.elements)
                    .map(value5 => value5
                        .slice(0, 1)
                        .reduce((accumulator, content: RssModel) => {
                            return [content.name, ...Object.values(content.elements)
                                .map((value6: RssModel) => value6.cdata)];
                        }, [])
                    )
                )
            )

        for (let data in xmL2JS) {
            res.send(...Object.values(xmL2JS[data]));
        }
    } catch (err) {
        throw err;
    }
}));


router.use((req, res) => {
    return res.status(404).send('<h2 align=center>Page Not Found !</h2>');
});


export default router;
