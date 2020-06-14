import pg from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// Config connect bdd
const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: 'users',
    port: 5432,
});

async function signUp(req, res) {

    try {
        const addNewUser: string = 'INSERT INTO users (email, hached_password) VALUES ($1, $2)';
        const {email, password} = await req.body;
        const token = jwt.sign({
            algorithm: 'RS256',
            expiresIn: '1h',
        }, process.env.TOKEN_SECRET);


        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                throw err;
            }

            pool.query(addNewUser, [email, hash], (error, results) => {

                if (error) {
                    return res.status(500).send({'ERROR MESSAGE FROM DATABASE : ': error.message});
                } else {
                    return res.status(201).json(results.rows);
                }
            });
        })

        return res.set({token: token});

    } catch (err) {
        throw err;
    }
}


export default {
    signUp,
}
