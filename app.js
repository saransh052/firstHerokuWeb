const express= require("express");
const bodyParser= require("body-parser");
const request= require("request");
const https= require("https");

const app= express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: "true"}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname
        +"/signup.html");
})

app.post("/", (req,res)=>{
    const firstname= req.body.first_name;
    const lastname= req.body.last_name;
    const email= req.body.email;
    const data={
        members: [
            {
                email_address:email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    }
    const jsondata= JSON.stringify(data);
    const url= "https://us14.api.mailchimp.com/3.0/lists/f6b39dbc4e";
    const options={
        method: "POST",
        auth: "saransh:7b6d02b2b081756a5562e446bbff2259-us14"
    }
    const request= https.request(url,options,function(response){
       if (response.statusCode=200){
        res.sendFile(__dirname+ "/success.html");
       }
       else{
        res.sendFile(__dirname+ "/failure.html");
       }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsondata);
    request.end();
})
app.post("/failure", (req,res)=>{
    res.redirect("/");
})
app.listen(3000 || process.env.PORT, ()=>{
    console.log("server is running at port 3000")
})
