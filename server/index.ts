import dotenv from 'dotenv';
dotenv.config();

import express, {Request, Response, NextFunction} from 'express';
import path from 'path';
const handlebars = require('express-handlebars');

const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use( function(req: Request, res: Response, next: NextFunction) {
    console.log("Request: " + req.method + " " + req.path);
    next();
} );

// View engine setup
const hbsConfig = {
    layoutsDir: __dirname + '/views/layouts',
    extname: '.hbs',
    defaultLayout: 'default',
    helpers: {
        equal: function (a: any, b: any): Boolean {
            return (a == b) ? true : false
        },
        notEqual: function (a: any, b: any): Boolean {
            return (a != b) ? true : false
        }
    }
}

app.engine('hbs', handlebars(hbsConfig));
app.set('views', path.join(__dirname, '/views/'));
app.set('view engine', 'hbs');

// Routes
app.get('/', (req: Request, res: Response) => { res.send('Hello World!'); });

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
