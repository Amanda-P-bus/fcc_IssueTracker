import mongoose from 'mongoose';
const { Schema } = mongoose;

const issueSchema = new Schema({
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


const ProjectSchema = new Schema({
    name: { type: String, required: true },
});

const Project = mongoose.model("Project", ProjectSchema);

//exports.Issue = Issue;
//exports.Project = Project;
