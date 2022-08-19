"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate = require('../util/validators');
const Users = require('../models/users');
const mailer = require('../util/mailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const auth = require('../helpers/auth');
function createNew(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Validate input data
        let inputErrors = validate.createNewUser(req.body);
        if (inputErrors) {
            res.status(400);
            res.json({ Success: "false", Message: inputErrors });
            return;
        }
        let exist = yield Users.findUser(req.body.email);
        if (exist) {
            res.status(400).json({ Success: false, Message: 'User already exist.' });
            return;
        } // End of validation block
        try {
            // Hash password
            req.body.hash = yield bcrypt.hash(req.body.password, 8);
            // Create user
            let user_id = yield Users.createUser(req.body);
            // Send email
            yield mailer.sendWelcome(req.body.email);
            // Send JWT
            const payload = {
                sub: user_id,
                iat: Date.now()
            };
            const secret = process.env['JWT_SECRET'];
            const signedToken = jwt.sign(payload, secret, { expiresIn: 172800 });
            res.json({
                id: user_id,
                token: "Bearer " + signedToken,
                expires: 172800
            });
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.createNew = createNew;
function test(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let mailer = require('../util/mailer');
        yield mailer.sendVerify('scott88lee@gmail.com');
        res.send("Hello world!");
    });
}
exports.test = test;
function currentUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send("Hello world!");
    });
}
exports.currentUser = currentUser;
