const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCodeSearch = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.port

const app = express()
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../public/templates/views')
const paritialsPath = path.join(__dirname, '../public/templates/partials')
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(paritialsPath)
app.use(express.static(publicPath))


/*app.get('', (req, res) => {
     res.send('<h1>Weather Application</h1>')
})

app.get('/help', (req, res) => {
       app.use(express.static(path.join(publicPath, 'help.html')))    

    res.send([{
        name: 'Selvi',
        age: 43
    },{
        name: 'Savitha',
        age: 15
    },{
        name: 'Loshini',
        age: 10
    }])
})*/
/*app.get('/about', (req, res) => {
    res.send('<h1>About Us!</h1>')
})*/

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        name:'Selvi',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Selvi'
    })
})

app.get('/about', (req,res) => {
    res.render('about', { 
        title: 'About Us!',
        name: 'Selvi S'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }
    geoCodeSearch(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error
            })
        } else {
            forecast(data.latitude, data.longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error
                    })
                } else {
                     res.send({
                         location: data.location,
                         forecast: forecastData,
                         address: req.query.address
                     })
                }
            })
        }
    }) 
    
    //res.send(req.query)
    /*res.send({
        location: 'Chennai',
        temperature: '34 degree celcius',
        rain: 'no'
    })*/
})
app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)

    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('pagenotfound', {
        title: '404',
        name: 'Selvi',
        errorMessage: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('pagenotfound', {
        title: '404',
        name: 'Selvi',
        errorMessage: 'Page not found'
    })
})
app.listen(port, () => {
    console.log('Server listening at port ' + port)
})