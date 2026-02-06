const express=require("express");
const { handlegenerateshorturl, handleredirect,handleanyaltics } = require("../controllers/urlcontroller");
const router=express.Router();

router.post("/",handlegenerateshorturl)

router.get("/:shortid",handleredirect)
router.get("/analytics/:shortid",handleanyaltics)

module.exports=router;