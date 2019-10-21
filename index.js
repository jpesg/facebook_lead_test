const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send('health');
});

// Adds support for GET requests to our webhook


app.listen(5000, () => {
    console.log('listening on port 5000');
});
