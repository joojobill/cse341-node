const mongoose = require('mongoose');

const URL = "mongodb+srv://isaachooper:6X7CpyQ1PcfZpNlL@cluster0.lhqxmlq.mongodb.net/";

const connectDB = async()=>{
    await mongoose.connect(URL);
    console.log('database connected...');
}

module.exports = connectDB;