const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleWare/auth')
const app = express()


router.post('/users',async (req,res)=>{
    const user = new User(req.body) 
    console.log(req.body);
    try {
      await user.save()
      const token = await user.generathAuthToken() 
    res.status(200).send({user,token})
      
    } catch (error) {
      res.status(400).send(error)
      
    }

    // user.save().then(()=>{
    //     res.status(201).send(user)
    //     }).catch((error)=>{
    //         res.status(400).send(error)
    //     })
})


//Creating resourse//


router.post('/users/login',async (req,res)=>{
  try {
    const user = await User.findByCredentials(req.body.email,req.body.password)
    const token = await user.generathAuthToken()
    res.status(200).send({user:user , token})
  } catch (error) {
    res.status(400).send("Invalid Authentication")
  }
  
  
})
router.post('/users/logout',auth,async(req,res)=>{
  try {
    req.user.tokens =req.user.tokens.filter((token)=>{
      return token.token !== req.token
    }) 
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send() 
    
  }
  
})

router.post('/users/logoutAll',auth,async(req,res)=>{
  try {
    req.user.tokens = [] 
    await req.user.save()
    res.send('Loged out from all the account')
  } catch (error) {
    res.status(500).send()
  }
  
})


//Reading user's endpoint //
router.get('/users/me',auth,async(req,res)=>{
    res.send(req.user)

          //Using then and catch

    // User.find({}).then((user)=>{ 
    //     res.send(user)
    // }).catch((error)=>{
    //       res.status(500).send()
    // })
})

//Updating User //

router.patch('/users/me',auth,async (req,res)=>{
  const updates = Object.keys(req.body)
  const allowupdate = ["name","email","password","age"]
  const isvalidOperation = updates.every((update)=> allowupdate.includes(update))
  // every() fuction will return true if every condition is true And return false if one of them return false

  if(!isvalidOperation){
    return res.status(400).send({error:'Invalid Operation'})
  }
  try {
    // const user = await User.findById(req.user)
      updates.forEach((update)=> req.user[update] = req.body[update])
      await req.user.save()
      res.status(200).send(req.user)

    //const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
  res.send(user)
  } catch (error) {
    res.status(400).send(error)
  }
  
})

//Deleting user //
router.delete('/users/me',auth,async (req,res)=>{
  try {
    await req.user.remove()
    res.send(req.user)
  } catch (error) {
    res.status(500).send(error)
  }
})


module.exports = router
