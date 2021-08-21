const supertest = require('supertest');
jest.setTimeout(20000)
const server = supertest.agent('http://localhost:5000')

let token;

beforeAll((done) => {
  server
    .post('/v1/auth/signin')
    .send({
      email: "testmayank@gmail.com",
      password: "mayank2424",
    })
    .then((response) => {
      token = response.body.response.token; // save the token!
      done();
    });
});

test("GET users list without Authorization /v1/user/list", async () => {
  await server.get("/v1/user/list")
    .expect(401)
    .then((response) => {
    });
});

test("GET users list with Authorization /v1/user/list", async () => {
   await server.get("/v1/user/list")
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .then((response) => {
      expect(response.body).toHaveProperty("response");

    });
});

test("POST Add user with already existing user /v1/user/add", async () => {
  await server.post("/v1/user/add")
   .send({
      "email": "test_usssessr@toll.com",
      "password": "test_toll",
      "name": "Mayank 2",
      "gender": "male",
      "contact_number": "+91-9953338507"
   })
   .set('Authorization', `Bearer ${token}`)
   .expect(400)
   .then((response) => {
     expect(response.body).toHaveProperty("response");
     expect(response.body.response).toBe("User already exist");

   });
});

test("POST/ Add user with super admin account /v1/user/add", async () => {
  await server.post("/v1/user/add")
    .send({
      "email": `new_usser@toll_${(Math.random() + 1).toString(36).substring(4)}.com`,
      "password": "new_user",
      "name": "User 2",
      "gender": "female",
      "contact_number": "+91-9953338507"
  })
   .set('Authorization', `Bearer ${token}`)
   .expect(200)
   .then((response) => {
     expect(response.body).toHaveProperty("response");
     expect(response.body.response).toHaveProperty("_id");

   });
});

//This test will fail if I provided super admin account (As I am setting auth before test start)
test("POST/ Add user without super admin account /v1/user/add", async () => {
  await server.post("/v1/user/add")
    .send({
      "email": `new_user_${(Math.random() + 1).toString(36).substring(7)}@toll.com`,
      "password": "new_user",
      "name": "User 2",
      "gender": "female",
      "contact_number": "+91-9953338507"
  })
   .set('Authorization', `Bearer ${token}`)
   .expect(403)
   .then((response) => {
     expect(response.body).toHaveProperty("response");
     expect(response.body.response).toBe("Forbidden ");


   });
});


test("DELETE / Delete user /v1/user/:userId", async () => {
  await server.delete("/v1/user/6121065392427976f62f1bc3")
   .set('Authorization', `Bearer ${token}`)
   .expect(200)
   .then((response) => {
     expect(response.body).toHaveProperty("response");
     expect(response.body.response).toBe("OK");
   });
});

test("DELETE / Delete user where user doesn't exist /v1/user/:userId", async () => {
  await server.delete("/v1/user/612104f892427976f62f1bbf")
   .set('Authorization', `Bearer ${token}`)
   .expect(500)
   .then((response) => {
     expect(response.body.response).toBe("User doesn't exist");
   });
});