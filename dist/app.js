// Imports
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import Router from './routes/router.js';
// Configuration du .env
config();
// Appel d' Express
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', Router);
// Lancement du code sur le port configuré dans le .env
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
//# sourceMappingURL=app.js.map