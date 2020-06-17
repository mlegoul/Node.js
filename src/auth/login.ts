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
        console.log('Email =>', email);

        pool.query(searchEmail, [email], (err, results) => {

            if (err) {
                return res.status(500).send(err.message);
            } else if (!results.rows.length) {
                return res.status(400).send('Error with Email !');
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
        const hashedPassword: string = 'SELECT hached_password FROM users';
        const {password} = await req.body;
        const token = jwt.sign({
            algorithm: 'RS256',
            expiresIn: '1h',
        }, process.env.TOKEN_SECRET);


        pool.query(hashedPassword, async (err, res) => {

            const hashed_password: string = Object.values(res.rows)
                .map((value: AuthModel) => value.hached_password)
                .toString();

            // Verify if passwords match
            const match = await bcrypt.compare(password, hashed_password);

            if (err) {
                return result.stat(500).send(err.message);
            } else if (!match) {
                return result.status(401).send('Password NO MATCH');
            } else {
                return result.status(200).send({token: token}).end();
            }
        });
    } catch (err) {
        throw err;
    }
}


export default {
    login,
}
