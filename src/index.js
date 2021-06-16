const express = require('express')
const Task = require('./models/task')
const User = require('./models/user')
require('./db/mongoose')


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())  // parse the json coming from postman

//Creating resourse//
app.post('/users',(req,res)=>{
    const user = new User(req.body)
    console.log(req.body);
    user.save().then(()=>{
        res.status(201).send(user)
        }).catch((error)=>{
            res.status(400).send(error)
        })
})

app.post('/task',(req,res)=>{
  const task = new Task(req.body)
  console.log(req.body);
  task.save().then(()=>{//task
    res.status(201).send(task)
  }).catch((error)=>{
        res.status(400).send(error)
  })
})
//Creating resourse//
app.get('/users',(req,res)=>{
    User.find({}).then((user)=>{ //To fetch all the datas
        res.send(user)
    }).catch((error)=>{
          res.status(500).send()
    })
})

app.get("/users/:id",(req,res)=>{
     const _id = req.params.id
     console.log(req.params);
     User.findById(_id).then((user)=>{
       if(!user){
         return res.status(404).send('User not found')
       }
       res.send(user)
     }).catch((error)=>{
            res.status(500).send()
     })
})

app.get("/task",(req,res)=>{
      Task.find({}).then((task)=>{
          res.send(task)
      }).catch((error)=>{
            res.status(401).send(error)
      })
})

app.get("/task/:id",(req,res)=>{
    const _id = req.params.id
    Task.findById(_id).then((task)=>{
        if(!task){
          return res.status(404).send()
        }
            res.send(task)
    }).catch((error)=>{
          res.send(error)
    })
})


app.listen(port,()=>{
    console.log('Server is running on '+ port);
})