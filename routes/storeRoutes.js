const express = require("express");
const router = express.Router();
const app = express();
const {
    createStore
} = require("../controllers/storeController");
const validateToken = require("../middleware/validateTokenHandler");

// router.use(validateToken);
  
router.post("/createstore", createStore);

module.exports = router;
