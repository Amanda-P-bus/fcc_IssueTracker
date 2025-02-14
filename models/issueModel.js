const mongoose = require("mongoose");


const IssueSchema = new mongoose.Schema({

  issue_title: { 
    type: String, 
    required: true },

  issue_text: { 
    type: String, 
    required: true },
    
  created_by: {  
    type: String, 
    required: true },
           
  assigned_to: { 
    type: String, 
    default: "" },
    
  status_text: { 
    type: String, 
    default: "" },

  created_on: { 
    type: Date, 
    required: true },
    
  updated_on: { 
    type: Date, 
    required: true },

  open: { 
    type: Boolean, 
    required:  true } ,

    project: { 
      type: String, 
      default: "project"}

});

module.exports = mongoose.model("Issue", IssueSchema);
