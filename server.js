var express     = require('express');
var app         = express();

app.use("/node_modules", express.static(__dirname + '/node_modules'));

app.use("/", express.static(__dirname + '/game'));

/*app.get('/', function (req, res) {
    res.send('Hello World!');
});*/

app.listen(1234, function () {
    console.log('Example app listening on port 1234!')
});