const supertest = require("supertest");
const server = require("../../index");

test("Testing Jokes Route", async () => {
  const res = await supertest(server)
    .post("/api/auth/login")
    .send({
      username: "testUser2",
      password: "test"
    });
  const getJokes = await supertest(server)
    .get("/api/jokes")
    .set("authorization", res.body.token);
  expect(getJokes.status).toBe(200);
  expect(getJokes.type).toBe("application/json");
  expect(getJokes.body.length).toBeGreaterThan(2);
});

test("Testing Jokes Route Without header", async () => {
  const getJokes = await supertest(server).get("/api/jokes");
  expect(getJokes.status).toBe(401);
});
