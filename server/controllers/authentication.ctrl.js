import User from '../../database/User'
import { jwtSecret } from '../../config/index'
import jwt from 'jsonwebtoken'

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
          token: token,
          user: user.toJSON()
        })
      }
    }
  })
}

export const authenMiddleware = (req, res, next) => {
  const token = req.cookies['x-access-token'];
  if (token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        res.redirect('/login');
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    })
  } else {
    res.redirect('/login');
  }
}
