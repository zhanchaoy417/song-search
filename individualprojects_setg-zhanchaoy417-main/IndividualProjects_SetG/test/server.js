// test case written here

// Imports the server.js file to be tested.
const server = require("../server");
// Assertion (Test Driven Development) and Should,  Expect(Behaviour driven 
// development) library
const chai = require("chai");
// Chai HTTP provides an interface for live integration testing of the API's.
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const { assert, expect } = chai;

describe("Server!", () => {
  // Sample test case given to test / endpoint.
  it("Returns the default welcome message", (done) => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("success");
        assert.strictEqual(res.body.message, "Welcome!");
        done();


      });

  });

//test case 1
  it("positive case of search", (done) => {
    chai
      .request(server)
      .post("/get_feed")
      .send({title:paradise})
      .end((err, res) => {
        expect(res).to.have.status(200);
      expect(res.body.Genre).to.equals("Alternative");
        done();
      });
  });

  it("negative case of search", (done) => {
    chai
      .request(server)
      .post("/get_feed")
      .send({title:$$$})
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  //test case 2
  it("positive case of search", (done) => {
    chai
      .request(server)
      .post("/get_feed")
      .send({title:paradise})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.name).to.equals("Coldplay");
        done();
      });
  });

  it("negative case of search", (done) => {
    chai
      .request(server)
      .post("/get_feed")
      .send({title:2333})
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });


});