const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
  userCreationSuccess,
  userNotFound,
  badPassword,
} = require('../wording/wording');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    try {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
      });
      await user.save();
      res.status(201).json({ message: userCreationSuccess });
    } catch (error) {
      res.status(400).json({ error });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).json({ error: userNotFound });
    }
    const isValid = await bcrypt.compare(req.body.password, user.password);
    try {
      if (!isValid) {
        res.status(401).json({ error: badPassword });
      }
      res.status(200).json({
        // userId: user.id,
        token: jwt.sign({ userId: user.id }, process.env.SECRET_TOKEN, {
          expiresIn: '24h',
        }),
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getCurrentUser = async (req, res) => {
  const usrId = req.userId;
  try {
    const user = await User.findOne({ _id: usrId });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
};
