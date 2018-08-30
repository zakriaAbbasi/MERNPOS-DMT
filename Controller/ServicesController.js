var express = require('express');
const nodemailer = require('nodemailer');
var app = express();
var config = require('../DBconfig');
///Connect to DataBasae
var mongoose = require('mongoose');
mongoose.connect(config.database);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
(db.on('error', console.error.bind(console, 'MongoDB connection error:')));
const webpush = require('web-push');
var secrets= require('../secrets');
var subsInstance = require('../models/subscription');

//Function To Send an Email
exports.SendEmail = function (opt) {
    console.log('Recieved article is',opt);
    /*    let mailOptions = {
        from: '"DMT 👻" <teamlead@developmethis.com>', // sender address
        to: 'zakiabbasi15@yahoo.com', // list of receivers
        subject: 'Threshold Warning!', // Subject line
        text: 'Your article '+opt+' has Reached Threshold Limit', // plain text body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
*/
};
//Function to send a Push Notification
exports.SendPush = function (opt) {
    console.log('Recieved article is',opt);
    webpush.setVapidDetails(
        'mailto:teamlead@developmethis.com',
         secrets.PublicKey,
         secrets.PrivateKey,
       );
  subsInstance.find()
  .then(subs => { 
        const params = {
          url: 'http://localhost:3000/',
          title: 'Threshold Warning!',
          message: 'The following items have reached their Threshold Limit: '+opt,
          tag: 'message-tag'
      };
      const payload = new Buffer(JSON.stringify(params), 'utf8');
        const options = {
          TTL: 3600*24 // 1sec * 60 * 60 = 1h
        };
     for(var i=0; i<subs.length; i++ ){
        webpush.sendNotification(
            subs[i].subscription, 
            payload,
            options
            ).then(function(ResponseData) {
              console.log('For the subscription ',i,'  ',ResponseData);
            return;
            }).catch(err => {
              console.error("Unable to send welcome push notification", err );
              return;
          });
     }
});
   
};