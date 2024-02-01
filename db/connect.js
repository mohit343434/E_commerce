const dotenv = require("dotenv");
dotenv.config();
const mongoose = require('mongoose');
const  mongoDB = 'mongodb://127.0.0.1/shoesfy';
// const  mongoDB = process.env.URl;
const con = mongoose.connect(mongoDB)
.then(()=>{
    console.log(`Daatabase is connect `);
})
.catch((err)=>{
    console.error(`mongoosedb error ${err}` );
})

module.exports = con




