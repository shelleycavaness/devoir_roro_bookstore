import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import path from 'path'  //this help node find pahts
import { basicRouter } from "./routes/basic"
import {booksRouter} from './routes/books'
import { adminRouter } from './routes/user'

mongoose.connect('mongodb://localhost/rorobooks_db');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!") 
});
const app = express()

const {PORT} =process.env

// app.get('/',(req, res) =>{
//     //res.send('html?')
//     res.json('json')
// })

//views
app.use(express.static(path.join(__dirname,'../public')))
app.set('views', path.join(__dirname, 'views')) //flexibility for views
app.set('view engine', 'pug')

app.use(express.urlencoded({extended: true}))

app.use('/books',  booksRouter)
app.use('/admin', adminRouter)


app.use('/', basicRouter)


app.listen(PORT, ()=>{
    console.log(`it's working on ${PORT}`)
}) 