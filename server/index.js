require('dotenv').config();
const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const app = express();

//REDUNDANT CODE
const cors = require('cors');
const db = require('./db');
// app.use(cors());
//REDUNTANT CODE

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine setup
const hbsConfig = {
    layoutsDir: __dirname + '/views/layouts',
    extname: '.hbs',
    defaultLayout: 'default',
    helpers: {
        equal: function (a, b) {
            return (a == b) ? true : false
        },
        notEqual: function (a, b) {
            return (a != b) ? true : false
        }
    }
}

app.engine('hbs', handlebars(hbsConfig));
app.set('views', path.join(__dirname, '/views/'));
app.set('view engine', 'hbs');

// Routes
app.get('/', (req, res) => { res.send('Hello World!'); });

app.use('/admin', require('./routes/admin'));
app.use('/api/users', require('./routes/users'));

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
app.listen(PORT, () => { console.log(`HTTP listening port: ${PORT}`); });
