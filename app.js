//jshint esversion:6

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;

const data = {
  members:[
    {
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:firstName,
        LNAME:lastName
      }

  }
]
};

const jsonData = JSON.stringify(data);
const url = "https://us6.api.mailchimp.com/3.0/lists/0b0d32541a";
const options = {
  method: "POST",
  auth: "jeevan:3441f084a5030c918aa14ab9cafd4dbb-us6"
}

const request = https.request(url,options,function(response){

  if(response.statusCode ===200){
      res.sendFile(__dirname + "/success.html");
  }
  else{
    res.sendFile(__dirname + "/failure.html");
  }

  response.on("data",function(data){
  console.log(JSON.parse(data))
  })
})

request.write(jsonData);
request.end();
});


app.post("/failure",function(req,res){
  res.redirect("/");

});

app.listen(process.env.PORT || 3000,function(req,res){
console.log("server is running at port 3000");
});



// 3441f084a5030c918aa14ab9cafd4dbb-us6

// 0b0d32541a
