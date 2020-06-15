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

        pool.query(searchEmail, [email], (err, results) => {

            if (err) {
                return res.status(500).send(err.message);
            } else if (!results.rows.length) {
                return res.status(401).send('Error with Email !');
            } else {
                return checkIsPasswordMatch(req, res);
            }
        });
    } catch (err) {
        throw err;
    }
}

async function checkIsPasswordMatch(req, result) {

    try {
        const hachPassword: string = 'SELECT * FROM users';
        const {password} = await req.body;


        pool.query(hachPassword, async (err, res) => {

                const hached_password: string = Object.values(res.rows)
                    .map((value: AuthModel) => value.hached_password)
                    .toString();

                const token = jwt.sign({
                    algorithm: 'RS256',
                    expiresIn: '1h',
                }, process.env.TOKEN_SECRET);

                // Verify if password match
                const match = await bcrypt.compare(password, hached_password);

                if (err) {
                    throw err;
                } else if (!match) {
                    return result.status(401).send('Password NO MATCH');
                } else {
                    return result.status(200).send({token: token});
                }
            }
        )
    } catch (err) {
        throw err;
    }
}


export default {
    login,
}
