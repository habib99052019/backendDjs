const express = require('express')

var bodyParser = require('body-parser');
const app = express();
const nodemailer = require('nodemailer');
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(express.json({ extended: false, limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }))
const router = express.Router();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
 app.post('/sendEmail',async (req, res) => {

    console.log(req.body.email)
   
  

    const mailOptions = {
        from:"habibfullstack90@gmail.com",
         to: ["ha9.0bib90@gmail.com","manelbellili2014@gmail.com"],  //"Contact@heartofcarthage.com" ,
        subject: 'New customer',
       html: `<div><h2>Information to customer of DJS</h2></div>
       <pre>name : ${req.body.name}</pre>
       <pre>phone : ${req.body.phone}</pre>
       <pre>email : ${req.body.email}</pre>
       <pre>subject : ${req.body.subject}</pre>
       <h5>message : ${req.body.message}</h5>
     
  
       `
        
    };
  
   
var transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "habibfullstack90@gmail.com" ,      // "hearth.Of.carthage90@outlook.fr",
            pass:"iwkiteaprenqvvwk" //"5h5a171078" //"5qtztsuwozbbnrmcm"
        }  
    });
    // send email
    try{
        await transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.reponse);
                res.json({message: "email send sucessfully"});
            }
        });
     
    }catch(err){
        console.log(err);
        
      }
  
});
app.get('/',async (req, res) => {
    
    res.send({message:'hello'})
  
});
const port = process.env.PORT || 5900;
app.listen(port,()=>console.log(`Server listen on the port ${port}`)) 