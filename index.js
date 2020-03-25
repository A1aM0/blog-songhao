// Main app
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Test');
});

app.listen(3000, function () {
    console.log('Listening -- Sever has started at http://localhost:3000/');
})
