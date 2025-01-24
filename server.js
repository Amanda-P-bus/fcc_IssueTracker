'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const expect      = require('chai').expect;
const cors        = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const URI = process.env.URI;
const PORT = process.env.PORT;

const apiRoutes         = require('./routes/api.js');
const fccTestingRoutes  = require('./routes/fcctesting.js');
const runner            = require('./test-runner');

let app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({origin: '*'})); //For FCC testing purposes only



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Sample front-end
app.route('/:project/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/issue.html');
  });



//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

/*
app.get("/api/showall/", async (req, res) => {
  try {
    const getAllIssues = await Issue.find({});
    res.status(201).json(getAllIssues);
  }
  catch (e) {
  console.log(e.message);
  res.status(500).json({ message: e.message });
  }
})
 */ 

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API 
apiRoutes(app);  

//app.use(errorHandling);

//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});


//Start our server and tests!
mongoose.connect(process.env.URI).then(() => {
app.listen(process.env.PORT || 3000, function () {
  console.log(`Your app is listening on port ${PORT}`);
  if(process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch(e) {
        console.log('Tests are not valid:');
        console.error(e);
      }
    }, 3500);
  }
})
console.log("Connected to MongoDB")}).catch(e => console.log(e));

module.exports = app; //for testing
