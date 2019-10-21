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
app.get('/webhook', function(req, res){

    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = 'token';

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
});

// Creates the endpoint for our webhook
app.post('/webhook', function(req, res){

    let body = req.body;


  res.status(200).send('EVENT_RECEIVED');
});

app.listen(5000, () => {
    console.log('listening on port 5000');
});
