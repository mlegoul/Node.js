import pg from 'pg';
import bcrypt from 'bcrypt';
import {AuthModel} from '../interfaces/auth-model';


// Config connect bdd
const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: 'users',
    port: 5432,
});

async function login(req, res) {

    const searchEmail: string = 'SELECT email FROM users WHERE email = $1';

    const {email} = req.body;

    pool.query(searchEmail, [email], (error, results) => {

        if (error) {
            return res.status(500).send(error.message);
        } else {
            return checkEmailIsValid(req, res);
        }
    });
}

async function checkEmailIsValid(req, res) {

    const hachPassword: string = 'SELECT hached_password FROM users';
    const {password} = req.body;


    pool.query(hachPassword, (err, res) => {
        if (err) {
            throw err;
        } else {
            const convert = Object.values(res.rows).map((value: AuthModel) => value.hached_password).toString();
            bcrypt.compare(password, convert, (err, res) => {
                if(err) {
                    throw err;
                } else  {
                    console.log(res);
                }
            })

        }
    })
}


export default {
    login,
}
