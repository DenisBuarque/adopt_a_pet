const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const connection = require('./database/connection');

const UserRouter = require('./routes/UserRouter');
const PetRouter = require('./routes/PetRouter');

const app = express();

// confg Json response
app.use(express.json());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// path public
app.use(express.static('public'));

// routes
app.use('/users', UserRouter);
app.use('/pets', PetRouter);

app.listen(5000, () => {
    console.log("Servidor rodando na porta 5000");
});