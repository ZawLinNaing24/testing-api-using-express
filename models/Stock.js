const {Schema,model}= require('mongoose');

const stockSchema = new Schema({
  code:{
    type:String,
    require:true
  },
  name:{
    type:String,
    require:true
  },
  price:{
    type:Number,
    require:true
  }
},
{timestamps:true}
);
stockSchema.index({"$**": "text"})
module.exports =model("Stock",stockSchema);
