const app = require('express');
const router = app.Router();

// Middleware to protect the route
const authenticate = require('../util/auth');
router.use(authenticate.admin);

const controller = require('../controllers/admin');
router.get('/', controller.serveRoot);
router.get('/login', controller.serveLogin);

module.exports = router;