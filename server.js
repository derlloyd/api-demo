// server framework
var express = require('express');
var app = express();

// to get params from post requests
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// to verify tokens
var jwt = require('jsonwebtoken');

// db info
var config = require('./config');

// interaction with mongodb
var mongoose = require('mongoose');
mongoose.connect(config.database);
app.set('mySecret', config.secret);
var db = mongoose.connection;

// import models
var User = require('./models/user.js');
var Etf = require('./models/etf.js');
var Advisor = require('./models/advisor.js');

// logs all requests, for dev only
var morgan = require('morgan');
app.use(morgan('dev'));

// ------------------------------PUBLIC REQUEST HANDLERS--------------------------------------
// -------------------------------------------------------------------------------------------

// default route
app.get('/', function(req, res) {
  // could create an page to provide this info
  res.send("go to /setup to create account and /api/authenticate for access token")
});


// to create a new user
app.get('/setup', function(req, res) {
  // get name and password from req.body
  var name = req.body.name;
  var password = req.body.password;
  
  // TODO need to verify if username already exists, if so res.send('User already exists') *******
  
  var newUser = new User({
    name: name,
    password: password
  })

  newUser.save(function(err) {
    if (err) throw err;
    res.json({
      success: true
    });
  })
})

// ------------------------------PUBLIC API ROUTE HANDLERS--------------------------------------
// ---------------------------------------------------------------------------------------------

// get an instance of the router for api routes
var apiRoutes = express.Router();

// route to POST /api/authenticate for user to get token
apiRoutes.post('/authenticate', function(req, res) {
  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {
 
    if (err) throw err;

    if (!user) {
      return res.json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    }
    else if (user) {
      // check if password matches, TODO use bcrypt to verify hashed *****************

      if (user.password != req.body.password) {
        return res.json({
          success: false,
          message: 'Authentication failed. Wrong password.'
        });
      }
      else {
        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('mySecret'));

        // return the token as JSON
        return res.json({
          success: true,
          token: token
        });
      }
    }
  });
});

// ------------------------------PRIVATE API ROUTE MIDDLEWARE--------------------------------------
// ------------------------------------------------------------------------------------------------

// route middleware to verify a token
apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret
    jwt.verify(token, app.get('mySecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error, 403 forbidden, not allowed to view data
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
  }
});

// ------------------------------PRIVATE API ROUTE HANDLERS--------------------------------------
// ----------------------------------------------------------------------------------------------


// ------------------------------USERS--------------------------------------

// route to return all users (GET /api/users)
apiRoutes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    if (err) throw err;
    return res.json(users);
  });
});

// ------------------------------ETFS--------------------------------------

// Show all ETFS (GET /api/etfs)
apiRoutes.get('/etfs', function(req, res) {
  // could add optional limit after callback
  Etf.getEtfs(function(err, etfs) {
    if (err) {
      // could throw(err) for detailed info
      return res.send('Error retrieving ETFs');
    }
    res.json(etfs);
  })
})

// Show one ETF (GET /api/etfs/:id)
apiRoutes.get('/etfs/:id', function(req, res) {
  var id = {
    _id: req.params.id
  };
  res.json(id)
  Etf.getEtf(id, function(err, etf) {
    if (err) {
      return res.send('Error retrieving ETF');
    }
    res.json(etf);
  })
});

// ADD an ETF (POST /api/etfs)
apiRoutes.post('/etfs', function(req, res) {
  var etf = req.body;
  // validate data
  if (!etf.name || !etf.ticker) {
    res.send('Name and Ticker Required');
    return;
  }
  Etf.addEtf(etf, function(err, etf) {
    if (err) {
      // throw(err) for detailed info
      return res.send('Error creating ETF');
    }
    res.json(etf);
  })
})

// UPDATE an ETF (PUT /api/etfs/:id)
apiRoutes.put('/etfs/:id', function(req, res) {
  // body contains updated info
  var etf = req.body;
  delete etf._id // if it is in the body
  var id = {
    _id: req.params.id
  };

  Etf.updateEtf(id, etf, function(err, etf) {
    if (err) {
      return res.send('Error updating ETF');
    }
    res.json(etf);
  })
});

// DELETE an ETF (DELETE /api/etfs/:id)
apiRoutes.delete('/etfs/:id', function(req, res) {
  var id = req.params.id;
  Etf.deleteEtf(id, function(err, deleted) {
    if (err) {
      return res.send('Error deleting ETF');
    }
    res.json(deleted);
  })
});

// ------------------------------ADVISORS--------------------------------------

// Show all advisors (GET /api/advisors)
apiRoutes.get('/advisors', function(req, res) {
  Advisor.getAdvisors(function(err, advisors) {
    if (err) {
      return res.send('Error retrieving advisors');
    }
    res.json(advisors);
  })
})

// Show one Advisor (GET /api/advisors/:id)
apiRoutes.get('/advisors/:id', function(req, res) {
  // body contains updated info
  var advisor = req.body;
  var id = req.params.id;
  Etf.updateAdvisor(id, advisor, function(err, advisor) {
    if (err) {
      return res.send('Error updating Advisor');
    }
    res.json(advisor);
  })
});

// ADD an advisor (POST /api/advisors)
apiRoutes.post('/advisors', function(req, res) {
  var advisor = req.body;
  if (!advisor.name || !advisor.firm) {
    return res.send('Advisor Name and Firm Required');
  }
  Advisor.addAdvisor(advisor, function(err, advisor) {
    if (err) {
      // throw(err) for detailed info
      return res.send('Error creating advisor');
    }
    res.json(advisor);
  })
})

// UPDATE an Advisor (PUT /api/advisors/:id)
apiRoutes.put('/advisors/:id', function(req, res) {
  // body contains updated info
  var advisor = req.body;
  var id = req.params.id;
  Etf.updateAdvisor(id, advisor, function(err, advisor) {
    if (err) {
      return res.send('Error updating Advisor');
    }
    res.json(advisor);
  })
});

// DELETE an Advisor (DELETE /api/advisors/:id)
apiRoutes.delete('/advisors/:id', function(req, res) {
  var id = req.params.id;
  Etf.deleteAdvisor(id, function(err, deleted) {
    if (err) {
      return res.send('Error deleting Advisor');
    }
    res.json(deleted);
  })
});

// apply the routes with the prefix /api
app.use('/api', apiRoutes);



// -------------------------------------Start the server--------------------------------------
// -------------------------------------------------------------------------------------------

// recommended host and port for cloud9
var server = app.listen(process.env.PORT, process.env.IP, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('server listening at http://' + host + ':' + port);
});
