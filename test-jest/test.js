const request = require("supertest");
const session = require("supertest-session");

process.env.TEST_SUITE = "spacetime-systems-test";
process.env.NODE_ENV = "test";

const app = require("../app");

var token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwidXNlcklkIjoiNWM4ZGRmMWMxMDQ2MmMxMGU3NmYyNDgxIiwiaWF0IjoxNTUyODAxNTc5LCJleHAiOjE1NTM0MDYzNzl9.Bsxrrz2OJoiv3EG1O2BBmNA8e9VCDxBiy5ig1SbCqzM";
var carts;
var items;
var cartItems;
beforeAll(async (done, res) => {
  await request(app)
    .post("/api/user/login")
    .send({ email: "test@gmail.com", password: "test" })
    .then(res => {
      done();
    });
});

describe("POST /user/signup", () => {
  test("should respond as expected", async () => {
    const response = await request(app)
      .post("/api/user/signup")
      .send({ email: "test@test.com", password: "1234" });
    expect(response.status).toEqual(409);
  });
});

describe("POST /user/signup", () => {
  test("should respond as expected", async () => {
    const response = await request(app)
      .post("/api/user/signup")
      .send({ email: "test", password: "1234" });
    expect(response.status).toEqual(400);
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

describe("POST /items", () => {
  test("should respond as expected", async () => {
    const response = await request(app)
      .post(`/api/items`)
      .send({
        token: token,
        name: "Important",
        description: "Valuable thing",
        price: 5,
        available: 200
      })
      .expect(201);
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

describe("DELETE /items/:id", () => {
  test("should respond as expected", async () => {
    const response = await request(app)
      .delete(`/api/items/${items[0]._id}`)
      .send({
        token: token
      })
      .expect(200);
  });
});

describe("DELETE /items/:id", () => {
  test("should respond as expected", async () => {
    const response = await request(app)
      .delete(`/api/items/234234`)
      .send({
        token: token
      })
      .expect(404);
  });
});

describe("POST /user/signup", () => {
  test("should respond as expected", async () => {
    const response = await request(app)
      .post("/api/user/signup")
      .send({ email: "newuser11@test.com", password: "1234" })
      .expect(201);
  });
});

const token1 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5ld3VzZXIxMUB0ZXN0LmNvbSIsInVzZXJJZCI6IjVjOGYxZmU4YWNhN2ExNGNkMjI1MDRkNiIsImlhdCI6MTU1Mjg4ODI3NSwiZXhwIjoxNTUzNDkzMDc1fQ.DyW_gYbVz3RtMGoPpVW9h2m4nYwiEantA1sNvER0YmI";

describe("DELETE /user/deleteuser", () => {
  test("should respond as expected", async () => {
    const response = await request(app)
      .delete("/api/user/deleteuser")
      .send({ token: token1 })
      .expect(200);
  });
});

/*

describe("DELETE /user/deleteuser", () => {
  test("should respond as expected", async () => {
    const response = await request(app)
      .post("/api/user/login")
      .send({ email: "newuser11@test.com", password: "1234" })
      .expect("set-cookie", /token/)
      .expect(200)
      .end(async (err, res) => {
        const response = await request(app)
          .delete("/api/user/deleteuser")
          .set("Cookie", res.headers["set-cookie"])
          .send()
          .expect(400)
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
}); */
/*
describe("POST /user/signup", () => {
  test("should respond as expected", async () => {
    const response = await request(app)
      .post("/api/user/signup")
      .send({ email: "newuser11@test.com", password: "1234" })
      .expect(201);
  });
});*/

/*


describe("DELETE /user/deleteuser", () => {
  test("should respond as expected", async () => {
    const response = await request(app)
      .delete("api/user/deleteuser")
      .send({
        token: token
      })
      .expect(200);
  });
});

*/

module.exports = {
  testEnvironment: "node"
};

/*exports.setTimeout = function() {
  return global.setTimeout.apply(global, arguments);
};*/
