import pg from 'pg';
import rssService from '../services/rss-service';


// Config connect bdd
const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: 'rss',
    port: 5432,
});


// Get request
function getJsonInDatabase(req, res) {

    try {
        const getJson: string = 'SELECT rss FROM rss';

        pool.query(getJson, ((err, result) => {
            if (err) {
                return res.status(500).send({'ERROR FROM DATABASE': err.message});
            } else {
                return res.status(200)
                    .send(
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
async function postJsonInDatabase(req, res) {

    const addJson: string = 'INSERT INTO rss (rss) VALUES ($1)';
    const tabResult = await rssService.convertRssToJson();

    pool.query(addJson, [tabResult], (error, results) => {

        if (error) {
            return res.status(500).send({'ERROR MESSAGE FROM DATABASE : ': error.message});
        } else {
            return res.status(201).send({'OK ==> ': results.rows})
        }
    });
}


// Put request
async function updateJsonInDatabase(req, res) {

    try {
        const putJson: string = 'UPDATE rss SET created_at = $2, rss = $3 WHERE id = $1';
        const rss = await rssService.convertRssToJson();
        const id = req.params.id;
        const created_at = new Date();

        pool.query(putJson, [id, created_at, rss], (error, results) => {

            if (error) {
                return res.status(500).send({'ERROR MESSAGE FROM DATABASE : ': error.message});
            } else {
                return res.status(200).send(results.rows);
            }
        })
    } catch (err) {
        throw err;
    }
}


// Delete request
async function removeJsonInDatabase(req, res) {

    try {
        const id = req.params.id;
        const deleteJson: string = 'DELETE FROM rss where id = $1';

        await pool.query(deleteJson, [id], (error, results) => {
            if (error) {
                return res.status(500).send({'ERROR MESSAGE FROM DATABASE : ': error.message});
            } else {
                return res.status(200).send(`Json has been deleted with ID : ${id}`);
            }
        })
    } catch (err) {
        throw err;
    }
}


export default {
    getJsonInDatabase,
    updateJsonInDatabase,
    postJsonInDatabase,
    removeJsonInDatabase,
}
