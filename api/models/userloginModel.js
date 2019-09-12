const Cryptr = require('cryptr');
const cryptr = new Cryptr('secretKeys');
const bodyParser = require('body-parser');
var express=require("express");
let jwt = require('jsonwebtoken');
var config = require('./../config/config');
// middleware
//let middleware = require('./../../middleware'); 
// database connection
var connection = require('./../../config/config');


//code if no user with entered email was found
exports.userLoginToken=function(req,result){
var encryptedString =cryptr.encrypt(req.body.password);
let email = req.body.email;
let password = encryptedString;
connection.query("SELECT id,username,email FROM users WHERE email=?",email,function(err, results, fields){
    if(results.length >0){
        if (cryptr.decrypt(results[0].password) == password) {
        //   let token = jwt.sign({id: results[0].id},
        //     config.secret,
        //     { expiresIn: '24h' // expires in 24 hours
        //     }
        //   );
        //   console.log(token);
          // return the JWT token for the future API calls
         
          var datatoken= res.json({
            success: true,
            message: 'Authentication successful!',
            token: "df"
          });
          result(null,datatoken);
        } else {
            var datatoken= res.json({
            success: false,
            message: 'Incorrect password'
          });

          result(datatoken,null);
        }
      } else {

        var datatoken=res.json({
          success: false,
          message: 'Incorrect email id,please check email id!'
        });
        result(datatoken,null);
      }
});
};