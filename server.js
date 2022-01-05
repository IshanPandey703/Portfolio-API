const express = require("express");
const cors = require("cors");    
const  mongoose  = require("mongoose");

const app = express();
const corsOptions = {
    origin: "http://localhost:3000"
}

app.use(express.json());
app.use(cors(corsOptions));

// connecting to db
mongoose.connect("mongodb://127.0.0.1:27017/Details");

// schema of object(document) sent to database
const detailSchema = mongoose.Schema({
    name: String,
    email: String,
    contactNumber: String,
    message: String
})

const Detail = mongoose.model("Detail",detailSchema);

// POST req at home route(end-point)
app.post("/",(req,res)=>{
    const data = new Detail({
        name: req.body.fullName,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        message: req.body.message
    }).save((err)=>{
        if(!err) res.send("Data Submitted Succesfully");
        else res.send(err);
    })
})


// setting up the server
app.listen(3001,()=>{
    console.log("Sever listening at port 3001");
})
