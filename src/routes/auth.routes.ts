import express from 'express';
import auth from '../auth/login';


const authRouter = express.Router();


authRouter.post('/signup', auth.signUp);
authRouter.post('/login', auth.login);


authRouter.use((req, res) => {
    return res.status(404).send('<h2 align=center>Page Not Found !</h2>');
});

export default authRouter;
