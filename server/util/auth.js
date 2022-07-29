const jwt = require('jsonwebtoken');
const db = require('../db');

const extract = (header) => {
  let token;
  for (let i = 0; i < header.length; i++) {
    if (header[i].toLowerCase().includes('authorization')) {
      _temp = header[i + 1].split('Bearer ');
      token = _temp[_temp.length - 1];
    }
  }
  return token;
}

const authenticate = async (req) => {
  const token = extract(req.rawHeaders)
  if (!token) { return { success: false, message: 'Auth token not supplied.' };}

  try {
    let decoded = await jwt.verify(token, process.env['JWT_SECRET'])
    return { success: true, message: 'Auth token verified.', decoded };
  }
  catch (err) {
    return { success: false, message: 'Auth token invalid.' };
  }
}

module.exports = {
  auth: async (req, res, next) => { // Main function to authenticate and authorize requests
    
    // Authentication block
    let authentication = await authenticate(req);
    console.log(authentication);

    if (!authentication.success) {
      res.status(401).json({
        success: false,
        message: authentication.message
      });
      return;
    }

    //find user in db
    let user = await db.query(`SELECT * FROM users WHERE id = $1`, [authentication.decoded.id]);

    // Authorization block

    console.log(req.originalUrl)
    console.log(req.method)
    next();
  },

  admin: async (req, res, next) => {
    next();
  }
}