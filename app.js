const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Jenkins deployed backend working 🚀, This is updated for checking the changes in polling!, this is another polling test 😢, this is another test for final work before i take bath.');
});

app.listen(3000, () => console.log('Running on port 3000'));