const router = require('express').Router();
const users = require('../controllers/users');

router.post('/', users.createNew);


module.exports = router;
// const { check } = require('express-validator');
// const { auth } = require('../middleware/auth');

// router.get('/', auth, users.getAllUsers);
// router.get('/:id', auth, users.getUserById);
// router.post('/', [check('name', 'Name is required').not().isEmpty(), check('email', 'Email is required').isEmail()], users.createUser);
// router.put('/:id', [check('name', 'Name is required').not().isEmpty(), check('email', 'Email is required').isEmail()], users.updateUser);
// router.delete('/:id', auth, users.deleteUser);
