const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User',{
    name:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('Age must be possitive')
            }
        }

       
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ('email is not valid')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(value.length<6){
                throw new Error('Must contain greater than 6')
            }
            if(value.toLowerCase().includes('password')===true){
                throw new Error('Must not contain "password"')
            }
        }
    }

////// CREATING A MODEL ///////       

})

module.exports = User