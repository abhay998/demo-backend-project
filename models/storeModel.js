const mongoose = require("mongoose");

const storeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the contact name"],
    },
   location: {
    type: String,
    required: [true, "Please add the location"],
   },
   product: [
     {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}
   ]
  },
);

module.exports = mongoose.model("Store", storeSchema);
