import express from 'express'
import { some } from 'lodash/fp'

import User from '../../database/User'
import { verify, authenMiddleware } from '../controllers/authentication.ctrl'

var router = express.Router()

const unless = (paths, middleware) => {
    return function(req, res, next) {
        const isHave = some((path) => {
          return path === req.path || req.path.includes(path)
        }, paths)
        if (isHave) {
          return next()
        } else {
            return middleware(req, res, next)
        }
    }
}

export default (server) => {
  router.route('/').post(verify)

  server.use('/authenticate', router)
  server.use(unless(['/login', '/register', '/static', '/_next'], authenMiddleware))
}
