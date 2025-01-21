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

let expect = require("chai").expect;
let mongodb = require("mongodb");
let mongoose = require("mongoose");
const { Schema } = mongoose;

module.exports = function (app) {

  
  const IssueSchema = new Schema({
    issue_title: { type: String, required: true },
    issue_text: { type: String, required: true },
    created_on: { type: Date, required: true },
    updated_on: { type: Date, required: true },
    created_by: { type: String, required: true },
    assigned_to: String,
    open: { type: Boolean, required: true} ,
    status_text: String,
    project: String,
  });

const Issue = mongoose.model("Issue", IssueSchema);

  app.route('/api/issues/:project')


    .get(function (req, res){
      let project = req.params.project;

  
    })
    
    .post(function (req, res){
      let project = req.params.project;
  
      let newIssue = new Issue({
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_on: new Date().toUTCString(),
        updated_on: new Date().toUTCString(),
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to || "",
        open: true,
        status_text: req.body.status_text || "",
        project: project,
      })

      newIssue.save((err, savedIssue) => {
        if (!err && savedIssue) {
          console.log("Saved issue to");
          console.log(savedIssue);
          res.json(savedIssue);
        }
      })
    })
    
    .put(function (req, res){
      let project = req.params.project;
      
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });
    
};
