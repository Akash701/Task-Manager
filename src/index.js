const express = require('express')
const userRouter = require('./Router/user')
const taskRouter = require('./Router/task')
require('./db/mongoose')


const app = express()

const port = process.env.PORT || 3000

// app.use((req,res,next)=>{
// if(req.method ==="GET"){
//  res.send('Get not available at the moment')
// }
// else{
//  next()
// }
// })

// app.use((req,res,next)=>{
// if(req.method === "Get"||"POST"||"PATCH"||"DELETE"){
//     res.status(503).send("Server at maintenance")
// }
// else{
//     next()
// }
// })

app.use(express.json())// parse the json coming from postman
app.use(userRouter)
app.use(taskRouter)

//bcrypt is used used for security ie: Hashing
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const myFunction = async()=>{
    const token = jwt.sign({_id:'abc123'},'thisismykey',{expiresIn:'7days'})
    console.log(token);

    const data = jwt.verify(token,'thisismykey')
    console.log(data);
}
// myFunction()

app.listen(port,()=>{
    console.log('Server is running on '+ port);
})
const Task = require('./models/task')
const User = require('./models/user')

const main = async()=>{

    // const task = await Task.findById('60f269c16d9cd90db5165db7')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner);
    const user = await User.findById('60f11d8f7784821f47f0508e')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks);
}

main()