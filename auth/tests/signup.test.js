const supertest = require("supertest");
const server = require("../../index");
const db = require("../../database/dbConfig");

beforeEach(async () => {
  await db.seed.run();
});

test("Testing Success Register Route", async () => {
  const res = await supertest(server)
    .post("/api/auth/register")
    .send({
      username: "newUser",
      password: "test"
    });
  expect(res.type).toBe("application/json");
  expect(res.status).toBe(201);
});

test("Testing Duplicate Register Route", async () => {
  const res = await supertest(server)
    .post("/api/auth/register")
    .send({
      username: "testUser2",
      password: "test"
    });
  expect(res.status).toBe(500);
});
