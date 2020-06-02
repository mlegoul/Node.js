import pg from 'pg';


// Config connect bdd
const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: 'users',
    port: 5432,
});

async function signUp(req, res) {
    const addNewUser: string = 'INSERT INTO users (email, hached_password) VALUES ($1, $2)';
    const {email, hached_password} = await req.body;

    pool.query(addNewUser, [email, hached_password], (error, results) => {

        if (error) {
            return res.status(500).send({'ERROR MESSAGE FROM DATABASE : ': error.message});
        } else {
            console.log(results.rows);
            return res.status(201).send({'OK ==> ': results.rows});
        }
    });
}


function login(req, res) {

    console.log('test');

}


export default {
    login,
    signUp,
}
