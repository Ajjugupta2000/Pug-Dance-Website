const express=require('express')
const path =require('path')
const fs=require('fs')
const mongoose=require('mongoose')
const app=express();
const port =3000;

//MONGODB STUFF
mongoose.set('strictQuery',false);
mongoose.connect('mongodb://localhost/ContactDatabase', {useNewUrlParser: true,useUnifiedTopology:true});

const DanceContact = new mongoose.Schema({  //schema
    name: String,
    age: String,
    email: String,
    telephone: String,
    address: String
  });

const myContactModel = mongoose.model('ContactCollection', DanceContact);

//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'))  //for serving static file
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view engine','pug')  //set the template engine as pug
app.set('views',path.join(__dirname,'views')) //set the views directory

//ENDPOINTS
app.get('/',(req,res)=>{
    // const con="This is a dance website"
    const params={}
    res.status(200).render('home.pug',params)
})

app.get('/contact',(req,res)=>{
    // const con="This is a dance website"
    const params={}
    res.status(200).render('contact.pug',params)
})

app.post('/contact',(req,res)=>{
    const mydata=new myContactModel(req.body);
    mydata.save().then(()=>{
        res.send("This contact is saved")
    }).catch(()=>{
        res.status(400).send("Contact is not save")
    }); 
})

//START THE SERVER
app.listen(port,()=>{
    console.log(`Server successfully start on port ${port}`)
})
