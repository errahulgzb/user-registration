const Cryptr = require('cryptr');
const cryptr = new Cryptr('secretKeys');
const bodyParser = require('body-parser');
var express=require("express");
let jwt = require('jsonwebtoken');
var config = require('./../config/config');
const jwtExpirySeconds = 100
// middleware
//let middleware = require('./../../middleware'); 
// database connection
var connection = require('./../../config/config');

// model call
//var userLoginModel = require('./../../api/models/userloginModel');

module.exports.login=function(req,res){
  //  console.log("sdfs");
    //var encryptedString =cryptr.encrypt(req.body.password);
    let email = req.body.email;
    let password = req.body.password;
    //console.log(password);
    
    connection.query("SELECT id,username,email,password FROM users WHERE email=?",email,function(err, results, fields){
       
       // res.end();
    if(results.length >0){
         console.log(cryptr.decrypt(results[0].password));
        // res.end();
        if(cryptr.decrypt(results[0].password) == password) {
            
            let token = jwt.sign({id: results[0].id},
                config.secret,
                { expiresIn: jwtExpirySeconds // expires in 24 hours
                }
              );
              // update token in user tables
              var sqlquery="UPDATE users SET jwt_user_token= ? WHERE id = ?";
              connection.query(sqlquery,[token,results[0].id], function (error, results, fields) {
              });

              // return the JWT token for the future API calls
             res.send({
                success: true,
                user_id:results[0].id,
                message: 'Authentication successful!',
                token: token
              });
            } else {
              res.send({
                success: false,
                user_id:false,
                message: 'Incorrect username or password'
              });
            }
          } else {
             res.send({
                success: false,
                user_id:false,
                message: 'Authentication failed! Please check the request'
              });
          }
});
   
};

module.exports.getuserdetail=function(req,res){
        let token= req.headers['x-access-token'] || req.headers['authorization'];
        var sqlquery="SELECT * FROM users WHERE jwt_user_token=?";
        connection.query(sqlquery,token,function(err,results,fields){
            if(err){
                res.send({
                    success: false,
                    user_detail:false,
                    message: 'Authentication failed! Please check the request'
                  });
            }else{
                res.send({
                    success: true,
                    user_detail:results,
                    message: 'Authentication successful!'
                  });
            }
        });
}