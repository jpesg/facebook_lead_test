const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

app.use(bodyParser.json());

app.use(cors());


const PORT = process.env.PORT || 5000


// Adds support for GET requests to our webhook
app.get('/', function(req, res){

    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = 'token';

    // Parse the query params
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (token) {

        // Checks the mode and token sent is correct
        if (token === VERIFY_TOKEN) {
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
app.post('/', function(req, res){

    let body = req.body;
    console.log(JSON.stringify(req.body, null, 2));
    return res.status(200).send('EVENT_RECEIVED');
    // Checks this is an event from a page subscription
    if (body.object === 'page') {

        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function(entry) {

            // Gets the message. entry.messaging is an array, but
            // will only ever contain one message, so we get index 0
            //let webhook_event = entry.messaging[0];
            //console.log(webhook_event);
            console.log(entry);
        });

        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }

});

app.listen(PORT, () => {
    console.log('listening on port 5000');
});
