
const mongoose = require('mongoose')
require('dotenv').config();
const database =process.env.DATABASE_URL

const connectToDatabase = () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(
      database
    )
    .then(() => {
        
      console.log("Successfully connected to MongoDB !");
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB !");
      console.error(error);
    });

}
module.exports = connectToDatabase