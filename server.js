const express = require("express");
const { PORT, DB_URL } = require("./config");
const router = require("./routes");
const { errors } = require("celebrate");
const bodyParser = require("body-parser");
const connect = require("connect");
const JoiValidation = require("./middlewares/joiValidation");
const mongoose = require('mongoose');
const path = require("path");

// Database connection
// const connectDB = async () => {
//     try {
//         // mongodb+srv://karanbhavsar:<password>@cluster0.jbnhbvd.mongodb.net/
//       const conn = await mongoose.connect(`mongodb+srv://karanbhavsar:karan111@cluster0.jbnhbvd.mongodb.net/`,{});
//       console.log(`MongoDB Connected: {conn.connection.host}`);
//     } catch (error) {
//       console.error(error.message);
//       process.exit(1);
//     }
//   }
//   connectDB();
// mongoose.connect("mongodb+srv://karanbhavsar:karan111@cluster0.jbnhbvd.mongodb.net/", {
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true
//     // useFindAndModify: false,
// });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//     console.log('DB connected...');
// });



const app =express()

app.use(express.json())


global.appRoot=path.resolve(__dirname)
// app.use(require('connect').bodyParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/api",router)
mongoose.connect("mongodb+srv://karanbhavsar:karan111@cluster0.jbnhbvd.mongodb.net/", {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('DB mongo connected...');
});
app.use(JoiValidation);


app.listen(PORT,()=>console.log(`Server listening on port ${PORT}`))