import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import ConnentMongo from './db/index.js';
import route from './routes/todo.route.js';

const app = express();

app.use(cors());

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', route);

const PORT = process.env.PORT || 8000;

ConnentMongo();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});