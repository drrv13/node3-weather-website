
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// Define paths for Express config
const publicDiractoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDiractoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'hsone Mead'
    })
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'hsone Mead'
    })
})
app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help page',
        helpMessage: 'some dynamic help message',
        name: 'hsone mead'
    })
})


app.get('/weather', (req, res) => {
    let errorMessage = 'You must provide an address query';
    if (!req.query.address) {
        return res.send({
            error: errorMessage
        })


    }     geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if (error) {
            return res.send({
                error: error
            })
        }forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'hsone mead'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'hsone mead'
    })
})
//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
    console.log('server is up on port 3000')
})