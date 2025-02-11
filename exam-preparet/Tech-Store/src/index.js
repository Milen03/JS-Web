import express from 'express'
import mongoose from 'mongoose'
import handlebars from 'express-handlebars'
import cookieParser from 'cookie-parser'

import routes from './routes.js'
import { auth } from './middlewares/authMiddlewares.js'

const app = express()

//DB setuo
try{
    const uri = 'mongodb://localhost:27017/techStore' // =>> !!!! Change DB name !!! <<=
await mongoose.connect(uri)

console.log('DB Connected');
}catch(err){
console.error('Can not connect to DB');

console.log(err.message);
}
//Handlebars setup
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    },
}))

app.set('view engine','hbs')
app.set('views','./src/views')


//express setup
app.use(express.static('src/public'))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(auth)
//Router
app.use(routes)


app.listen(3000,() =>console.log('Server is listening on http://localhost:3000...'))