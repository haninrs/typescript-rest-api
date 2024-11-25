import supertest from "supertest";
import bcrypt from "bcrypt";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { UserTest } from "./test-util";

// Register new user
describe("POST /api/users", () => {

  afterEach(async () => {
    await UserTest.delete()
  })

  //  scenario kl salah
  it("should reject register new user if request is invalid", async () => {
    const response = await supertest(web)
    .post("/api/users")
    .send({
      username: "",
      name: "",
      password: "",
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  //  scenario kl bener
  it("should register new user if request is valid", async () => {
    const response = await supertest(web)
    .post("/api/users")
    .send({
      username: "test",
      name: "test",
      password: "test",
    });

    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
  });
});

// LOGIN 
describe("POST /api/users/login", () => {

  beforeEach(async () => {
    await UserTest.create()
  })

  afterEach(async () => {
    await UserTest.delete()
  })

  //  scenario kl bener
  it("should be able to login", async () => {
    const response = await supertest(web)
    .post("/api/users/login")
    .send({
      username: "test",
      password: "test",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
    expect(response.body.data.token).toBeDefined();
  })

  //  scenario username wrong
  it("should reject login user if username is wrong", async () => {
    const response = await supertest(web)
    .post("/api/users/login")
    .send({
      username: "wrong",
      password: "test",
    });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  //  scenario password wrong
  it("should reject login user if password is wrong", async () => {
    const response = await supertest(web)
    .post("/api/users/login")
    .send({
      username: "test",
      password: "wrong",
    });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

})

// GET
describe('GET /api/users/current', () => { 

  beforeEach(async () => {
    await UserTest.create()
  })

  afterEach(async () => {
    await UserTest.delete()
  })


  // scenario bener
  it('should be able to get current user', async () => {
    const response = await supertest(web)
    .get('/api/users/current')
    .set('X-API-TOKEN', 'test')

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
  })

  //  scenario salah token
  it("should reject if token invalid", async () => {
    const response = await supertest(web)
    .get('/api/users/current')
    .set('X-API-TOKEN', 'wrong')

    logger.debug(response.body)
    expect(response.status).toBe(401)
    expect(response.body.errors).toBeDefined()
  })
 })

//  UPDATE
 describe("PATCH /api/users/current", () => {

  beforeEach(async () => {
    await UserTest.create()
  })

  afterEach(async () => {
    await UserTest.delete()
  })

  //  scenario request name betul
  it("should be able to update current user name", async () => {
    const response = await supertest(web)
    .patch('/api/users/current')
    .set('X-API-TOKEN', 'test')
    .send({
      name: "test2",
    })

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.data.name).toBe("test2")
  })

  // scenario request password betul
  it("should be able to update current user password", async () => {
    const response = await supertest(web)
    .patch('/api/users/current')
    .set('X-API-TOKEN', 'test')
    .send({
      password: "test2",
    })

    logger.debug(response.body)
    expect(response.status).toBe(200)

    const user = await UserTest.get()
    expect(await bcrypt.compare("test2", user.password)).toBe(true)
  })

  //  scenario request invalid (name or password empty)
  it("should reject if request is invalid" , async () => {
    const response = await supertest(web)
    .patch('/api/users/current')
    .set('X-API-TOKEN', 'test')
    .send({
      name: "",
      password: "",
    })

    logger.debug(response.body)
    expect(response.status).toBe(400)
    expect(response.body.errors).toBeDefined()
  })

  //  scenario salah token
  it("should reject if token invalid", async () => {
    const response = await supertest(web)
    .patch('/api/users/current')
    .set('X-API-TOKEN', 'wrong')
    .send({
      name: "test2",
      password: "test2",
    })

    logger.debug(response.body)
    expect(response.status).toBe(401)
    expect(response.body.errors).toBeDefined()
  })

 })

//  LOGOUT
describe("DELETE /api/users/current", () => {

  beforeEach(async () => {  
    await UserTest.create()
  })

  afterEach(async () => {
    await UserTest.delete()
  })

  // scenario betul
  it("should be able to logout", async () => {
    const response = await supertest(web)
    .delete('/api/users/current')
    .set('X-API-TOKEN', 'test')

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.data).toBe('OK')
    // expect(response.body.token).toBeUndefined()
    // console.log(response.body.token);
    // or gini juga bisa
    const user = await UserTest.get()
    expect(user.token).toBe(null)
  })

  it('should reject if token invalid', async () => {
    const response = await supertest(web)
    .delete('/api/users/current')
    .set('X-API-TOKEN', 'wrong')

    logger.debug(response.body)
    expect(response.status).toBe(401)
    expect(response.body.errors).toBeDefined()
  })

})