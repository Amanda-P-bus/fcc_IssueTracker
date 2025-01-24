const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);
let id1 = '';
let id2 = '';

suite('Functional Tests', function() {

suite("Routing Tests", function() {
//start POST tests
suite("POST /api/issues/:project", function() {
//1. every field filled in test
  test("Create an issue with every field filled in", function(done) {    
    chai.request(server)
        .post("/api/issues/test")
        .send({
            issue_title: "Title",
            issue_text: "text",
            created_by: "All fields filled in",
            assigned_to: "Chai and Mocha",
            status_text: "In QA"  
        })
        .end(function (err, res) {
         assert.equal(res.status, 201);
         assert.equal(res.body.issue_title, "Title");
         assert.equal(res.body.issue_text, "text");
         assert.equal(res.body.created_by, "All fields filled in");
         assert.equal(res.body.assigned_to, "Chai and Mocha");
         assert.equal(res.body.status_text, "In QA");
         id1 = res.body._id;
        console.log("id 1 has been set as " + id1);     
        done();
       });
     });
//2. only required fields filled in test
     test("Create an issue with only the required fields filled in", function(done) {
        
        chai.request(server)
            .post("/api/issues/test")
            .send({
                issue_title: "Title",
                issue_text: "text",
                created_by: "Only required fields test" 
            })
            .end(function (err, res) {
             assert.equal(res.status, 201);
             assert.equal(res.body.issue_title, "Title");
             assert.equal(res.body.issue_text, "text");
             assert.equal(res.body.created_by, "Only required fields test");
             id2 = res.body._id;
            console.log("id 1 has been set as " + id2);     
            done();
           });
         });

//3. missing required fields test
    test("Attempt to create an issue while missing required fields", function(done) {
        
        chai.request(server)
            .post("/api/issues/test")
            .send({
                issue_title: "Title", 
                })
            .end(function (err, res) {
                assert.equal(res.body.error, 'required field(s) missing');
                done();
               });
             });//end test 3
     })//end PUT tests

//start GET tests
suite("GET /api/issues/:project", function() {

//4. view all issues by project
test("View all issues on a project", function(done){
    chai.request(server)
      .get("/api/issues/test")
      .query({})
      .end(function (err, res) {
        assert.equal(res.status, 201);
        assert.isArray(res.body);
        assert.property(res.body[0], "issue_title");
        assert.property(res.body[0], "issue_text");
        assert.property(res.body[0], "created_on");
        assert.property(res.body[0], "updated_on");
        assert.property(res.body[0], "created_by");
        assert.property(res.body[0], "assigned_to");
        assert.property(res.body[0], "open");
        assert.property(res.body[0], "status_text");
        assert.property(res.body[0], "_id");
        done();
      })
})

//5. View issues on a project with one filter: GET request to /api/issues/{project}
test("View issues on a project with one filter", function(done){
    chai.request(server)
      .get("/api/issues/test")
      .query({ created_by: "All fields filled in" })
      .end(function (err, res) {
        res.body.forEach(issueResult => {
            assert.equal(issueResult.created_by, "All fields filled in")
        })
        done()
      })
    })


//6. View issues on a project with multiple filters: GET request to /api/issues/{project}
test("View issues on a project with multiple filters", function(done){
    chai.request(server)
      .get("/api/issues/test")
      .query({ created_by: "All fields filled in", open: true })
      .end(function (err, res) {
        res.body.forEach(issueResult => {
            assert.equal(issueResult.created_by, "All fields filled in")
        })
        done()
      })
    })
})// end GET tests

//start PUT tests
suite("PUT /api/issues/:project => text", function() {

//7. Update one field on an issue: PUT request to /api/issues/{project}
test("Update just one field of an issue", function(done){
    chai.request(server)
    .put("/api/issues/test")
    .send({ _id: id1, issue_text: "new text" })
    .end(function (err, res) {
        assert.equal(res.body.result, "successfully updated");
        done();
    })
})

//8. Update multiple fields on an issue: PUT request to /api/issues/{project}
test("Update multiple fields of an issue", function(done){
    chai.request(server)
    .put("/api/issues/test")
    .send({ _id: id2, issue_title: "new title", issue_text: "new text" })
    .end(function (err, res) {
        assert.equal(res.body.result, "successfully updated");
        done();
    })
})

//9. Update an issue with missing _id: PUT request to /api/issues/{project}
test("Attempt to update without inputting an id", function(done){
    chai.request(server)
    .put("/api/issues/test")
    .send({})
    .end(function (err, res) {
        assert.equal(res.body.error, "missing _id");
        done();
    })
})

//10. Update an issue with no fields to update: PUT request to /api/issues/{project}
test("Attempt to update with no changes", function(done){
    chai.request(server)
    .put("/api/issues/test")
    .send({ _id: id1 })
    .end(function (err, res) {
        assert.equal(res.body.error, "no update field(s) sent");
        done();
    })
})

//11. Update an issue with an invalid _id: PUT request to /api/issues/{project}
test("Attempt to update with an invalid _id", function(done){
    chai.request(server)
    .put("/api/issues/test")
    .send({ _id: "12e9900" })
    .end(function (err, res) {
        assert.equal(res.body.error, undefined);
        done();
    })
})
    })// end UPDATE

//start DELETE functions
suite("DELETE /api/issues/:project => text", function() {

//12. Delete an issue: DELETE request to /api/issues/{project}
/*test("Delete an issue using a valid _id", function(done) {
    chai.request(server)
      .delete("/api/issues/test")
      .send({ _id: id1 })
      .end(function (err, res) {
        assert.equal(res.body.result, "successfully deleted")
      })
})
*/
//13. Delete an issue with an invalid _id: DELETE request to /api/issues/{project}
test("Delete an issue using an invalid _id", function(done) {
    chai.request(server)
      .delete("/api/issues/test")
      .send({ _id: "12e983" })
      .end(function (err, res) {
        assert.equal(res.body.error, "could not delete")
        done()
      })
})

//14. Delete an issue with missing _id: DELETE request to /api/issues/{project}
test("Attempt to delete an issue with no _id", function(done) {
    chai.request(server)
      .delete("/api/issues/test")
      .send({})
      .end(function (err, res) {
        assert.equal(res.body.error, "missing _id")
        done()
      })
})
})

    })


});

/* PROJECT IS apitest :'(

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

