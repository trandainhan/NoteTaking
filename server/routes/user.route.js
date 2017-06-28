import express from 'express'
import { registerUser } from '../controllers/user.ctrl'
var router = express.Router()

export default (server) => {
  router.route('/register').post(registerUser)

  server.use('/user', router)
}
