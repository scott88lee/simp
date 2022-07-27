const db = require('../db');

const createUser = async (usr) => {
    console.log(usr);
    // password_hash VARCHAR(128) NOT NULL,
    // first_name VARCHAR(64) NOT NULL,
    // last_name VARCHAR(64) NOT NULL,
    // email VARCHAR(256) NOT NULL,
    try {
        let sql = `INSERT INTO users (first_name, last_name, email, password_hash) VALUES ('${usr.first_name}', '${usr.last_name}', '${usr.email}', '${usr.hash}');`;
        console.log(sql);
        let result = await db.query(sql);
        console.log(result);
        if (result.rowCount > 0) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const findUser = async (email) => {
    try {
        let sql = `SELECT * FROM users WHERE email = '${email}';`;
        console.log(sql);
        let result = await db.query(sql);

        if (result.rowCount > 0) {
            return result.rows[0];
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}


module.exports = {
    createUser,
    findUser

}