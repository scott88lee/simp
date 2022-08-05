const router = require('express').Router();
const users = require('../controllers/users');

const auth = require('../util/auth');

router.post('/', users.createNew);
router.get('/current', auth.auth, users.currentUser);

router.get('/test', users.test);


module.exports = router;
// const { check } = require('express-validator');

// router.get('/', auth, users.getAllUsers);
// router.get('/:id', auth, users.getUserById);
// router.post('/', [check('name', 'Name is required').not().isEmpty(), check('email', 'Email is required').isEmail()], users.createUser);
// router.put('/:id', [check('name', 'Name is required').not().isEmpty(), check('email', 'Email is required').isEmail()], users.updateUser);
// router.delete('/:id', auth, users.deleteUser);
