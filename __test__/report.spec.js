const supertest = require('supertest');
const server = supertest.agent('http://localhost:5000')

let token;
beforeAll((done) => {
  server
    .post('/v1/auth/signin')
    .send({
      email: "testmayank@gmail.com", //super-admin account
      password: "mayank2424",
    })
    .then((response) => {
      token = response.body.response.token; // save the token!
      done();
    });
});



test("GET /v1/receipts/list Get All receipts without authorization", async () => {
    await server.get("/v1/receipts/list")
      .expect(401)
      .then((response) => {
        // Check type and length
        expect(response.body.response).toBe("Unauthorized");
      });
});

test("GET /v1/receipts/list Get All receipts with authorization", async () => {
    await server.get("/v1/receipts/list")
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        // Check type and length
        expect(response.body).toHaveProperty("response");
      });
});


test("POST /v1/receipts/add Add new receipt without payload", async () => {
    await server.post("/v1/receipts/add")
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .expect(400)
      .then((response) => {
        // Check type and length
        expect(response.body).toHaveProperty("response");
      });
});



test("DELETE /v1/receipts/:id Delete receipt if receipt not present", async () => {
  await server.delete("/v1/receipts/611fafbe601c9d01abef376e")
    .set('Authorization', `Bearer ${token}`)
    .expect(500)
    .then((response) => {
      // Check type and length
      expect(response.body).toHaveProperty("response");
      expect(response.body.response).toBe("Receipt Not found");

    });
});


test("GET /v1/receipts?vehicle_number Checks single receipt detail with invalid vehicle_number", async () => {
  await server.get("/v1/receipts?vehicle_number=AI-20-EE-2345")
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(response.body).toHaveProperty("response");
      expect(response.body.response).toBe("Not Found");

    });
});


test("GET /v1/receipts?vehicle_number If Receipt is expired", async () => {
  await server.get("/v1/receipts?vehicle_number=DL-20-EE-2345")
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(response.body).toHaveProperty("response");
      expect(response.body.response).toBe("Receipt Expired");

    });
});

test("GET /v1/receipts?vehicle_number Toll receipt with two way receipt and return is valid", async () => {
  await server.get("/v1/receipts?vehicle_number=MH-20-EE-2346")
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(response.body).toHaveProperty("response");
      expect(response.body.response).toBe("Pass vehicle");

    });
});
