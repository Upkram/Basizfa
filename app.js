var http =  require('http');
var express = require('express');
const axios = require('axios')
var app = express();
var bodyparser =  require('body-parser');
var port = 3000;
const conn = require("./db");
const { exit } = require('process');

app.use(bodyparser.urlencoded({extended:false}));

app.listen(port,()=>{
    console.log(`Run on server http://localhost:${port}`);
})


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/static/login.html');
});

app.post('/api/userdata',function (req,res){
    
    var user = req.body.username;
    var pass = req.body.password;
   
    var sqlquery = "SELECT * from user where username ='"+user+"' and passwordHash = '"+pass+"'"; 
    conn.query(sqlquery,function(err,results)
    {
        
        //   var id = results[0].id;
        
        if(results.length > 0)
        {
           
            res.status(200).json({ message: results[0].id,status:200});
           
        }
        else
        {
            
            res.status(206).json({ message: "password incorrect",status:206});
            
        }
    })
    


});
app.get('/api/home/:id',function(req,res){
    const id  = req.params.id;
    var sqlquery = "SELECT * from user where id='"+id+"'";
    conn.query(sqlquery,function(err,results){
        if(results.length > 0)
        {
        
            res.render(__dirname+'/static/dashboard.ejs',{username:results[0].username});
           
        }
        else
        {
            
            res.status(206).json({ message: "password incorrect",status:206});
            
        }
        
    })
    
})


app.post('/api/allbrands',function(req,res){
     var sqlquery = "SELECT COUNT(id) as Total_Brands FROM `brand`;";
     conn.query(sqlquery,function(err,results){
        if(results.length > 0 ){
           
            
                   total_brands=results[0].Total_Brands;
                   console.log(total_brands);
                // res.render(__dirname+'/static/dashboard.ejs',{Total_brands:total_brands});
            // res.status(200).json({ message:results[0].Total_Brands ,status:200});
        }
        else
        {
            
            res.status(206).json({ message: "Pls Add Brands",status:206});
            
        }
     })

})



