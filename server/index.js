require('dotenv').config();
const express = require('express');
const app = express();
// const cors = require('cors');
const db = require('./db');

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
}
);

const PORT = process.env.HTTP_PORT || 5000;
app.listen(PORT, () => {
    console.log(`HTTP listening port: ${PORT}`);
});
