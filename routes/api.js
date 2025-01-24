'use strict';
const mongoose = require('mongoose');
const Issue = require('../models/issueModel');
const asyncHandler = require('express-async-handler');

module.exports = function (app) {

  app.route('/api/issues/:project')

  //get all issues by name 
    // (/project for input through insomnia) 
    // (/apitest for input through localhost)
    .get(asyncHandler(async (req, res) => {
      let project = req.params.project;
      
      try {
        let filterResults = Object.assign(req.query);
        filterResults["project"] = project;
      //Issue.find(filterResults,)
      const getResults = await Issue.find(filterResults);
      res.status(201).json(getResults);
      }
      catch (e) {
        console.log(e.message);
        res.status(500).json({message: e.message});
      }
    }))

    //add new issue
    .post(asyncHandler(async (req, res) => {
      let project = req.params.project;
      
      try {
      
        if (!req.body.issue_title || !req.body.issue_text || !req.body.created_by)
        { return res.status(201).json({error: "required field(s) missing"}) }

      let newIssue = new Issue({
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to || "",
        status_text: req.body.status_text || "",
        created_on: new Date().toUTCString(),
        updated_on: new Date().toUTCString(),
        open: true,
        project: project
      })
       const addIssue = await newIssue.save();
       res.status(201).json(addIssue);

      }
      catch (e) {
        console.log(e.message);
        res.status(500).json({message: e.message});
      }
      
    }))

    //update function
    .put(asyncHandler(async (req, res) => {
      let project = req.params.project;
      const id = req.body._id;
      
      try {
        
         //if no _id filled in
        if (!id)
          {
            return res.json({error: "missing _id"}); }

    let resObj = {}
  Object.keys(req.body).forEach(key => {
    if (req.body[key] !== "") {
      resObj[key] = req.body[key];
    }
  })          
     resObj["updated_on"] = new Date().toUTCString();

        const issue = await Issue.findByIdAndUpdate(id, resObj, {new: true});

        //if no fields are filled in, error
        if (id && !req.body.issue_title && !req.body.issue_text && !req.body.created_by && !req.body.assigned_to && !req.body.status_text)
          {let noEnt = "no update field(s) sent";
            return res.status(201).json({error: noEnt, _id: id}); }

             
          if (undefined)
          {let noUptoo = "could not update"
            return res.status(201).json({error: noUptoo, _id: id}) }
           
        //if no issue is found (invalid) error
        if (!issue)
        { let noUp = "could not update"
          return res.status(201).json({error: noUp, _id: id});
        }
        //if found, update with above await, then return id
        let resSuccess = "successfully updated";
        res.status(201).json({result: resSuccess, _id: id});
      }
      catch (e) {
        console.log(e.message);
        res.status(500).json({message: e.message, _id: id});
      }
    }))
   
    //delete function
    .delete(asyncHandler(async (req, res) => {
      let project = req.params.project;

      try {
        const id = req.body._id;
        const issueToDelete = await Issue.findByIdAndDelete(id);

        if (!id)
          {let noFind = "missing _id";
            return res.status(201).json({error: noFind, _id: id});}

        if(id && !issueToDelete) 
          {let noCan = "could not delete";
          return res.status(201).json({error: noCan, _id: id});
          }

               if (undefined)
          {let noUptoo = "could not update"
            return res.status(201).json({error: noUptoo, _id: id}) }

        let deleteSuc = "successfully deleted";
        res.status(201).json({result: deleteSuc, _id: id});
      }
      catch (e) {
        console.log(e.message);
        res.status(500).json({message: e.message, _id: id});
      }
    }));
    
};
