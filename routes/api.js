'use strict';
const mongoose = require('mongoose');
const Issue = require('../models/issueModel');
const asyncHandler = require('express-async-handler');

module.exports = function (app) {

  app.route('/api/issues/:project')
  
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
    //{ "error": "required field(s) missing" }
    .post(asyncHandler(async (req, res) => {
      let project = req.params.project;
      
      try {
      
        if (!req.body.issue_title || !req.body.issue_text || !req.body.created_by)
        { return res.status(201).json({message: "required field(s) missing"}) }

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
    //{ error: 'could not update', '_id': _id }
    //{ error: 'no update field(s) sent', '_id': _id }
    //{ error: 'missing _id' }
    //{  result: 'successfully updated', '_id': _id }
    .put(asyncHandler(async (req, res) => {
      let project = req.params.project;
      
      try {
        
         //if no _id filled in
        if (!req.body._id)
          {
            return res.json({message: "missing _id" }); }
        const {id} = req.params;
        const issue = await Issue.findByIdAndUpdate(id, req.body, {new: true});


        if (_id && !req.body.issue_title && !req.body.issue_text && !req.body.created_by && !req.body.assigned_to && !req.body.status_text)
          {return res.status(201).json({message: `no update field(s) sent _id: ${id}`}); }
       
        //if no issue is found
        if (!issue)
        { 
          return res.status(404).json({message: `could not update _id: "${id}"`}); 
        }

        //if found, update and return it
        const updatedIssue = await Issue.findByIdAndUpdate(id);
        res.status(201).json({message: `successfully updated _id: ${updatedIssue}`});
      }
      catch (e) {
        console.log(e.message);
        res.status(500).json({message: e.message});
      }
    }))
    
    .delete(asyncHandler(async (req, res) => {
      let project = req.params.project;

      try {
        const {id} = req.params;
        const issueToDelete = await Issue.findByIdAndDelete(id);

        if(!issueToDelete) 
          {
          return res.status(404).json({message: `could not delete _id: "${id}"`});
          }

        res.status(201).json(`result: successfully deleted _id: ${id}`);
      }
      catch (e) {
        console.log(e.message);
        res.status(500).json({message: e.message});
      }
    }));
    
};
