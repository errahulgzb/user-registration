var connection = require('./../config/config');

exports.getAllTask=function(result){
    var query="SELECT * FROM tasks";
    connection.query(query,function(err,res){
            if(err){
                console.log("Error :",err);
                result(null, err);
            }else{
                console.log("Result :",res);
                result(null, res);
            }
    });
};