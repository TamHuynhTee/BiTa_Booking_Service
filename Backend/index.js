const express = require('express');
const app = express();
const port = 8000;

app.get('/', function(req, res){
    res.send("Đây là backend");
})

app.listen(port, function(){
    console.log("Your app running on port" + port)
})