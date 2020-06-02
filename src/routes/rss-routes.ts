import express from 'express';
import db from '../db/db.config';


const router = express.Router();


router.get('/', db.getJsonInDatabase);
router.post('/', db.postJsonInDatabase);
router.put('/:id', db.updateJsonInDatabase);
router.delete('/:id', db.removeJsonInDatabase);


router.use((req, res) => {
    return res.status(404).send('<h2 align=center>Page Not Found !</h2>');
});

export default router;
