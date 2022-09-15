const User = require("../models/userModel");
const bcyrpt = require("bcryptjs");

exports.signUp = async (req, res) => {
  
  const {username, password } = req.body;

  try {
    const hashPassword = await bcyrpt.hash(password, 12); 
    
    const newUser = await User.create({
      username,
      password: hashPassword
    });
    req.session.user = newUser;
    res.status(201).json({
      status: "Success",
      data: {
        user: newUser
      }
    });
  } catch (e) {
    console.log(e)
    res.status(400).json({
      status: "fail"
    });
  }
}

exports.login = async (req, res) => {
  try {
    const {username, password } = req.body

    const user = await User.findOne({username});

    if(!user) {
      return res.status(404).json({
        status: "fail",
        message: "user not found"
      });
    }

    const isCorrect = await bcyrpt.compare(password, user.password)

    if(isCorrect) {
      req.session.user = user;
      res.status(200).json({
        status: "Success"
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "incorrect username or password"
      })
    }
  } catch (e) {
    console.log(e)
    res.status(400).json({
      status: "fail"
    });
  }
}

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "Success",
      result: (await users).length,
      data: {
        users
      }
    });
  } catch (e) {
    res.status(400).json({
      status: "fail"
    });
  }
}