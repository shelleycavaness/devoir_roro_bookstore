import express from 'express'
const adminRouter= express.Router()
import {User} from '../models/model_user'

adminRouter.get('/login', (req, res)=>{
    res.render('login')
})
adminRouter.post('/login', (req, res) =>{
    if(req.body.email && req.body.password){
     User.authenticate(req.body.email, req.body.password, function(error,user){
         if(error || !user){  
         const err = new Error('misentered pass')
         err.status =401
         return next(err)
         }
         else{
             return res.redirect('/')
         }
     })
    }        
})

adminRouter.get('/register', (req,res) =>{
    res.render('register')
})

adminRouter.post('/register', (req, res, next) =>{ //next is between the req and res
    const newUser = new User(req.body)
    newUser.save((err, user) =>{
        if(err) res.send.err
        console.log(user)
    })  
})


export { adminRouter }