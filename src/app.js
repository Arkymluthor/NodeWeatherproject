const path = require('path')

const express = require('express')

const  hbs =require('hbs')


const geocode = require('./utils/geocode')

const forecast = require('./utils/forecast')

//const { response } = require('express')

const app = express()
const port = process.env.PORT || 3000

//console.log(__dirname)
//console.log(path.join(__dirname,'../public'))



//Define Paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath =path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

// Setup handlbars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


//
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Myra'

    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Akeem Afuwape'

    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help page",
        name:'LutherCorp'
    })
})



app.get('',(req, res)=>{

    res.send('<h1>Hello Express </h1>')

})

// app.get('/help',(req,res)=>{
//     res.send('help.html')

// })

// app.get('/about',(req,res)=>{

//     res.send('about.html')

// })

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provide an address'
        })

    }


   // res.send({

        geocode(req.query.address,(error,{longitude, latitude, location} = {})=>{

        if(error){
            return res.send({
                error:'Address not correct'
            })
        }
        forecast(longitude,latitude, (error, forecastData) => {
            if (error){
                return res.send({
                    error})
            }
         //console.log(location)
         //console.log(forecastData)
            res.send({
            forecast: forecastData,
            location:location,
            address: req.query.address
    
            })
        
        })

    
        })

    //})
    

})

app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error: 'You must provide  a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]})

})
app.get('/help/*',(req,res)=>{
    res.render('errorpage',{
        title:'Help article not found',
        name: 'Return to /help',
        errorMessage: 'Article not found'

    
    })

})
app.get('*',(req,res)=>{
    res.render('errorpage',{
        title: 'My 404 Page',
        name: 'Please go to home for more instructions',
        errorMessage:'Page not found'
    })

})


app.listen(port,()=>{
    console.log('Server is up on port '+ port)
})