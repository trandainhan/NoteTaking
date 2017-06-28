import express from 'express'
import User from '../../database/User'
var router = express.Router()



var authenication = {

  verify: (req, resp) => {
    logger.info("Verify username and password");

    User.findOne({ name: req.body.name }, (err, user) => {
      if (err) {
        logger.error(err.message);
        throw err;
      }
      if (!user) {
      resp.json({ success: false, message: 'Authentication failed. User not found.' });
      } else {

      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        var token = jwt.sign(user, config.dbConnectionPool.secret, {
          expiresIn: 60*60
        });
        resp.json({
          success: true,
          message: 'Enjoy your token',
          token: token
        })
      }
      }
    })
  },

  authenMiddleware: (req, resp, next) => {

    var token = req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, config.dbConnectionPool.secret, function (err, decoded) {
        if (err) {
          return resp.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      })
    } else {
      return resp.status(403).send({
          success: false,
          message: 'No token provided.'
      });
    }

  }
}

export default authenication
