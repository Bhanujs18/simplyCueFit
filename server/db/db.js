const mongoose = require('mongoose')


const db = async() => {
    await mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("DB connected successfully"))
    .catch(()=>console.log("DB connection failed!!"))
}


module.exports = db;