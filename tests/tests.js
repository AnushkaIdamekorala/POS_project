const request = require("supertest");
const express = require("express");
const session = require("supertest-session");

const app = require("../server");

//test auth endpoints: user.js

// login
let cookie;

describe("GET /users", function() {
  it("respond with json containing a list of all users", function(done) {
    request(app)
      .post("/api/user/login")
      .send({ email: "test@test.com", password: "test" })
      .expect("set-cookie", /token/)
      .expect(200)
      .end(function(err, res) {
        console.log("Test 1 worked");
        if (err) console.log("error", err);
      });
  });
});

describe("GET /users", function() {
  it("respond with json containing a list of all users", function(done) {
    request(app)
      .post("/api/user/login")
      .send({ email: "wrongtest@test.com", password: "test" })
      .expect({
        message: "Auth failed"
      })
      .expect(401)
      .end(function(err, res) {
        console.log("Test 2 worked");
        if (err) console.log("error", err);
      });
  });
});

// auth check

let token;
describe("GET /users", function() {
  it("respond with json containing a list of all users", function(done) {
    request(app)
      .post("/api/user/login")
      .send({ email: "test@test.com", password: "test" })
      .expect("set-cookie", /token/)
      .expect(200)
      .end(function(err, res) {
        request(app)
          .post("/api/user/checkAuth")
          .set("Cookie", res.headers["set-cookie"])
          .send()
          .expect(200)
          .end((err, res2) => {
            if (err) {
              console.log("error", err);
              return;
            } else {
              console.log("Test 3 worked");
            }
          });
      });
  });
});

//SIGN OUT
describe("GET /users", function() {
  it("respond with json containing a list of all users", function(done) {
    request(app)
      .post("/api/user/login")
      .send({ email: "test@test.com", password: "test" })
      .expect("set-cookie", /token/)
      .expect(200)
      .end(function(err, res) {
        request(app)
          .get("/api/user/signout")
          .set("Cookie", res.headers["set-cookie"])
          .send()
          .expect(200)
          .end((err, res2) => {
            if (err) {
              console.log("error", err);
              return;
            } else {
              console.log("Test 4 worked");
            }
          });
      });
  });
});

describe("GET /users", function() {
  it("respond with json containing a list of all users", function(done) {
    request(app)
      .get("/api/user/signout")
      .send()
      .expect(401)
      .end((err, res2) => {
        if (err) {
          console.log("error", err);
          return;
        } else {
          console.log("Test 5 worked");
        }
      });
  });
});

//Fetch item
describe("GET /users", function() {
  it("respond with json containing a list of all users", function(done) {
    request(app)
      .post("/api/user/login")
      .send({ email: "test@test.com", password: "test" })
      .expect("set-cookie", /token/)
      .expect(200)
      .end(function(err, res) {
        request(app)
          .get("/api/user/create/3")
          .set("Cookie", res.headers["set-cookie"])
          .send()
          .expect(200)
          .end((err, res2) => {
            if (err) {
              console.log("error", err);
              return;
            } else {
              console.log("Test 6 worked");
            }
          });
      });
  });
});

describe("GET /users", function() {
  it("respond with json containing a list of all users", function(done) {
    request(app)
      .post("/api/user/login")
      .send({ email: "test@test.com", password: "test" })
      .expect("set-cookie", /token/)
      .expect(200)
      .end(function(err, res) {
        request(app)
          .get("/api/user/create/asd")
          .set("Cookie", res.headers["set-cookie"])
          .send()
          .expect(400)
          .end((err, res2) => {
            if (err) {
              console.log("error", err);
              return;
            } else {
              console.log("Test 7 worked");
            }
          });
      });
  });
});
