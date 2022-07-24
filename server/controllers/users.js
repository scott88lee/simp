const bcrypt = require('bcrypt');

const  kahuna = (req, res) => {
    //let pwd = req.body.password;
    let pwd = "123456";
    //Create hash
    bcrypt.hash(pwd, 10, (err, hash) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(hash.length);
            res.status(200).send(hash);
        }
    });
}

module.exports = {
    kahuna
}