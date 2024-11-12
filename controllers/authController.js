const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getRegister = (req, res) => {
  res.render('register');
};

exports.postRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    req.flash('success', 'Registration successful! Please log in.');
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error registering user.');
    res.redirect('/register');
  }
};

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/login');
    }
    req.session.userId = user._id;
    req.session.userEmail = user.email;
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.redirect('/login');
  }
};
