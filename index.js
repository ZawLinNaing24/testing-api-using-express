require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/stocks", require("./routes/stock-route"));
const PORT = 3000;

mongoose.connect(process.env.DB_CONNECTION).then(() =>{console.log("Connect to MongoDB")}).catch((e)=>console.error(e));

const users =[
  {
    id:1,
    name:"Mg Mg",
    email:"mgmg@gmail.com"
  },

  {
    id:2,
    name:"Ha Ha",
    email:"haha@gmai.com"
  }
]
// app.use(express.json());

// Get Method
app.get('/users',(req,res)=>{
  res.send(users);
});

// Post Method
app.post('/users',(req,res)=>{
  users.push({id: users.length+1,...req.body}),
  res.send({message:"User add successfully"});
  console.log('req====>',req.body);
})

// Delete Method
app.delete('/users/:id',(req,res)=>{
  let index = users.findIndex((v) => v.id === Number(req.params.id));
  users.splice(index,1);
  res.send({message:"Delete user successfully"});
  console.log(`req from Delete method ===> ${req.params.id}`)
});

//Put Mehtod
app.put('/users/:id',(req,res)=>{
  let index = users.findIndex((v) => v.id === Number(req.params.id));
  users.splice(index,1,{id:Number(req.params.id),...req.body});
  res.send({message:"Put user successfully"});
})

app.listen(process.env.PORT || PORT,()=>{
  console.log("Server is running");
});
