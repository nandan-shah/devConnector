const express = require('express');

const connectDB=require('./config/db');

const app = express();
//connect database
connectDB();

//Init Middleware
app.use(express.json({extended: false}));


app.get('/' ,(req,res)=>{
res.send("start");
});

//define routes
app.use('/api/user', require("./routes/api/users"));
app.use('/api/post', require("./routes/api/post"));
app.use('/api/auth', require("./routes/api/auth"));
app.use('/api/profile', require("./routes/api/profile"));

const PORT=process.env.PORT || 3000;

app.listen( PORT ,function () {
    console.log('server runing on port ${PORT}');
});