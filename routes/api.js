var express = require('express');
var router = express.Router();
var passport = require('passport');
var user = require('../models/user');
var _ = require('lodash');
var constants = require('../utils/constants');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const authenticate = expressJwt({ secret: 'server secret' });

router.post('/register', function (req, res) {
  passport.authenticate('local-signup')(req, res, function () {
    return res.status(200).json({
      status: 'Registration successful!'
    });
  });
});

router.post('/customer/registration', function (req, res) {
  var data = req.body;
  if (!_.isUndefined(data.emailaddress)) {
    user.registration(data).then(function (data) {
      return res.status(200).json({
        status: 'Registration successful!'
      });
    }, function (error) {
      return res.status(500).json({
        status: error
      });
    });
  } else { // Incorrect data
    return res.status(400).json({
      status: 'Incomplete data'
    });
  }
});


router.post('/customer/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      req.token = jwt.sign({ id: req.user.id, }, 'server secret', { expiresIn: 60 * 60 * 24 });
      res.status(200).json({
        data: user,
        token: req.token
      });
    });
  })(req, res, next);
});

router.get('/customer/logout', function (req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

router.get('/customer/status', authenticate, function (req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  res.status(200).json({
    status: true
  });
});

router.get('/customer/everify', function (req, res) {
  var id = req.query.di;
  var verificationCode = req.query.vc;
  if (!_.isUndefined(verificationCode) && !_.isUndefined(req.query.st)) {
    user.everify(id, verificationCode,req.query.st).then(function (data) {
        return res.status(200).json({
          status: data
        });
    }, function (error) {
      return res.status(500).json({
        status: 'Error. Please contact system administrator.'
      });
    });
  } else { // Incorrect data
    return res.status(400).json({
      status: di+"  "+verificationCode+'You have requested with incomplete data'
    });
  }
});


router.get('/customer/getCustomers', authenticate, function (req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  user.getCustomers().then(function (data) {
    return res.status(200).json({
      status: data
    });
  }, function (error) {
    return res.status(500).json({
      status: error
    });
  });
});

router.post('/customer/updateMyProfile', authenticate, function (req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  var data = req.body;
  if (!_.isUndefined(data.userid)) {
    user.updateMyProfile(data).then(function (data) {
      return res.status(200).json({
        status: data
      });
    }, function (error) {
      return res.status(500).json({
        status: error
      });
    });
  } else { // Incorrect data
    return res.status(400).json({
      status: 'Incomplete data'
    });
  }
});

router.post('/customer/updateProfilePhoto', authenticate, function (req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  var data = req.body;
  if (!_.isUndefined(data.userid)) {
    user.updateProfilePhoto(data).then(function (data) {
      return res.status(200).json({
        status: data
      });
    }, function (error) {
      return res.status(500).json({
        status: error
      });
    });
  } else { // Incorrect data
    return res.status(400).json({
      status: 'Incomplete data'
    });
  }
});


router.post('/customer/getservices',   authenticate,function (req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }

  var data = req.body;
  if (!_.isUndefined(data.signertype)) {
    user.getservices(data).then(function (data) {
      return res.status(200).json({
        status: "ok",
        reultdata: data
      });
    }, function (error) {
        return res.status(500).json({
          status: error
        });
    });
  } else { // Incorrect data
    return res.status(400).json({
      status: 'Incomplete data'
    });
  }
});


router.post('/customer/disclosures', authenticate, function (req, res) {
  var data = req.body;
  if (!_.isUndefined(data.signertype)) {
    user.disclosures(data).then(function (data) {
      return res.status(200).json({
        status: "ok",
        reultdata: data
      });
    }, function (error) {
        return res.status(500).json({
          status: error
        });
    });
  } else { // Incorrect data
    return res.status(400).json({
      status: 'Incomplete data'
    });
  }
});

router.post('/customer/setservicerequest',  authenticate, function (req, res) { 
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }

  var data = req.body;
  if (!_.isUndefined(data.user_id)) {
    user.setservicerequest(data).then(function (data) {
      return res.status(200).json({
        status: "ok",
        reultdata: data
      });
    }, function (error) {
        return res.status(500).json({
          status: error
        });
    });
  } else { // Incorrect data
    return res.status(400).json({
      status: 'Incomplete data'
    });
  }
});

router.post('/customer/sethelp',  authenticate, function (req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }

  var data = req.body;
  if (!_.isUndefined(data.signertype) && !_.isUndefined(data.subject)) {
    user.sethelp(data).then(function (data) {
      return res.status(200).json({
        status: "Issue Logged... You will be contacted soon by our Administrator"
      });
    }, function (error) {
        return res.status(500).json({
          status: error
        });
    });
  } else { // Incorrect data
    return res.status(400).json({
      status: 'Incomplete data'
    });
  }
});

router.post('/admin/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      req.token = jwt.sign({ id: req.user.id, }, 'server secret', { expiresIn: 60 * 60 * 24 });
      res.status(200).json({
        data: user,
        token: req.token
      });
    });
  })(req, res, next);
});


router.post('/customer/acceptrequest',  authenticate, function (req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }

  var data = req.body;
  if (!_.isUndefined(data.signertype) && !_.isUndefined(data.service_request_id)) {
    user.acceptrequest(data).then(function (data) {
      return res.status(200).json({
        status: "You have successfully accepted the request"
      });
    }, function (error) {
        return res.status(500).json({
          status: error
        });
    });
  } else { // Incorrect data
    return res.status(400).json({
      status: 'Incomplete data'
    });
  }
});

router.post('/customer/getnotifications',   authenticate,function (req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }

  var data = req.body;
  if (!_.isUndefined(data.signertype)) {
    user.getnotifications(data).then(function (data) {
      return res.status(200).json({
        status: "ok",
        reultdata: data
      });
    }, function (error) {
        return res.status(500).json({
          status: error
        });
    });
  } else { // Incorrect data
    return res.status(400).json({
      status: 'Incomplete data'
    });
  }
});

router.post('/customer/myrequests',   authenticate,function (req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }

  var data = req.body;
  if (!_.isUndefined(data.signertype)) {
    user.myrequests(data).then(function (data) {
      return res.status(200).json({
        status: "ok",
        reultdata: data
      });
    }, function (error) {
        return res.status(500).json({
          status: error
        });
    });
  } else { // Incorrect data
    return res.status(400).json({
      status: 'Incomplete data'
    });
  }
});




module.exports = router;
