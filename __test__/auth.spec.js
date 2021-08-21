const supertest = require('supertest');
const server = supertest.agent('http://localhost:5000')

beforeAll(() => jest.setTimeout(90 * 1000))

test("POST Sign in with existing account /v1/auth/signin", async () => {
    await server.post("/v1/auth/signin")
      .send({ email: 'testmayank@gmail.com', password: "mayank2424"})
      .expect(200)
      .then((response) => {
        // Check type and length
        expect(response.body.response).toHaveProperty("token");
      });
});

test("POST Signin with invalid user /v1/auth/signin", async () => {
    await server.post("/v1/auth/signin")
      .send({ email: 'testsmayank@gmail.com', password: "mayank2424"})
      .expect(400)
      .then((response) => {
        // Check type and length
        expect(response.body.response).toBe("User not found");
      });
});

test("POST Signin with invalid password /v1/auth/signin", async () => {
    await server.post("/v1/auth/signin")
      .send({ email: 'testmayank@gmail.com', password: "mayanks2424"})
      .expect(400)
      .then((response) => {
        // Check type and length
        expect(response.body.response).toBe("Incorrect Password");
      });
});