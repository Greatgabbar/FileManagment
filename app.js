const express= require('express');
const app= express();
const bodyParser=require('body-parser');
const mongoose= require('mongoose');
require('dotenv').config();

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


app.listen(5000);