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
