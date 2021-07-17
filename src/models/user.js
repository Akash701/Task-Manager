const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
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
        unique:true,
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
    },
    tokens:[{
        token:{
            type:String,
            required:true,
            
        }
    }]
    

////// CREATING A MODEL ///////       

})

userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.toJSON = function(){
    const user = this 
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.methods.generathAuthToken = async function(){
    const user = this 
    const token = jwt.sign({_id:user._id.toString()},'thisismykey')
    user.tokens=user.tokens.concat({token})
    console.log(user._id);
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}



// PRE and POST are fuctions of Middleware
// There is pre and post (pre- is for datas that is before creating)(post - is for data after creating)
userSchema.pre('save',async function(next){
    const user = this
   if(user.isModified('password')){
       user.password = await bcrypt.hash(user.password,8)
   }
    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User