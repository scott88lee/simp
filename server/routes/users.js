"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// const users = require('../controllers/users');
const users = __importStar(require("../controllers/users"));
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
