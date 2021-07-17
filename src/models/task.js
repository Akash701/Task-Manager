const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const Task = mongoose.model('Task',{
    description:{
        type:String,
        trim:true,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    owner:{ 
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }

})

// taskSchema.pre('save',async function(next){
// const task = this
// if(task.isModified('description')){
//     task.description = await bcrypt.hash(task.password,8)
// }
// next()
// })

// const Task = mongoose.model('Task',taskSchema)

module.exports = Task