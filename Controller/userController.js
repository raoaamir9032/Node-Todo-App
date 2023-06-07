const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();


// Create a JWT
const maxAge = 3 * 24 * 60 * 60;  // 3 days
const createToken = (id) => {
    return jwt.sign({id},process.env.SECRET_KEY,{
        expiresIn: maxAge,
    } );
};


// SignUp handler

const signUp = async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const user = new User({ firstName, lastName, email, password });
      await user.save();
      const token = createToken(user._id);
      res.status(201).send({ email: user.email, fName: user.firstName, lName: user.lastName, token: token });
    } catch (err) {
      const error = err.message;
      res.status(400).json({ error: error });
    }
  };
  

// sign in handler
const signIn = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);

        res.status(201).send({email: user.email, fName: user.firstName, lName: user.lastName , token: token});
    } catch (error) {
        res.status(400).json({ error : error.message });
      }

}





module.exports = {signUp, signIn};