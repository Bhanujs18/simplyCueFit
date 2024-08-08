const express = require('express');
const app = express();
const dotenv = require('dotenv');
const db = require('./db/db');
const cors = require('cors');
const postRoutes = require('./routes/post')
dotenv.config();
app.use(express.json())
app.use(cors())
db();

const port = process.env.PORT; 

app.get('/' , (req, res) => {
    res.json({message : "server alive"})
})

app.use("/api/v1" , postRoutes)

app.listen(port, ()=>{
    console.log(`Server is listeing at ${port}`)
})