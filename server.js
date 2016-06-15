var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/database');
var db = mongoose.connection;

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var Etf = require('./models/etf.js');
var Advisor = require('./models/advisor.js');



// ------------------------------REQUEST HANDLERS--------------------------------------

// default route
app.get('/', function(req, res) {
    res.send('The API is not here');
})

// Show all ETFS
app.get('/api/etfs', function(req, res) {
    Etf.getEtfs(function(err, etfs){
        if(err) {
            // could throw(err) for detailed info
            res.send('Error retrieving ETFs');
        }
        res.json(etfs);
    })
})

// ADD an ETF
app.post('/api/etfs', function(req, res) {
    var etf = req.body;
    Etf.addEtf(etf, function(err, etf){
        if(err) {
            // throw(err) for detailed info
            res.send('Error creating ETF');
        }
        res.json(etf);
    })
})

// Show all advisors
app.get('/api/advisors', function(req, res) {
    Advisor.getAdvisors(function(err, advisors){
        if(err) {
            // could throw(err) for detailed info
            res.send('Error retrieving advisors');
        }
        res.json(advisors);
    })
})

// ADD an advisor
app.post('/api/advisors', function(req, res) {
    var advisor = req.body;
    Advisor.addAdvisor(advisor, function(err, advisor){
        if(err) {
            // throw(err) for detailed info
            res.send('Error creating advisor');
        }
        res.json(advisor);
    })
})

// ---------------------------Start the server--------------------------------------
// recommended host and port for cloud9
var server = app.listen(process.env.PORT, process.env.IP, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('server listening at http://' + host + ':' + port);
});

