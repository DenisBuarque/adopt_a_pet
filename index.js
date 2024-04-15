const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// confg Json response
app.use(express.json());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(express.static('public'));

app.listen(5000, () => {
    console.log("Servidor rodando na porta 5000");
});