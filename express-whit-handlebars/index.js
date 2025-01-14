import express from 'express'
import handlebars from "express-handlebars"
import cats from './cats.js'

const app = express()

app.use(express.static('content'))

app.engine('hbs',handlebars.engine({
    extname: 'hbs'
}))

app.set('view engine','hbs')

app.get('/',(req,res)=>{
    res.render('home/index',{ cats })
})


app.get('/cats/add-breed',(req,res)=>{
    res.render('addBreed', )
})

app.get('/cats/add-cat',(req,res)=>{
    res.render('addCat', )
})

app.listen(5000,() => console.log('Server is listening on http://localhost:5000....'))