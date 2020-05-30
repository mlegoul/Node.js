import express from 'express';
import db from '../db/db.config';


const router = express.Router();


router.get('/', db.getRssFeed);
router.post('/api', db.postRssFeedInDatabase);
router.put('/api/:id', db.updateJsonInDatabase);
router.delete('/api/:id', db.removeJsonInDatabase);


export default router;
