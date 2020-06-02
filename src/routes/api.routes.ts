import express from 'express';
import db from '../db/db.config';


const apiRoutes = express.Router();


apiRoutes.get('/', db.getJsonInDatabase);
apiRoutes.post('/', db.postJsonInDatabase);
apiRoutes.put('/:id', db.updateJsonInDatabase);
apiRoutes.delete('/:id', db.removeJsonInDatabase);


apiRoutes.use((req, res) => {
    return res.status(404).send('<h2 align=center>Page Not Found !</h2>');
});

export default apiRoutes;
