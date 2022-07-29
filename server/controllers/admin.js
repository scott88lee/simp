const serveRoot = (req, res) => {
    res.render('pages/login');
}

const serveLogin = (req, res) => {
    res.render('admin/login', {
        title: 'Admin Login',
        user: req.user
    });
}

module.exports = {
    serveRoot,
    serveLogin
}