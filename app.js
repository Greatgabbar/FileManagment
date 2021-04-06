const express= require('express');
const app= express();
const bodyParser=require('body-parser');
const mongoose= require('mongoose');
require('dotenv').config();
const path = require("path");
const cors= require('cors');
app.use(cors({ origin: `${process.env.CLIENT_URL}`, credentials: true }));

app.set("trust proxy", 1); // for heroku

mongoose.connect(process.env.dbURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Conneted');
});
app.use(bodyParser.urlencoded({ extended: false }))
 

// parse application/json
app.use(bodyParser.json())


app.use('/api',require('./routes/api'));

app.get('/',(req,res)=>{
    res.send('GG Well pLay Boys');
})

const port=process.env.PORT || 5000
app.listen(port);
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "client", "build")));
    app.get("/*", function (req, res) {
      // this -->
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }
  
  // Handle unhandled promise rejections
  process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`);
  });
  
  process.on("uncaughtException", (err, promise) => {
    console.log(`Error: ${err.message}`);
  });