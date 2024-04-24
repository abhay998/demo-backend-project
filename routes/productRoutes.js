const express = require("express");
const router = express.Router();
const multer = require('multer');
const app = express();
var cors = require('cors')
const {
 createProduct, getProduct, showAll, showOne
} = require("../controllers/productController");
const validateToken = require("../middleware/validateTokenHandler");
const bodyParser = require("body-parser");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix +".jpg")
    }
  })
  
  const upload = multer({ storage: storage })

// router.use(validateToken);

app.use(cors())
app.use(bodyParser.urlencoded(
    { extended:false }
))
app.use(bodyParser.json())
//validateToken  
router.post("/createproduct", upload.single('avatar'), createProduct)
router.get("/getproduct", getProduct);
router.get("/show", showAll);
router.get("/show/:id", showOne);



module.exports = router;
