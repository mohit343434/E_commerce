const express = require("express");
const router = express.Router();
const { UserSignup, UserLogin } = require("../cotrolers/User");
const multer = require("multer")();
const Authantion = require("../middelwars/Authantion");
const isAdmin = require("../middelwars/isAdmin");
/* ------------ SinUp ---------- */
router.post("/singnup", multer.none(), UserSignup);

/* ----------- Login User ------- */
router.post("/login", UserLogin);

router.get("/test" , Authantion, isAdmin,(req,res)=>{
    // console.log(req);
 return   res.status(200).json({message:"ok"  })
})
module.exports = router;
