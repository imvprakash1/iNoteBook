const mongoose = require('mongoose');
const mongoURI="mongodb://localhost:27017/inotebook";

const connectToMongoDB=()=>{
    mongoose.connect(mongoURI)
}

module.exports=connectToMongoDB;