var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var morgan = require('morgan');  // dont need **

// to verify tokens
var jwt    = require('jsonwebtoken');

var config = require('./config');

var mongoose = require('mongoose');
mongoose.connect(config.database);
app.set('mySecret', config.secret); 

var db = mongoose.connection;

var User = require('./models/user.js');
var Etf = require('./models/etf.js');
var Advisor = require('./models/advisor.js');



// ------------------------------REQUEST HANDLERS--------------------------------------

app.get('/setup', function(req, res) {
    var derek = new User({
        name: 'Derek Lloyd',
        password: 'password1',
        admin: true
    })
    
    console.log(derek)
    derek.save(function(err) {
        if (err) throw err;
    
        console.log("user created");
        res.json({success: true});
    })
})

// API ROUTES -------------------

// get an instance of the router for api routes
var apiRoutes = express.Router(); 


apiRoutes.post('/authenticate', function(req, res) {

  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches, TODO use bcrypt to verify hashed
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token, expires in 24 hours
        var token = jwt.sign(user, app.get('mySecret'), {
          expiresInMinutes: 1440
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
});














// TODO route middleware to verify a token

// route to show a random message (GET /api/)
apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

// route to return all users (GET /api/users)
apiRoutes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});   

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);










/*

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

*/

// ---------------------------Start the server--------------------------------------
// recommended host and port for cloud9
var server = app.listen(process.env.PORT, process.env.IP, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('server listening at http://' + host + ':' + port);
});

