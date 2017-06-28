import User from '../../database/User'
import { jwtSecret } from '../../config/index'

export const verify = (req, res) => {
  const { username, password } = req.body
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      throw err
    }
    if (!user) {
      res.status(400).json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else {
      if (user.password != password) {
        res.status(400).json({
          success: false,
          message: 'Authentication failed. Wrong password.'
        });
      } else {
        var token = jwt.sign(user, jwtSecret, {
          expiresIn: 60*60
        });
        res.status(200).json({
          success: true,
          message: 'Enjoy your token',
          token: token
        })
      }
    }
  })
}

export const authenMiddleware = (req, resp, next) => {

  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, jwtSecret, function (err, decoded) {
      if (err) {
        return res.status(403).json({
          success: false,
          message: 'Failed to authenticate token.'
        });
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
