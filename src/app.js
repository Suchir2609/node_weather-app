const path = require('path')
const express = require('express')
const hbs = require('hbs')
const utils = require('./utils/geocode')
 
const app = express()

app.set('view engine', 'hbs')

app.set('views', path.join(__dirname, '../templates/views'))
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Suchir Gupta'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Suchir Gupta'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'This is some helpful text',
        title:'Help',
        name:'Suchir Gupta'
    })
})

app.get('/products',(req,res)=>{
if(!req.query.search){
    return res.send({
        error:'you must provide a search term'
    })
}
    console.log(req.query.search)   
    res.send({
        products:[],
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide a valid address'
        })
    }

    utils.geocode(req.query.address,(error, {latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        console.log(location)
        utils.forecast(latitude, longitude, (error, forcast_data) => {
        if(error){
            return res.send({error})
        }   
        res.send({
            forecast:forcast_data,
            location,
            address:req.query.address,
        })
        })
    })

    // res.send({
    //     location:'Pune',
    //     forcast:'50 degrees celcius',
    //     address:req.query.address,
    // })
})

// app.get('/products',(req,res)=>{
//     if(!req.query.search){
//         return res.send({
//             error:'You must provide a search term'
//         })
//     }
    
//     console.log(req.query.search)
//     res.send({
//         products:[]
//     })
// })

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404',
        text : 'Page not found',
        name:'Suchir Gupta'
    } )
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'404',
        text:'Help article not found',
        name:'Suchir Gupta'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})