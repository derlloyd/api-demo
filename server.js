var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/database');
var db = mongoose.connection;

var bodyParser = require('body-parser');
app.use(bodyParser());

var Etf = require('./models/etf.js');
var Advisor = require('./models/advisor.js');



// ------------------------------REQUEST HANDLERS--------------------------------------

app.get('/api', function(req, res) {
    res.send('all is good');
})


app.get('/api/etfs', function(req, res) {
    Etf.getEtfs(function(err, etfs){
        if(err) {
            throw(err)
        }
        res.json(etfs);
    })
})


app.get('/api/advisors', function(req, res) {
    Advisor.getAdvisors(function(err, advisors){
        if(err) {
            throw(err)
        }
        res.json(advisors);
    })
})


// ---------------------------Start the server--------------------------------------

var server = app.listen(process.env.PORT, process.env.IP, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('server listening at http://%s:%s', host, port);
});

