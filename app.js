const express = require('express');
const app = express();

// Your routes — no prefix needed, Nginx strips it
app.get('/', (req, res) => {
    res.send('Hello from jenkins-build! Hello the is written for testing the polling. 😒, the is what ever shit again it dosent work');
});

app.get('/api/users', (req, res) => {
    res.json({ users: [] });
});

app.listen(3000, () => {
    console.log('App running on port 3000');
});