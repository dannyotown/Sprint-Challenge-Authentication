const supertest = require("supertest");
const server = require("../../index");
const db = require("../../database/dbConfig");
beforeEach(async () => {
  await db.seed.run();
});
test("Testing Success Login Route", async () => {
  const res = await supertest(server)
    .post("/api/auth/login")
    .send({
      username: "testUser2",
      password: "test"
    });
  expect(res.status).toBe(200);
  expect(res.type).toBe("application/json");
  expect(res.body.message).toBe("Welcome testUser2");
});

test("Testing Fail Login Route", async () => {
  const res = await supertest(server)
    .post("/api/auth/login")
    .send({
      username: "testUser2",
      password: "test222"
    });
  expect(res.status).toBe(401);
  expect(res.type).toBe("application/json");
});
