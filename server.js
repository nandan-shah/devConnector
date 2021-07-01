const express = require('express');

const app = express();

app.get('/' ,(req,res)=>{
res.send("start");
});

const PORT=process.env.PORT || 3000;

app.listen( PORT ,function () {
    console.log('server runing on port ${PORT}');
});