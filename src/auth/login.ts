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
                return checkIsPasswordMatch(req, res);
            }
        });
    } catch (err) {
        throw err;
    }
}

async function checkIsPasswordMatch(req, result) {

    const hachPassword: string = 'SELECT * FROM users';
    const {password} = await req.body;


    pool.query(hachPassword, async (err, res) => {

            const hached_password: string = Object.values(res.rows)
                .map((value: AuthModel) => value.hached_password)
                .toString();
            const uid: string = Object.values(res.rows)
                .map((value: AuthModel) => value.id)
                .toString()

            const match = await bcrypt.compare(password, hached_password);

            if (err) {
                throw err;
            } else if (!match) {
                return result.status(401).send('NO MATCH');
            } else {
                console.log(uid);
                return result.status(200).send({
                    token: jwt.sign({
                        userId: uid,
                        algorithm: 'RS256',
                        expiresIn: '1h',
                    }, process.env.TOKEN_SECRET)
                });
            }
        }
    )
}


export default {
    login,
}
