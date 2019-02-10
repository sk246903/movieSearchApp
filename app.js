var express =require("express");
var app = express();

app.use(express.static("public"));

var request = require("request");


app.get("/",function(req,res){
   res.render("search.ejs"); 
});

app.get("/results",function(req,res){
    var movieNameQuery = req.query.movieName;
    var url = "http://www.omdbapi.com/?apikey=thewdb&s="+movieNameQuery ;
    request(url,function(error,response,body){
        if(!error&&response.statusCode==200){
            var data = JSON.parse(body);
            res.render("results.ejs",{data:data});
        }
    });
});

app.listen(process.env.PORT,function(){
   console.log("Your personal Movie app has started."); 
});