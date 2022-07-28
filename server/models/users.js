const db = require('../db');

const createUser = async (usr) => {
    console.log(usr);
    try {
        // password_hash VARCHAR(128) NOT NULL, first_name VARCHAR(64) NOT NULL, last_name VARCHAR(64) NOT NULL, email VARCHAR(256) NOT NULL,
        let sql = `INSERT INTO users (first_name, last_name, email, password_hash) VALUES ('${usr.first_name}', '${usr.last_name}', '${usr.email}', '${usr.hash}') RETURNING user_id;`;
        console.log(sql);
        
        let result = await db.query(sql);
        if (result.rowCount > 0) {
            return result.rows[0].user_id;
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