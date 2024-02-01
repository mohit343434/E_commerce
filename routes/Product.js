const express = require("express");
const router = express.Router();
const {addProduct , getProduct , getOneProduct , DeleteProduct , UpdateProduct ,getOneProductById} = require("../cotrolers/Product")
const upload = require("../middelwars/upload");
/* --------- Add Product ---------- */



router.post('/product',upload.single("productIagePath"),addProduct )

router.get("/product" , getProduct)
// router.get("/product/:key" , getOneProduct)
router.get("/product/:id" , getOneProductById)

router.delete("/product/:id", DeleteProduct)

router.put("/product/:id", upload.single("productIagePath"), UpdateProduct)




module.exports = router