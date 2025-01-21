const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  
});

/*
1. Create an issue with every field: POST request to /api/issues/{project}
2. Create an issue with only required fields: POST request to /api/issues/{project}
3. Create an issue with missing required fields: POST request to /api/issues/{project}
4. View issues on a project: GET request to /api/issues/{project}
5. View issues on a project with one filter: GET request to /api/issues/{project}
6. View issues on a project with multiple filters: GET request to /api/issues/{project}
7. Update one field on an issue: PUT request to /api/issues/{project}
8. Update multiple fields on an issue: PUT request to /api/issues/{project}
9. Update an issue with missing _id: PUT request to /api/issues/{project}
10. Update an issue with no fields to update: PUT request to /api/issues/{project}
11. Update an issue with an invalid _id: PUT request to /api/issues/{project}
12. Delete an issue: DELETE request to /api/issues/{project}
13. Delete an issue with an invalid _id: DELETE request to /api/issues/{project}
14. Delete an issue with missing _id: DELETE request to /api/issues/{project}


//You can send a POST request to /api/issues/{project} with all required fields filled in (and optional if wanted) "Create an issue with every field":

//You can send a POST request to /api/issues/{project} with all required fields filled in only. "Create an issue only required fields":


//Sending an POST request to /api/issues/{project} without all required fields will return an error "{ error: 'required field(s) missing' }". "Create an issue with missing required fields":

//The POST request to /api/issues/{project} will return all of the submitted fields, w/ excluded optional fields being returned as empty strings. (Additionally, include created_on (date/time), updated_on (date/time), open (boolean, true for open - default value, false for closed), and _id.) "Create an issue with only required fields": 


//You can send a GET request to /api/issues/{project} for an array of all issues for that specific project, with all the fields present for each issue. "View issues on a project":

//You can send a GET request to /api/issues/{project} and filter the request by also passing along any field and value as a URL query (i.e /api/issues/{project}?open=false). Passing one value pair at a time. "View issues on a project with one filter":

//You can send a GET request to /api/issues/{project} and filter the request by also passing along any field and value as a URL query (i.e /api/issues/{project}?open=false). You can pass one or more value pairs at a time. "View issues on a project with multiple filters": 

//You can send a PUT request to /api/issues/{project} with an _id and one field to update. If successful, updated_on field should be updated to a new Date value, and a result should be returned of {  result: 'successfully updated', '_id': _id }. "Update one field on an issue":

//You can send a PUT request to /api/issues/{project} with an _id and multiple fields to update. If successful, updated_on field should be updated to a new Date value, and a result should be returned of {  result: 'successfully updated', '_id': _id }. "Update multiple fields on an issue":

//When the PUT request sent to /api/issues/{project} doesn't have an _id, an error is returned of "{ error: 'missing _id' }". "Update an issue with missing _id": 

//When the PUT request to /api/issues/{project} doesn't include update fields, an error is returned of "{ error: 'no update field(s) sent', '_id': _id }". On any other error, the error returned is "{ error: 'could not update' }". "Update an issue with no fields to update": 


//"Update an issue with an invalid _id": PUT request to /api/issues/{project}

//You can send a DELETE request to /api/issues/{project} with an _id to delete an issue. "Delete an issue": 

//Delete an issue with an invalid _id: DELETE request to /api/issues/{project}

//"Delete an issue with missing _id": DELETE request to /api/issues/{project}
*/