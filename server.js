var express = require('express');
var app = express();

var mongoose = require('mongoose');
// the name of the database is 'database'
mongoose.connect('mongodb://localhost/database');
var db = mongoose.connection;

// folder to expose as public directory - remove this folder, web app will be independant
// app.use(express.static(__dirname+'/client'));

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
    // could add optional limit after callback
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
    // validate data
    if (!etf.name || !etf.ticker) {
        res.send('Name and Ticker Required');
    }
    Etf.addEtf(etf, function(err, etf){
        if(err) {
            // throw(err) for detailed info
            res.send('Error creating ETF');
        }
        res.json(etf);
    })
})

// UPDATE an ETF
app.put('api/efts/:id', function(req, res) {
    var etf = req.body;
    // delete etf._id
    var id = {
        _id: req.params.id   
    };
    
    Etf.updateEtf(id, etf, function(err, etf){
        if(err) {
            res.send('Error updating ETF');
        }
        res.json(etf);
    })
});


// DELETE an ETF
app.delete('api/efts/:id', function(req, res) {
    var id = req.params.id;
    // delete ...
});

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
    if (!advisor.name || !advisor.firm) {
        res.send('Advisor Name and Firm Required');
    }
    Advisor.addAdvisor(advisor, function(err, advisor){
        if(err) {
            // throw(err) for detailed info
            res.send('Error creating advisor');
        }
        res.json(advisor);
    })
})


// UPDATE an Advisor
app.put('api/advisors/:id', function(req, res) {
    var advisor = req.body;
    var id = req.params.id;
    // put...
});


// DELETE an Advisor
app.delete('api/advisors/:id', function(req, res) {
    var id = req.params.id;
    // delete ...
});



// ---------------------------Start the server--------------------------------------
// recommended host and port for cloud9
var server = app.listen(process.env.PORT, process.env.IP, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('server listening at http://' + host + ':' + port);
});

