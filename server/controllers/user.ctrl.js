import User from '../../database/User'

export const registerUser = (req, res) => {
  const { username, password, confirmPassword } = req.body
  if (password !== confirmPassword) {
    res.status(400).json({
      message: 'Password and Confirm Password must be the same'
    })
  }
  if (username && password ) {
    return User.find({username: username}, (err, user) => {
      if (user.length) {
        return res.status(400).json({
          message: 'Username already exists'
        })
      }
      const newUser = new User({
        username: username,
        password: password
      })
      return newUser.save().then((result) => {
        res.status(201).json({
          message: "Successfully created user",
          data: result.toJSON()
        })
      })
    })
  }
  res.status(400).json({
    message: 'Username or Password must not empty'
  })
}
