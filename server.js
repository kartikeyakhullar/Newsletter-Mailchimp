
const express = require("express");
const bodyParser  = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static("public"));


app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req,res){
    var fName = req.body.fName;
    var lName = req.body.lName;
    var email = req.body.email;
    // console.log(email);


    var data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : fName,
                    LNAME : lName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);


    var options = {
        url : 'https://us4.api.mailchimp.com/3.0/lists/aad7795757',
        method : 'POST',
        headers : {
            "Authorization" : "chelseafc ad1c9511f1907c6ca13e5195df7c4b61-us4" 
        },
        body : jsonData
    };



    request(options, function(error,response,body){
        if(error){
            res.sendFile(__dirname + "/failure.html");
        }else{
            if(response.statusCode === 200){
                res.send(__dirname + "/success.html");
            }else{
                res.send(__dirname + "/failure.html");
            }
        }

    })



})


app.post("/failure", function(req,res){
    res.redirect("/");
})


app.listen(3000, function(){
    console.log("Server started on port 3000...");
})

