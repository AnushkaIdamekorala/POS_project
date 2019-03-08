const request = require("supertest");
const session = require("supertest-session");
const app = require("../app");

var token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFudXNoa2EwNzMxQGdtYWlsLmNvbSIsInVzZXJJZCI6IjVjNmU5ZDFlMjE3NDRlNDQ4ODRlMGYwYyIsImlhdCI6MTU1MTc2OTYzOSwiZXhwIjoxNTUyMzc0NDM5fQ.0H4u3L1AUcTXb9cs5Q2SwxMjaHa4LoHNKbnlp_NIwlw";
var carts;
var items;
var cartItems;
beforeAll(async (done, res) => {
  await request(app)
    .post("/api/user/login")
    .send({ email: "test@test.com", password: "test" })
    .then(() => {
      done();
    });
});

describe("POST /user/login", () => {
  test("should respond as expected", async () => {
    const response = await request(app)
      .post("/api/user/login")
      .send({ email: "wrongtest@test.com", password: "test" });
    expect(response.status).toEqual(401);
  });
});

describe("POST /user/checkAuth", () => {
  test("should respond as expected", async () => {
    const response = await request(app)
      .post("/api/user/checkAuth")
      .send({ token: token });
    expect(response.status).toEqual(200);
  });
});

describe("POST /user/signout", () => {
  test("should respond as expected", async () => {
    const response = await request(app)
      .post("/api/user/signout")
      .send({ token: token });
    expect(response.status).toEqual(404);
  });
});
describe("POST /user/checkauth", () => {
  test("should respond as expected", async () => {
    const response = await request(app).post("/api/user/checkAuth");
    expect(response.status).toEqual(401);
  });
});

describe("GET /user/create/:table", () => {
  test("should respond as expected", async () => {
    const response = await request(app)
      .get("/api/user/create/7")
      .send({
        token: token
      });
    expect(response.status).toEqual(201);
  });
});

describe("GET /user/create/:table", () => {
  test("should respond as expected", async () => {
    const response = await request(app)
      .get("/api/user/create/sf")
      .send({
        token: token
      })
      .expect(400)
      .then(res => {
        expect(res.body.success).toEqual(false);
      });
  });
});

describe("GET /user/what", () => {
  test("should respond as expected", async () => {
    const response = await request(app)
      .get("/api/user/what")
      .send({
        token: token
      })
      .expect(200)
      .then(res => {
        carts = res.body.info;
      });
  });
});

describe("DELETE /user/removecart/:id", () => {
  test("should respond as expected", async () => {
    const response = await request(app)
      .delete(`/api/user/removecart/${carts[0].cartId}`)
      .send({
        token: token
      })
      .expect(200);
  });
});

describe("DELETE /user/removecart/:id", () => {
  test("should respond as expected", async () => {
    const response = await request(app)
      .delete("/api/user/removecart/56776")
      .send({
        token: token
      })
      .expect(403);
  });
});

describe("GET /items", () => {
  test("should respond as expected", async () => {
    const response = await request(app)
      .get("/api/items")
      .send({
        token: token
      })
      .expect(200)
      .then(res => {
        items = res.body;
      });
  });
});

describe("GET /items", () => {
  test("should respond as expected", async () => {
    const response = await request(app)
      .get("/api/items")
      .expect(401);
  });
});

describe("POST /carts", () => {
  test("should respond as expected", async () => {
    const response = await request(app)
      .post("/api/carts")
      .send({
        token: token,
        _id: carts[1].cartId,
        count: 3,
        itm: items[0]._id
      })
      .expect(200);
  });
});

describe("POST /carts", () => {
  test("should respond as expected", async () => {
    const response = await request(app)
      .post("/api/carts")
      .send({
        _id: 23,
        token: token
      });
    expect(response.status).toEqual(403);
  });
});

describe("POST /carts", () => {
  test("should respond as expected", async () => {
    const response = await request(app)
      .post("/api/carts")
      .send({
        token: token,
        _id: carts[1].cartId,
        count: "ertt",
        itm: items[0]._id
      })
      .expect(400);
  });
});

describe("PUT /:id/:itId/:count", () => {
  test("should respond as expected", async () => {
    const response = await request(app)
      .put(`/api/carts/${carts[1].cartId}/${items[0]._id}/${10}`)
      .send({
        token: token
      })
      .expect(200);
  });
});

describe("PUT /:id/:itId/:count", () => {
  test("should respond as expected", async () => {
    const response = await request(app)
      .put(`/api/carts/${carts[1].cartId}/${items[3]._id}/asc`)
      .send({
        token: token
      })
      .expect(400);
  });
});

describe("PUT /:id/:itId/:count", () => {
  test("should respond as expected", async () => {
    const response = await request(app)
      .put(`/api/carts/${carts[1].cartId}/23423/${10}`)
      .send({
        token: token
      })
      .expect(404);
  });
});

describe("POST /carts", () => {
  test("should respond as expected", async () => {
    const response = await request(app)
      .post("/api/carts")
      .send({
        token: token,
        _id: carts[1].cartId,
        count: 3,
        itm: items[0]._id
      })
      .expect(200);
  });
});

describe("POST /carts", () => {
  test("should respond as expected", async () => {
    const response = await request(app)
      .post("/api/carts")
      .send({
        token: token,
        _id: carts[1].cartId,
        count: 3,
        itm: items[1]._id
      })
      .expect(200);
  });
});

describe("GET /carts/:id", () => {
  test("should respond as expected", async () => {
    const response = await request(app)
      .get(`/api/carts/${carts[1].cartId}`)
      .send({
        token: token
      })
      .expect(200)
      .then(res => {
        cartItems = res.body;
      });
  });
});

describe("GET /carts/:id", () => {
  test("should respond as expected", async () => {
    const response = await request(app)
      .get("/api/carts/5c78d7f8ec99731ab84c10ef")
      .send({
        token: token
      })
      .expect(403);
  });
});

describe("GET /carts/:id", () => {
  test("should respond as expected", async () => {
    const response = await request(app).get("/api/carts/123");
    expect(response.status).toEqual(401);
  });
});

describe("DELETE /carts/:id/:itId", () => {
  test("should respond as expected", async () => {
    const response = await request(app)
      .delete(`/api/carts/${carts[1].cartId}/${cartItems.items[1]._id}`)
      .send({
        token: token
      })
      .expect(204);
  });
});

describe("DELETE /carts/:id/:itId", () => {
  test("should respond as expected", async () => {
    const response = await request(app)
      .delete(`/api/carts/${carts[1].cartId}/${cartItems.items[1]._id}`)
      .send({
        token: token
      })
      .expect(404);
  });
});

describe("DELETE /carts/:id", () => {
  test("should respond as expected", async () => {
    const response = await request(app)
      .delete(`/api/carts/${carts[1].cartId}`)
      .send({
        token: token
      })
      .expect(204);
  });
});

module.exports = {
  testEnvironment: "node"
};

/*exports.setTimeout = function() {
  return global.setTimeout.apply(global, arguments);
};*/
