const path = require('path')
const express = require('express');
const hbs = require('hbs')
const weatherService = require('../utils/util.js')

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))
const app = express();
const viewPath = path.join(__dirname,'../template/views');
const partialsPath = path.join(__dirname,'../template/partials')
const publicPath = path.join(__dirname,'../public');

app.set('view engine','hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicPath));

app.get('',(req, res) => {
    res.render('index',{
        title : 'Weather',
        name : 'Muthu Krishnan S'
    });
})

app.get('/about',(req, res) => {
    res.render('about',{
        title : 'About',
        name : 'Muthu Krishnan S'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        title : 'Help',
        name : 'Muthu Krishnan S'
    })
})

app.get('/weather',(req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'Address is must'
        })
    }

    //return res.send(getCode(address))
    weatherService.geoLocation(req.query.address, (error, resp = {}) => {
        if(error){
            return res.send({error})
        }else{
            weatherService.weatherDetail(resp.latitude, resp.longitude, (error, weatherDetail = {}) => {
                const {temperature:temp, precipType:prediction = '', summary} = weatherDetail;
                if(error){
                    return res.send({error})
                }else{
                    return res.send({place : resp.place,...weatherDetail})
                }
            })
        }
    })
})

app.get('*',(req, res) => {
    res.render('404',{
        errorMessage : 'Resource Unavailable',
        name : 'Muthu Krishnan S',
        title: '404'
    })
})

app.listen(3000)