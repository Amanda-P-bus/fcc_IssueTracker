'use strict';

//takes you to a submit issues page: 
  //https://issue-tracker.freecodecamp.rocks/api/?_id=678ed45ba1c4620013633775
  
//json resObj with specific issue:
  //https://issue-tracker.freecodecamp.rocks/api/issues/apitest/?_id=678ed45ba1c4620013633775

//all issues for all accounts:
  //https://issue-tracker.freecodecamp.rocks/ api/issues/apitest/

//all issues for one account by user 
  //https://issue-tracker.freecodecamp.rocks/whoo

//main site: 
  //https://issue-tracker.freecodecamp.rocks/

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      
    })
    
    .post(function (req, res){
      let project = req.params.project;
      
    })
    
    .put(function (req, res){
      let project = req.params.project;
      
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });
    
};
