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



test("GET /v1/config/vehicles/list?limit=20&offset=1 List all vehicles config without Auth", async () => {
    await server.get("/v1/config/vehicles/list?limit=20&offset=1")
      .expect(401)
      .then((response) => {
        // Check type and length
        expect(response.body.response).toBe("Unauthorized");
      });
});

test("GET /v1/config/vehicles/list?limit=20&offset=1 List all vehicles config with Auth", async () => {
    await server.get("/v1/config/vehicles/list?limit=20&offset=1")
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        // Check type and length
        expect(response.body).toHaveProperty("response");
      });
});


test("POST v1/config/vehicles/add Add new vehicle without payload", async () => {
    await server.post("/v1/receipts/add")
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .expect(400)
      .then((response) => {
        // Check type and length
        expect(response.body).toHaveProperty("response");
      });
});

test("POST v1/config/vehicles/add Add new vehicle with payload", async () => {
    await server.post("/v1/config/vehicles/add")
      .set('Authorization', `Bearer ${token}`)
      .send({
        "class_type": "Two-wheeler",
        "fare_amount":120,
        "penalty_amount": 50,
        "is_active": true,
        "is_heavy_vehicle": false
      })
      .expect(200)
      .then((response) => {
        // Check type and length
        expect(response.body).toHaveProperty("response");
        expect(response.body.response).toHaveProperty("_id");

      });
});



test("DELETE /v1/config/vehicles Delete vehicle", async () => {
  await server.delete("/v1/config/vehicles/611fafc6601c9d01abef376f")
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(response.body).toHaveProperty("response");
      expect(response.body.response).toBe("OK");

    });
});


