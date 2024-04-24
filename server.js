const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
// const fileUpload = require('express-fileupload');
var bodyParser = require('body-parser')

connectDb();
const app = express();

const port = process.env.PORT || 5000;
// app.use(fileUpload());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, bodyParser: false })); // Support encoded bodies
app.use(bodyParser.json({
  type: ["application/x-www-form-urlencoded", "application/json"], // Support json encoded bodies
}));
app.use(errorHandler);


app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/stores", require("./routes/storeRoutes"));


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
