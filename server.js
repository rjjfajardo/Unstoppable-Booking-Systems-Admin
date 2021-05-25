
require('dotenv').config();

const express = require('express')
const configViewEngine = require('./config/viewEngine')
const initWebRoutes = require('./routes/web')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const connectFlash = require('connect-flash')
const passport = require('passport')

const connection = require("./config/connectionDB")


// //Middleware and Static
// app.use(express.static('public'));

// // set the view engine to ejs
// app.set('view engine', 'ejs');

// // use res.render to load up an ejs view file

// // landing page
// app.get('/landing', function(req, res) {
//     res.render('pages/landinglogin');
// });

// // index page
// app.get('/', function(req, res) {
//     res.render('pages/index');
// });

// // car list page
// app.get('/carlist', function(req, res) {
//     res.render('pages/carlist');
// });

// // bookings page
// app.get('/booking', function(req, res) {
//     res.render('pages/booking');
// });

// // new car form
// app.get('/carform', function(req, res) {
//     res.render('pages/carform');
// });

// // profile page
// app.get('/profile', function(req, res) {
//     res.render('pages/profile');
// });

// // profile page
// app.get('/editprofile', function(req, res) {
//     res.render('pages/editprofile');
// });






let app = express();

//use cookie parser
app.use(cookieParser('secret'));

//config session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
    }
}));

// Enable body parser post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//Config view engine
configViewEngine(app);

// Walkthrough
// initPageRoutes(app);





//Enable flash message
app.use(connectFlash());

//Config passport middleware
app.use(passport.initialize());
app.use(passport.session());

// init all web routes
initWebRoutes(app);

let port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Running on port ${port}!`));
