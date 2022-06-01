//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true});
const itemsSchema={
    name:String
};
const Item = mongoose.model("Item",itemsSchema);
const item1 = new Item({
    name:"Welcome to your todolist!"

});
const item2 = new Item({
    name: "Hit the + button to add a new item."
});
const item3 = new Item({
    name: "<-- Hit this to delete an item."
});
const defaultItems=[item1,item2,item3];
Item.insertMany(defaultItems,function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Successfully saved default items to database");
    }
});
app.get("/",function(req,res){
    res.render("list",{listTitle:"Today",newListItems:items});
});

app.listen(3000,function(){
    console.log("server is running on port 3000");
});

