//CRUD - Create,Read,Update,Delete
const {MongoClient,ObjectID, Db} = require('mongodb')

const id = new ObjectID()
console.log(id);
console.log(id.getTimestamp());
//   const MongoClient = mongodb.MongoClient
console.log(id.toHexString());
console.log(id.id);

const connectionURL = 'mongodb://127.0.0.1:27017' // The URL is the Mongodb url running in the terminal
const databaseName = 'task-manager'



MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{
if(error){
   return console.log("Unable to connect database");
}
 const db = client.db(databaseName)


 //// CREATE /////
//  db.collection('user').insertOne({
//     name:'Akash',
//     age:22
    

//  },(error,result)=>{
//       if(error){
//        return  console.log('Unable to incert user');
//       }
//       console.log(result.ops);
//  })

///// INSERTONE METHOD ////

// db.collection('task').insertMany([{
//    description:'Flutter',
//    completed:true,
// },{
//    description:'Nodejs',
//    completed:false
// },{
//    description:'MongoDB',
//    completed:false
// }

// ]
// ).then((result)=>{
//       console.log(result.ops);
// }).catch((error)=>{
//    console.log('Unable to connect');
// })

// db.collection('user').insertMany([{
//    name:'Akash',
//    age:22,
// },
// {
//    name:'Kiran',
//    age:20
// },
// ],
// (error,result)=>{
//    if(error){
//       console.log('Unable to connect');
//    }
//    console.log(result.ops);
// }

// )
// db.collection('user').insertMany([{
//    description:'Flutter',
//    Completed:true,
// },{
//    description:'Node.js',
//    Completed:true,
// },{
//    description:'RestApi',
//    Completed:false
// }
// ],
// (error,result)=>{
// if(error){
//    console.log('Unable to connect');
// }
// console.log(result.ops);
// }
// )
/////  INSERTMANY  ////
    //// CREATE /////



    ////  READ  ////
   ///// FINDONE /////

// db.collection('user').findOne({_id:new ObjectID('60bf1ad2ac47ee117adf7bc1')},(error,user)=>{

//    if(error){
//       console.log("Cannot access the db");
//    }
//    console.log(user);
// })


 /// FIND ///


// db.collection('user').find({Completed:false}).toArray((error,user)=>{
//   if(error){
//      console.log('Unable to connet');
//   }
//   console.log(user);
// })
      /////READ /////



      //// UPDATE ////
   ////  UPDATEONE ////

// db.collection('user').updateOne({
//    _id: new ObjectID('60bda0b40dfe8a0cad71e9f6')
// },{
//    $set: {
//       name:'Achu'
//    }
// }).then((result)=>{
//    console.log(result);
// }).catch((error)=>{
//    console.log(error);
// })
 

//// UPDATEMANY ////



// db.collection('task').updateMany({
//    completed:false
// },{
//    $set:{
//        completed:true
//    }
// }).then((result)=>{
//    console.log(result);

// }).catch((error)=>{
//       console.log('Unable to connect');
// })

/// UPDATEMANY ////
///// UPDATE /////



  //// DELETE /////
//// DELETEMANY /////

// db.collection('user').deleteMany({
//    Completed: true,
// },{
//    Completed:false
// },).then((result)=>{
//    console.log(result);
// }).catch((error)=>{
//    console.log(error);
// })

///// DELETEMANY ////


//// DELETEONE ////

db.collection('task').deleteOne({
   _id: new ObjectID('60c0f52f5424707aa35703e4')
},{
   _id: new ObjectID('60c0f52f5424707aa35703e5')
   
}).then((result)=>{
   console.log(result);
}).catch((error)=>{
   console.log(error);
})


})