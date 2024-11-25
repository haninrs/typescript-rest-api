import supertest from "supertest";
import { ContactTest, UserTest } from "./test-util";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

// create contact test
describe("POST /api/contacts", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  //  unit test betul
  it("should be able to create new contact", async () => {
    const response = await supertest(web)
    .post("/api/contacts")
    .set("X-API-TOKEN", "test")
    .send({
      first_name: "Mulyono",
      last_name: "fufufafa",
      email: "mulfu@example.com",
      phone: "0812345678",
    });

    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.first_name).toBe("Mulyono");
    expect(response.body.data.last_name).toBe("fufufafa");
    expect(response.body.data.email).toBe("mulfu@example.com");
    expect(response.body.data.phone).toBe("0812345678");
  });
  it("should be reject to create new contact", async () => {
    const response = await supertest(web).post("/api/contacts").set("X-API-TOKEN", "test").send({
      first_name: "",
      last_name: "",
      email: "mulfu",
      phone: "08123456783798598658764876590090909090",
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

// get contact test
describe("GET /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to get contact", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
    .get(`/api/contacts/${contact.id}`)
    .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.first_name).toBe("test");
    expect(response.body.data.last_name).toBe("test");
    expect(response.body.data.email).toBe("test@example.com");
    expect(response.body.data.phone).toBe("089999999");
  });

  //   unit test salah contactId
  it("should be reject to get contact", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id + 1}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

// update contact
describe("PUT /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to update contact", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web).put(`/api/contacts/${contact.id}`).set("X-API-TOKEN", "test").send({
      first_name: "test2",
      last_name: "test2",
      email: "mulfu@example.com",
      phone: "0812345678",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.first_name).toBe("test2");
    expect(response.body.data.last_name).toBe("test2");
    expect(response.body.data.email).toBe("mulfu@example.com");
    expect(response.body.data.phone).toBe("0812345678");
  });

  it("should be reject to update contact if request is invalid", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web).put(`/api/contacts/${contact.id}`).set("X-API-TOKEN", "test").send({
      first_name: "",
      last_name: "",
      email: "mulfu",
      phone: "08123456783798598658764876590090909090",
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

//  remove contact
describe("DELETE /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  //   unit test able
  it("Should be able to remove contact", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
    .delete(`/api/contacts/${contact.id}`)
    .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBe('OK');
    console.log(response.body.data);
    console.log(response.status);
    
  });

  //  unit test rejecet bcs contactId wrong
  it("Should be reject to remove contact if contact is not found", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .delete(`/api/contacts/${contact.id + 1}`)
      .set("X-API-TOKEN", "test");

      logger.debug(response.body)
      expect(response.status).toBe(404)
      expect(response.body.errors).toBeDefined()
  });
});

describe("GET /api/contacts", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create(); 
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  // test tanpa parameter query apapun
  it("should be able to search contacts", async () => {
    const response = await supertest(web)
        .get("/api/contacts")
        .set("X-API-TOKEN", "test");
    
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1)
    expect(response.body.paging.current_page).toBe(1)
    expect(response.body.paging.total_page).toBe(1)
    expect(response.body.paging.size).toBe(10)
  });

  // search using name
  it("should be able to search contacts using name", async () => {
    const response = await supertest(web)
        .get("/api/contacts")
        .query({name: 'es'})
        .set("X-API-TOKEN", "test");
    
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1)
    expect(response.body.paging.current_page).toBe(1)
    expect(response.body.paging.total_page).toBe(1)
    expect(response.body.paging.size).toBe(10)
  });

  // search using email
  it("should be able to search contacts using email", async () => {
    const response = await supertest(web)
        .get("/api/contacts")
        .query({email: ".com"})
        .set("X-API-TOKEN", "test");
    
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1)
    expect(response.body.paging.current_page).toBe(1)
    expect(response.body.paging.total_page).toBe(1)
    expect(response.body.paging.size).toBe(10)
  });
  
  // search using phone
  it("should be able to search contacts using phone", async () => {
    const response = await supertest(web)
        .get("/api/contacts")
        .query({phone: "8999"})
        .set("X-API-TOKEN", "test");
    
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1)
    expect(response.body.paging.current_page).toBe(1)
    expect(response.body.paging.total_page).toBe(1)
    expect(response.body.paging.size).toBe(10)
  });


  // search no result
  it("should be able to search contacts no result", async () => {
    const response = await supertest(web)
        .get("/api/contacts")
        .query({name: "romeo"})
        .set("X-API-TOKEN", "test");
    
    logger.debug(response.body);
    expect(response.status).toBe(200);
    // data nya gaada tp status code ttp 200
    // bgini hasilnya
    // response : {"data":[],"paging":{"size":10,"total_page":0,"current_page":1}}
    expect(response.body.data.length).toBe(0)
    expect(response.body.paging.current_page).toBe(1)
    expect(response.body.paging.total_page).toBe(0)
    expect(response.body.paging.size).toBe(10)
  });


   // search with paging
   it("should be able to search contacts with paging", async () => {
    const response = await supertest(web)
        .get("/api/contacts")
        .query({
          page: 2,
          size: 1,
        })
        .set("X-API-TOKEN", "test");
    
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(0)
    expect(response.body.paging.current_page).toBe(2)
    expect(response.body.paging.total_page).toBe(1)
    expect(response.body.paging.size).toBe(1)

    // hasil :
    //   response : {"data":[],"paging":{"size":1,"total_page":1,"current_page":2}}
  });

})