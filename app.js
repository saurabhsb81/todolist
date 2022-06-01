//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https=require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
   const email=req.body.email;
   const password=req.body.password;
   const data= {
        members:[
            {
                email_address:email,
                status:"subscribed"    
            }
                ]
    };
    const jsonData=JSON.stringify(data);
    const url="https://us10.api.mailchimp.com/3.0/lists/2f08656719";
    const options={
        method:"POST",
        auth:"saurabh:d583d7deb77555b0680d4dab07a9571d-us10"
        
    };
    const request=https.request(url,options,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
       
    })
    request.write(jsonData);
    request.end();
});
app.listen(3000,function(){
    console.log("server is running on port 3000");
});

