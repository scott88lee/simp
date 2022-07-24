require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());rs

app.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, result) => {
        if (err) {
            console.log("err");
            res.status(500).send(err);
        } else {
            res.status(200).send(result.rows);
        }
    });
});

const users = require('./controllers/users');
app.get('/users', users.kahuna);

// 404 Not Found
const controller = require('./controllers/index');
app.get("*", controller.notFound);
app.put("*", controller.notFound);
app.post("*", controller.notFound);
app.patch("*", controller.notFound);
app.delete("*", controller.notFound);
app.options("*", controller.notFound);

// Start server
const PORT = process.env.HTTP_PORT || 5000;
app.listen(PORT, () => {console.log(`HTTP listening port: ${PORT}`);});
