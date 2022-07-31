const app = require('express');
const router = app.Router();

// Middleware to protect the route
const authenticate = require('../util/auth');
router.use(authenticate.admin);

const controller = require('../controllers/admin');
router.get('/', controller.serveRoot);
router.get('/login', controller.serveLogin);

router.post('/', (req, res) => {
    // auth jwt if present
    // if not present
    // check db
    // check hash
    // return jwt

    console.log(req.body)
    res.redirect('/admin');
});

module.exports = router;