var Taskmodel = require('./../model/taskModel');

exports.list_all_tasks=function(req,res){
    Taskmodel.getAllTask(function(err, task) {
        //console.log('controller')
        //res.end();
        if (err){
          res.send(err);
        }else{
          res.send(task);
        }
        
      });
};