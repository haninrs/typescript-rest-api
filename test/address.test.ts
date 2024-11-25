import supertest from "supertest";
import { AddressTest, ContactTest, UserTest } from "./test-util"
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";


// Create address test
describe("POST /api/contacts/:contactId/addresses", () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
    })
    
    afterEach(async () => {
        await AddressTest.deleteAll()
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    // success
    it('should be able to create new address', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
        .post(`/api/contacts/${contact.id}/addresses`)
        .set("X-API-TOKEN", "test")
        .send({
            street: "test",
            city: "test",
            province: "test",
            country: "test",
            postal_code: "1234",
        })

        logger.debug(response.body)
        expect(response.status).toBe(201)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.street).toBe("test")
        expect(response.body.data.city).toBe("test")
        expect(response.body.data.province).toBe("test")
        expect(response.body.data.country).toBe("test")
        expect(response.body.data.postal_code).toBe("1234")
    })

    // invalid validation
    it('should be reject create new address if request validation is invalid', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
        .post(`/api/contacts/${contact.id}/addresses`)
        .set("X-API-TOKEN", "test")
        .send({
            street: "test",
            city: "test",
            province: "test",
            country: "",
            postal_code: "",
        })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })
    
    // contact not found
    it('should be reject create new address if contact not found', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
        .post(`/api/contacts/${contact.id + 122}/addresses`)
        .set("X-API-TOKEN", "test")
        .send({
            street: "test",
            city: "test",
            province: "test",
            country: "test",
            postal_code: "1234",
        })

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})

// get
describe("GET /api/contacts/:contactId/addresses/:addressId", () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
        await AddressTest.create();
    })
    
    afterEach(async () => {
        await AddressTest.deleteAll()
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    // success
    it('should be able to get address', async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()
        const response = await supertest(web)
        .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
        .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.street).toBe(address.street)
        expect(response.body.data.city).toBe(address.city)
        expect(response.body.data.province).toBe(address.province)
        expect(response.body.data.country).toBe(address.country)
        expect(response.body.data.postal_code).toBe(address.postal_code)
    })

    // address not found
    it('should be reject to get address if address not found', async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()
        const response = await supertest(web)
        .get(`/api/contacts/${contact.id}/addresses/${address.id + 122}`)
        .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })

    // contact not found
    it('should be reject to get address if contact not found', async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()
        const response = await supertest(web)
        .get(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
        .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})

// update
describe("PUT /api/contacts/:contactId/addresses/:addressId", () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
        await AddressTest.create();
    })
    
    afterEach(async () => {
        await AddressTest.deleteAll()
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    // success valid request
    it('should be able to update address', async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()
        const response = await supertest(web)
        .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
        .set("X-API-TOKEN", "test")
        .send({
            street: "test2",
            city: "test2",
            province: "test2",
            country: "test2",
            postal_code: "1234",
        })

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(address.id)
        expect(response.body.data.street).toBe("test2")
        expect(response.body.data.city).toBe("test2")
        expect(response.body.data.province).toBe("test2")
        expect(response.body.data.country).toBe("test2")
        expect(response.body.data.postal_code).toBe("1234")
    })

    // invalid validation
    it('should be reject update address if request validation is invalid', async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()
        const response = await supertest(web)
        .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
        .set("X-API-TOKEN", "test")
        .send({
            street: "test2",
            city: "test2",
            province: "test2",
            country: "",
            postal_code: "",
        })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })

    // address not found
    it('should be reject update address if address not found', async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()
        const response = await supertest(web)
        .put(`/api/contacts/${contact.id}/addresses/${address.id + 123}`)
        .set("X-API-TOKEN", "test")
        .send({
            street: "test2",
            city: "test2",
            province: "test2",
            country: "test2",
            postal_code: "1234",
        })

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })

    // contact not found
    it('should be reject update address if contact not found', async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()
        const response = await supertest(web)
        .put(`/api/contacts/${contact.id + 123}/addresses/${address.id}`)
        .set("X-API-TOKEN", "test")
        .send({
            street: "test2",
            city: "test2",
            province: "test2",
            country: "test2",
            postal_code: "1234",
        })

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})


// remove
describe("DELETE /api/contacts/:contactId/addresses/:addressId", () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
        await AddressTest.create();
    })
    
    afterEach(async () => {
        await AddressTest.deleteAll()
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    // success
    it('should be able to remove address', async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()
        const response = await supertest(web)
        .delete(`/api/contacts/${contact.id}/addresses/${address.id}`)
        .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe('OK')
    })

    // contact not found
    it('should be reject remove address if contact not found', async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()
        const response = await supertest(web)
        .delete(`/api/contacts/${contact.id + 122}/addresses/${address.id}`)
        .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })

    // address not found
    it('should be reject remove address if address not found', async () => {
        const contact = await ContactTest.get()
        const address = await AddressTest.get()
        const response = await supertest(web)
        .delete(`/api/contacts/${contact.id}/addresses/${address.id + 122}`)
        .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})

// list
describe("GET /api/contacts/:contactId/addresses", () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
        await AddressTest.create();
    })
    
    afterEach(async () => {
        await AddressTest.deleteAll()
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    // success
    it('should be able to get list addresses', async () => {
        const contact = await ContactTest.get()

        const response = await supertest(web)
        .get(`/api/contacts/${contact.id}/addresses`)
        .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(1)
    })

    // contact not found
    it('should reject if contact is not found', async () => {
        const contact = await ContactTest.get()

        const response = await supertest(web)
        .get(`/api/contacts/${contact.id + 1}/addresses`)
        .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })

   
})