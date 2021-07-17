const express = require('express')
const Task = require('../models/task')
const auth = require('../middleWare/auth')
const router = new express.Router()



//Creating Task endpoint //
router.post("/task",auth,async(req,res)=>{
const task = new Task({
  ...req.body,
  owner: req.user._id
})
try {
  await task.save()
  res.status(201).send(task)
  
} catch (error) {
  res.status(400).send(error)
  
}
})


router.get("/task",async(req,res)=>{

    try {
      const task = await Task.find({})
      res.status(200).send(task)
    } catch (error) {
      res.status(400).send(error)
    }
// Task.find({}).then((task)=>{
//     res.send(task)
// }).catch((error)=>{
//       res.status(401).send(error)
// })
})

router.get("/task/:id",auth,async(req,res)=>{
const _id = req.params.id
try {
const task = await Task.findOne({
  _id, owner:req.user._id
})
if(!task){
  return res.status(404).send('Task not found')
}
else{
  res.status(200).send(task)
}

} catch (error) {
res.status(400).send(error)
}

//   Task.findById(_id).then((task)=>{
//     if(!task){
//       return res.status(404).send()
//     }
//         res.send(task)
// }).catch((error)=>{
//       res.send(error)
// })
})

//Update task //
router.patch('/task/:id',async(req,res)=>{
const updates = Object.keys(req.body)
const allowUpdateFor = ["description","completed"]
const isvalidOperation = updates.every((update)=> allowUpdateFor.includes(update))

if(!isvalidOperation){
return res.status(401).send({error:"Invalid operation"})
}
try {
const task = await Task.findById(req.params.id)
updates.forEach((update)=>task[update]=req.body[update])
await task.save()

//const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
if(!task){
return res.status(404).send('Not the task')
}
res.status(200).send(task)
} catch (error) {
res.status(500).send(error)
}
})

//deleteting task // 

router.delete('/task/:id',async (req,res)=>{
try {
const task = await Task.findByIdAndDelete(req.params.id)
if(!task){
return res.status(400).send("Invalid task")

}
res.status(200).send(task)

} catch (error) {
res.status(500).send(error)
}
})

module.exports = router

