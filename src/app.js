const path = require('path');
const express = require('express');
const hbs = require('hbs');
const chalk = require('chalk');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const cl = console.log;
const app = express();

//Define path for express config:
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and view location:
// set allows you to set a value for a given express setting and there are a few we have a key, the
// setting name and we have a value, the value we want to set for the setting in our case to set up a
// view engine like express the value is view engine.
// And it is important that this matches up exactly with the spacing and capitalization taken into account.
app.set('view engine', 'hbs');
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

//Setup static directory to serve:
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Saket Sinha'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Saket Sinha'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Saket Sinha'
    });
});

app.get('/weather', (req, res) => { // home/weather page in url
    if(!req.query.address) {
        return res.send ({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (locationError, { latitude, longitude, location } = {}) => {
        if(locationError) {
            cl(chalk.bold.inverse.red(locationError));
            return res.send({ locationError });
        }
    
        forecast(latitude, longitude, (weatherError, { forecast } = {}) => {
            if(weatherError) {
                cl(chalk.bold.inverse.red(weatherError));
                return res.send({ weatherError });
            }

            res.send({
                forecast,
                location, 
                address: req.query.address
            });
    
            cl(chalk.bold.green.inverse(location));
            cl(chalk.bold.inverse(forecast));
        });
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    res.send({
        products: []
    });
});

//'*' mean everything else than what url we have, in express we represent it like this
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Saket Sinha',
        errorMessage: 'Help  article not found... :('
    });
});


app.get('/about/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Saket Sinha',
        errorMessage: 'About article not found... :('
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Saket Sinha',
        errorMessage: 'Page not found... :('
    });
});

// To start the server up, we have to use one more method on app which will only ever use a single time
// in our application. That is app.listen, this starts up the server and it has it.
// Listen on a specific port for the moment, we're going to use a common development port, which is Port 3000.
// The second other optional argument we can pass to the listen method is a callback function, which just
// runs when the server is up and running.
app.listen(3000, () => {
    cl('Server is up on port 3000.');
});
