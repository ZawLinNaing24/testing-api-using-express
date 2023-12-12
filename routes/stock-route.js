const express = require('express');

const Stock = require('../models/Stock');

const router = express.Router();


// const Stock = require('../models/Stock')

/* https://localhost:3000/api/stocks/ */
router.get("/" ,async (req,res,next) => {
  try {
    const page= parseInt(req.query.page);/*Queryကလာတဲ့ Data က String*/
    const perpage = parseInt (req.query.perpage);
    const search = req.query.search;

    const filter ={};
    if(search){
      filter["$text"] = {"$search" : search};
    }

    const offset=(page-1) *perpage;

    const stocks = await Stock.find(filter).limit(perpage).skip(offset);

    const total = await Stock.countDocuments(filter);
    res.json({
      code:200,
      message:"Success",
      data:stocks,
      total
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({
      code:500,
      message:e.message,
    })
  }

});

// asynchronous function can handle more requests than normal function
router.post('/', async(req,res,next) =>{
  try {
    const {code,name,price} =req.body;
    const stock = new Stock ({code:code,name:name,price:price})
    await stock.save();
    res.status(201).json({
      code:201,
      message:"Stock created Successfully",
      data:stock
    })
  } catch (e) {
    console.log(e);
    res.status(500).json(
      {
        code:500,
        message:e.message
      }
    );
  }
});

const getById = async (req,res,next) => {
  try {
    const {id} = req.params; //req.parmas က object
    const stock = await Stock.findById(id);
    if(!stock){
      return res.status(404).json({
        code:404,
        message:"Stock not found."
      });
    }
    req.stock = stock;
    next();

  } catch (e) {
    console.log(e);
    res.status(500).json({
      code:500,
      message:e.message
    });
  }
};

// Get Method for a stock
router.get('/:id', getById, async (req,res ) =>{
  res.status(200).json({
      code:200,
      message:"Success",
      data:req.stock
    });
});

//Other use POST method instead of using PUT Method to update the Product
router.put("/:id",getById,async(req,res,next) =>{
  try {
    const stock = req.stock;
    stock.code = req.body.code;
    stock.name = req.body.name;
    stock.price = req.body.price;
    await stock.save();
    res.status(200).json({
      code:200,
      message:"Update Successfully.",
      data:stock
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      code:500,
      message:e.message,
    });
  }
});
// Delete method
router.delete("/:id",getById,async(req,res,next) =>{
  try {
    await req.stock.deleteOne();
    res.status(200).json({
      code:200,
      message:"Delete Stock Successfully.",
    });
  } catch (e) {
    console.log(e);
    res.json({
      code:500,
      message:e.message
    });
  }
});
module.exports = router;
