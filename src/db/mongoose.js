const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    useCreateIndex:true
})



// const me = new User({
//     name:'  Kiran',
//     email:'akash@gmail.com',
//     age: 4,
//     password:'Password'
// })
////// CREATING A MODEL INSTANCE ////

// me.save().then(()=>{
//     console.log(me);
// }).catch((error)=>{
// console.log('Error',error);
// })


//// SAVING IT TO DATABASE ////

// Challenge ////

// const Task = mongoose.model('Task',{
//     description:{
//         type:String,
//         trim:true,
//         required:true
//     },
//     completed:{
//         type:Boolean,
//         default:false
//     }

// })

// new Task({
//     description:"Flutter  ",
//     completed:true
// }
// ).save().then((result)=>{
//         console.log(result);
//     }).catch((error)=>{
//     console.log('Error',error);
//     })

