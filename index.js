var express = require('express');
var bodyParser = require('body-parser');


var app = express();

app.use(bodyParser.json());



app.get('/', (req, res) => {
    res.send('health');
});

// Adds support for GET requests to our webhook


app.listen(5000, () => {
    console.log('listening on port 5000');
});
