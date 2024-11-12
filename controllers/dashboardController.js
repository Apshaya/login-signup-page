exports.getDashboard = (req, res) => {
    res.render('dashboard', { userEmail: req.session.userEmail });
  };
  