const User = require('../models/users');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res) => {
    const { email, password, username } = req.body;
    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
        if (err) { return next(err) };
        req.flash('success', 'Welcome to Yelp Camp!');
        res.redirect('/campgrounds');
    })
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = async (req, res) => {
    req.flash('success', 'Welcome back!');
    const url = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(url);
}

module.exports.logout = (req, res) => {
    req.logOut();
    req.flash('success', 'GoodBye!');
    res.redirect('/campgrounds');
}