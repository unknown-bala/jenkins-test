const express = require('express');
const app = express();

const BASE_PATH = process.env.BASE_PATH || '/jenkins-build';

// Mount all your routes under the base path
app.use(BASE_PATH, (req, res, next) => {
    next();
});

// Your routes
app.get(`${BASE_PATH}/`, (req, res) => {
    res.send('Hello from jenkins-build!');
});

app.get(`${BASE_PATH}/api/users`, (req, res) => {
    res.json({ users: [] });
});

app.listen(3000, () => {
    console.log(`App running on port 3000 under ${BASE_PATH}`);
});