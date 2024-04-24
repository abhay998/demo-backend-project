const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const Store = require("../models/storeModel");

const multer = require('multer');
const express = require("express");
const path = require('path');
const fs = require("fs");
const app = express();
var bodyParser = require('body-parser')
var route = express.Router();
//@desc Create New contact
//@route POST /api/contacts
//@access private



app.set("view engine","ejs");

route.use(express.static(__dirname+ "./public/"));

// SET STORAGE
var storage = multer.diskStorage({
  destination: './public/',
  filename: (req, file, cb) =>{
    cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
  }
})

var upload = multer({ storage: storage }).single('image');

const createProduct = asyncHandler(async (req, res) => {
  
    let kormanga = await Store.findOne({location: req.body?.location})

     const { name, price, quantity } = req.body;
     const image  = req?.files?.image?.name;
   

     if (!name || !image || !price || !quantity) {
       res.status(400);
      throw new Error("All fields are mandatory !");
    }
    const productval = new Product({
       name, image, price, quantity, storeId: kormanga?._id
    });
    await productval.save();
    kormanga.product.push(productval)
   let resp =  await kormanga.save();
  
    res.status(201).json(resp);
  });

 const getProduct =  asyncHandler(async (req, res)  =>{
  const contacts = await Product.find();
  res.status(200).json(contacts);
 }); 
 const showAll =  asyncHandler(async (req, res)  =>{
  try{
  const allproducts = await Store.find().populate('product');
  res.status(200).json(allproducts);
  }catch(error){
      res.status(400).json("message: error.messgae")
  }
 }); 
 const showOne =  asyncHandler(async (req, res)  =>{
  try{
  const allproducts = await Store.findById(req.params.id).populate('product');

  res.status(200).json(allproducts);
  }catch(error){
      res.status(400).json("message: error.messgae")
  }
 }); 
  module.exports = {
   createProduct,
   getProduct,
   showAll,
   showOne
  };