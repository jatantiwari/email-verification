const connectToMongo = require('./config/database');
const express = require('express');
require('dotenv').config();
const port = process.env.PORT
const cors = require('cors')
connectToMongo();
const app = express();
app.use(cors())
app.use(express.json())
app.use('/api/users', require('./routes/User'))
app.listen(port,()=>{
    console.log(`listening on port at http://localhost:${port}`)
})