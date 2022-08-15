import  { Response, Request } from 'express';
const validate = require('../util/validators');
const Users = require('../models/users');
const mailer = require('../util/mailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const auth = require('../helpers/auth');

export async function createNew(req: Request, res: Response){
    // Validate input data
    let inputErrors = validate.createNewUser(req.body);
    if (inputErrors) {
        res.status(400)
        res.json({Success: "false", Message : inputErrors});
        return;
    }

    let exist = await Users.findUser(req.body.email);
    if (exist) {
        res.status(400).json({ Success: false, Message: 'User already exist.' });
        return;
    }// End of validation block

    try {
        // Hash password
        req.body.hash = await bcrypt.hash(req.body.password, 8);
        // Create user
        let user_id = await Users.createUser(req.body);
        // Send email
        await mailer.sendWelcome(req.body.email);

        // Send JWT
        const payload = {
            sub: user_id,
            iat: Date.now()
        };

        const secret = process.env['JWT_SECRET']
        const signedToken = jwt.sign(payload, secret, { expiresIn: 172800 });
        res.json({
            id: user_id,
            token: "Bearer " + signedToken,
            expires: 172800
        })
    } catch (err) {
        console.log(err)
    }
}

export async function test(req: Request, res: Response){
    let mailer = require('../util/mailer');
    await mailer.sendVerify('scott88lee@gmail.com')
    res.send("Hello world!");
}

export async function currentUser(req: Request, res: Response) {
    res.send("Hello world!");
}