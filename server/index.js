"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const handlebars = require('express-handlebars');
const app = express_1.default();
// Middleware
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    console.log("Request: " + req.method + " " + req.path);
    next();
});
// View engine setup
const hbsConfig = {
    layoutsDir: __dirname + '/views/layouts',
    extname: '.hbs',
    defaultLayout: 'default',
    helpers: {
        equal: function (a, b) {
            return (a == b) ? true : false;
        },
        notEqual: function (a, b) {
            return (a != b) ? true : false;
        }
    }
};
app.engine('hbs', handlebars(hbsConfig));
app.set('views', path_1.default.join(__dirname, '/views/'));
app.set('view engine', 'hbs');
// Routes
app.get('/', (req, res) => { res.send('Hello World!'); });
app.use('/admin', require('./routes/admin'));
app.use('/api/users', require('./routes/users'));
app.use('/api/test', require('./routes/typescript'));
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
app.listen(PORT, () => {
    console.log(`HTTP listening port: ${PORT}`);
});
