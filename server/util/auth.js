const db = require('../db');
const jwt = require('jsonwebtoken');

const extract = (header) => {
  let token;
  for (let i = 0; i < header.length; i++) {
    if (header[i].toLowerCase().includes('authorization')) {
      _temp = header[i + 1].split('Bearer ');
      token = _temp[_temp.length - 1];
    }
  }

  // const str1 = token.split('.')[0]
  // const str2 = token.split('.')[1]
  // let token1 = Buffer.from(str1, 'base64').toString();
  // let token2 = Buffer.from(str2, 'base64').toString();

  // console.log("Token 1: ", token1)
  // console.log("Token 2: ", token2)
  return token;
}

module.exports = {
  auth: (req, res, next) => {
    let token = extract(req.rawHeaders)

    if (!token) {
      res.status(401).json({ success: false, message: 'Auth token not supplied.'});
      return;
    }

    jwt.verify(token, process.env['JWT_SECRET'], (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Token is not valid'
        })
      } else {
        req.decoded = decoded;
        console.log(req.decoded)
        next();
      }
    })
  }
}