const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the contact name"],
    },
    image: {
      type: String,
      required: [true, "Please add the product image"],
    },
    price: {
      type: Number,
      required: [true, "Please add the product price"],
    },
    quantity: {
        type: Number,
        required: [true, "Please add the product quantity"],
      },
      storeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
      }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
