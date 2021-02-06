const path=require('path')
const express= require('express')
const hbs=require('hbs')
const forecast=require('./utils/forecast')
const { response } = require('express')
const fetch = require("node-fetch");

const app=express()
const port=process.env.PORT ||3000

//define path for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')


//setup handelbars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{name:'matin paymani',title:'index page!!!!!!!!!!'})
})

app.get('/help',(req,res)=>{
    res.render('help',{
        country:'denmark',title:'help page?????????????',name:'matin paymani'
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error:'you must enter search key'
        })
    }
       res.send({
        products:[{search:req.query.search}]
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.location)
    {
        return res.send({
            error:'please define what location you want to receive its weather?'
        })
    }
    forecast(req.query.location,(error,result)=>{
        if(error){
            return res.send({
            error
        })}

        res.send({
            result
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{errorname:'Opooooos, that atricle does not exist'})
})
app.get('*',(req,res)=>{
    res.render('404',{errorname:'Page not found'})
})
//app.comnpm audit
//app.com/about
//app.com/help
//  fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//      response.json().then((data)=>{
//          console.log(data)
//      })
//  })



app.listen(port,()=>{
console.log('the server is un and running on port'+port)
})




