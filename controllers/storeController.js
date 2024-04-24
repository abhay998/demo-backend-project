const Store = require('../models/storeModel');
const asyncHandler = require("express-async-handler");
const createStore = asyncHandler(async (req, res) => {
  
    //  console.log("The request body is :", req?.files?.image);
    //  console.log("body The request body is :", req.body);

     const { name, location} = req.body;

     if (!name || !location) {
       res.status(400);
      throw new Error("All fields are mandatory !");
    }
    const store = await Store.create({
       name, location
    });
  
    res.status(201).json(store);
  });

  module.exports = {
   createStore
   };