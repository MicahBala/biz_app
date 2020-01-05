require('dotenv').config();
const mongoose = require('mongoose');

const db = process.env.NODE_ENV === 'test' ? 'test' : 'business';

const db_password = process.env.DB_PASSWORD;
const uri = `mongodb+srv://micahbala:${db_password}@cluster0-stas6.mongodb.net/${db}?retryWrites=true&w=majority`;
// Connect to database
try {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    connectTimeoutMS: 60000,
    socketTimeoutMS: 60000
  };
  mongoose.connect(uri, options);
  console.log(`Successfully connected to ${db} database`);
} catch (error) {
  console.log(`Unable to connect to ${db} database!`);
  console.error(error.message);
}

// mongoose
//   .connect(
//     `mongodb+srv://micahbala:${password}@cluster0-stas6.mongodb.net/business?retryWrites=true&w=majority`,
//     { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
//   )
//   .then(done => {
//     console.log('Successfully connected to MongoDB Atlas!');
//     done();
//   })
//   .catch(error => {
//     console.log('Unable to connect to MongoDB Atlas!');
//     console.error(error.message);
//   });

module.exports = mongoose;
