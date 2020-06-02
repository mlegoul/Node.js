import express from 'express';
import db from '../db/db.config';


const rssRouter = express.Router();


rssRouter.get('/', db.getJsonInDatabase);
rssRouter.post('/', db.postJsonInDatabase);
rssRouter.put('/:id', db.updateJsonInDatabase);
rssRouter.delete('/:id', db.removeJsonInDatabase);


rssRouter.use((req, res) => {
    return res.status(404).send('<h2 align=center>Page Not Found !</h2>');
});

export default rssRouter;
