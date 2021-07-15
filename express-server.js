//express-server.js
const express = require('express');
const controllers = require('./controllers');
const cors = require('cors');
//npm install nodemon express body-parser cors event-stream
//npm install --save-dev jest supertest
//'start': 'nodemon express-server.js' under scripts in package.json
//find snippets: express-server-contollers express-server-utils

const app = express();
app.use(express.json());
app.use(cors());

const middleWare = (req, res, next) => {
    console.log('middware ran');
    next();
};

app.get('/', middleWare, (req, res) => {
    res.send('it is working!');
});
app.get('/get/:id', (req, res) => controllers.getLargeFile(req, res));
app.put('/put', (req, res) => controllers.put(req, res));
app.post('/post/:id', (req, res) => controllers.post(req, res));
app.delete('/del', (req, res) => controllers.del(req, res));

app.listen(3008, () => {
    console.log(`app is running on port 3008`);
});
