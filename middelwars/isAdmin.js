const express = require("express");
const User = require("../moduls/User");

const isAdmin = async(req ,res ,next)=>{
    try {
        const admin = await User.findById(req.user.user._id)
        // console.log(admin);
        if (admin.role !== 1) {
            return res.status(401).json({message:"Unauthroization"})
        }
        else{
            next()
        }
    } catch (error) {
        return res.status(500).json({message:"server eror",error})
    }
}

module.exports = isAdmin