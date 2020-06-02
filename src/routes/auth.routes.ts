import express from 'express';
import auth_sign_up from '../auth/signUp';
import auth_login from '../auth/login';


const authRouter = express.Router();


authRouter.post('/signup', auth_sign_up.signUp);
authRouter.post('/login', auth_login.login);


authRouter.use((req, res) => {
    return res.status(404).send('<h2 align=center>Page Not Found !</h2>');
});

export default authRouter;
