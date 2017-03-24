var express     = require('express');
var app         = express();

app.use("/node_modules", express.static(__dirname + '/node_modules'));

app.use("/", express.static(__dirname + '/game'));

app.listen(1234, function () {
    console.log('Game on port 1234!')
});