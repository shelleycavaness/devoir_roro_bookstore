import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { classBody } from 'babel-types';
const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{ type:String,  trim: true},
    name:{type:String,  trim: true},
    email:{type:String, },
    password:{type:String, },
})

//here we are checking inthe database that the email is there
userSchema.statics.authenticate= function(email, password, cb){ //cb is callback
    User.findOne({email:email} )
        .exec(function(err, user){ // .exec method of Mongo ES5 here
            if(err){
                return cb(err)
            } else if(!user){
                const error = new Error('user not found')
                err.status= 401
                return cb(err)
            } 
            bcrypt.compare(password, user.password, function(err, result){
                if(result ===true){
                    return cb(null, user) //null = error and result= user
                } else {
                    return cb()
                }
            })
        })
}

//config bcrypt (this has to be written in ES 5! )
userSchema.pre('save', function(next){  //right before the save you fire this middleware
    const user = this // this is for each instance of the model
    bcrypt.hash(user.password, 10, function(error, hash){
        if(error)return next(error)  //bcrypt sends the error, next is a method of express
        user.password = hash
        next()
    })
})

const User= mongoose.model("User", userSchema)
export{ User}