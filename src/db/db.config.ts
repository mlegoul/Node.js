import pg from 'pg';
import axios from 'axios';
import convert from 'xml-js';
import {RssModel} from '../models/rss-model';


// Config connect bdd
const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: 'rss',
    port: 5432,
});

const BASE_URL: string = 'https://www.lemonde.fr/rss/en_continu.xml';


// Get request from local Database
async function getRssFeed(req, res) {
    try {
        const getRss: string = 'SELECT * FROM rss';

        await pool.query(getRss, ((err, result) => {
            if (err) {
                return res.status(500).send({'ERROR FROM DATABASE': err.message});
            } else {
                return res.status(200).send(
                    result.rows
                        .reduce((acc, value) => {
                            return {
                                ...acc, ...value
                            }
                        }, {})
                );
            }
        }));
    } catch (err) {
        throw err;
    }
}


// Post request
async function postRssFeedInDatabase(req, res) {

    const addJson: string = 'INSERT INTO rss (rss) VALUES ($1)';
    const tabResult = await req.body;

    pool.query(addJson, [tabResult], (error, results) => {

        if (error) {
            return res.status(500).send({'ERROR MESSAGE FROM DATABASE : ': error.message});
        } else {
            return res.status(201).send({'OK ==> ': results.rows})
        }
    });
}


// Put request
function updateJsonInDatabase(req, res) {

    setInterval(async () => {
        await convertRssToJson(req, res);
    }, 2500, convertRssToJson(req, res))
}


// Convert rss to json here
async function convertRssToJson(req, res) {

    try {
        const rssFeed = await axios.get(`${BASE_URL}`);
        const putRss: string = 'UPDATE rss SET created_at = $2, rss = $3 WHERE id = $1';
        const rss = req.body;
        const id = req.params.id;
        const created_at = new Date();

        pool.query(putRss, [id, created_at, rss], (error, results) => {

            if (error) {
                return res.status(500).send({'ERROR MESSAGE FROM DATABASE : ': error.message});
            } else {

                return res.status(200)
                    .send(
                        results.rows = convert.xml2js(rssFeed.data)
                            .elements
                            .map(value1 => value1.elements
                                .map((value2: RssModel) => value2.elements)
                                .map(value3 => value3
                                    .slice(7, 8)
                                    .map((value4: RssModel) => value4.elements)
                                    .map(value5 => value5
                                        .reduce((acc) => {
                                        return {
                                            ...acc,
                                            ...value5.slice(0, 1)
                                                .reduce((acc, content: RssModel) => {
                                                    return {
                                                        ...acc, [content.name]: Object.values(content.elements)
                                                            .map((value6: RssModel) => value6.cdata).toString()
                                                    }
                                                }, {}),
                                            ...value5.slice(1, 2)
                                                .reduce((acc, content: RssModel) => {
                                                    return {
                                                        ...acc, ['created_at']: Object.values(content.elements)
                                                            .map((value6: RssModel) => value6.text).toString()
                                                    }
                                                }, {}),
                                            ...value5.slice(2, 3)
                                                .reduce((acc, content: RssModel) => {
                                                    return {
                                                        ...acc, [content.name]: Object.values(content.elements)
                                                            .map((value6: RssModel) => value6.cdata).toString()
                                                    }
                                                }, {}),
                                            ...value5.slice(4, 5)
                                                .reduce((acc, content: RssModel) => {
                                                    return {
                                                        ...acc, [content.name]: Object.values(content.elements)
                                                            .map((value6: RssModel) => value6.text).toString()
                                                    }
                                                }, {}),
                                            ...value5.slice(5)
                                                .reduce((acc, content: RssModel) => {
                                                    return {
                                                        ...acc, ['imgUrl']: Object.values(content.attributes)[0]
                                                    }
                                                }, {}),
                                        }
                                    }, {})
                                    )
                                )
                            )
                            .reduce((acc, value) => {
                            return value
                                .reduce((acc, value) => {
                                    return {
                                        ...acc,
                                        ...Object.values(value)
                                    }
                                }, {})
                        }, {})
                    )
            }
        })
    } catch (err) {
        throw err;
    }
}

export default {
    getRssFeed,
    updateJsonInDatabase,
    postRssFeedInDatabase,
}
