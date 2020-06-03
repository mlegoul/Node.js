import pg from 'pg';
import bcrypt from 'bcrypt';
import {AuthModel} from '../interfaces/auth-model';
import jwt from 'jsonwebtoken';


// Config connect bdd
const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: 'users',
    port: 5432,
});

async function login(req, res) {

    try {
        const searchEmail: string = 'SELECT email FROM users WHERE email = $1';
        const {email} = await req.body;

        pool.query(searchEmail, [email], (error, results) => {

            if (error) {
                return res.status(500).send(error.message);
            } else {
                return checkEmailIsValid(req, res);
            }
        });
    } catch (err) {
        throw err;
    }
}

async function checkEmailIsValid(req, result) {

    const hachPassword: string = 'SELECT hached_password FROM users';
    const {password} = await req.body;


    pool.query(hachPassword, async (err, res) => {

            const convert = Object.values(res.rows)
                .map((value: AuthModel) => value.hached_password)
                .toString();
            const match = await bcrypt.compare(password, convert);

            if (err) {
                throw err;
            } else if (!match) {
                return result.status(401).send('NO MATCH');
            } else {
                return result.status(200).send({
                    //Signing a token with 1 hour of expiration
                    token: jwt.sign({
                        algorithm: 'RS256',
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    }, 'secret')
                });
            }
        }
    )
}


export default {
    login,
}
