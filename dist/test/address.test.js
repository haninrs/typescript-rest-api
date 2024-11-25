"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const test_util_1 = require("./test-util");
const web_1 = require("../src/application/web");
const logging_1 = require("../src/application/logging");
// Create address test
describe("POST /api/contacts/:contactId/addresses", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
        yield test_util_1.ContactTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.AddressTest.deleteAll();
        yield test_util_1.ContactTest.deleteAll();
        yield test_util_1.UserTest.delete();
    }));
    // success
    it('should be able to create new address', () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .post(`/api/contacts/${contact.id}/addresses`)
            .set("X-API-TOKEN", "test")
            .send({
            street: "test",
            city: "test",
            province: "test",
            country: "test",
            postal_code: "1234",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(201);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.street).toBe("test");
        expect(response.body.data.city).toBe("test");
        expect(response.body.data.province).toBe("test");
        expect(response.body.data.country).toBe("test");
        expect(response.body.data.postal_code).toBe("1234");
    }));
    // invalid validation
    it('should be reject create new address if request validation is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .post(`/api/contacts/${contact.id}/addresses`)
            .set("X-API-TOKEN", "test")
            .send({
            street: "test",
            city: "test",
            province: "test",
            country: "",
            postal_code: "",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    }));
    // contact not found
    it('should be reject create new address if contact not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .post(`/api/contacts/${contact.id + 122}/addresses`)
            .set("X-API-TOKEN", "test")
            .send({
            street: "test",
            city: "test",
            province: "test",
            country: "test",
            postal_code: "1234",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    }));
});
// get
describe("GET /api/contacts/:contactId/addresses/:addressId", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
        yield test_util_1.ContactTest.create();
        yield test_util_1.AddressTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.AddressTest.deleteAll();
        yield test_util_1.ContactTest.deleteAll();
        yield test_util_1.UserTest.delete();
    }));
    // success
    it('should be able to get address', () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const address = yield test_util_1.AddressTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.street).toBe(address.street);
        expect(response.body.data.city).toBe(address.city);
        expect(response.body.data.province).toBe(address.province);
        expect(response.body.data.country).toBe(address.country);
        expect(response.body.data.postal_code).toBe(address.postal_code);
    }));
    // address not found
    it('should be reject to get address if address not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const address = yield test_util_1.AddressTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .get(`/api/contacts/${contact.id}/addresses/${address.id + 122}`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    }));
    // contact not found
    it('should be reject to get address if contact not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const address = yield test_util_1.AddressTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .get(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    }));
});
// update
describe("PUT /api/contacts/:contactId/addresses/:addressId", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
        yield test_util_1.ContactTest.create();
        yield test_util_1.AddressTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.AddressTest.deleteAll();
        yield test_util_1.ContactTest.deleteAll();
        yield test_util_1.UserTest.delete();
    }));
    // success valid request
    it('should be able to update address', () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const address = yield test_util_1.AddressTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test")
            .send({
            street: "test2",
            city: "test2",
            province: "test2",
            country: "test2",
            postal_code: "1234",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(address.id);
        expect(response.body.data.street).toBe("test2");
        expect(response.body.data.city).toBe("test2");
        expect(response.body.data.province).toBe("test2");
        expect(response.body.data.country).toBe("test2");
        expect(response.body.data.postal_code).toBe("1234");
    }));
    // invalid validation
    it('should be reject update address if request validation is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const address = yield test_util_1.AddressTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test")
            .send({
            street: "test2",
            city: "test2",
            province: "test2",
            country: "",
            postal_code: "",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    }));
    // address not found
    it('should be reject update address if address not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const address = yield test_util_1.AddressTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .put(`/api/contacts/${contact.id}/addresses/${address.id + 123}`)
            .set("X-API-TOKEN", "test")
            .send({
            street: "test2",
            city: "test2",
            province: "test2",
            country: "test2",
            postal_code: "1234",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    }));
    // contact not found
    it('should be reject update address if contact not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const address = yield test_util_1.AddressTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .put(`/api/contacts/${contact.id + 123}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test")
            .send({
            street: "test2",
            city: "test2",
            province: "test2",
            country: "test2",
            postal_code: "1234",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    }));
});
// remove
describe("DELETE /api/contacts/:contactId/addresses/:addressId", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
        yield test_util_1.ContactTest.create();
        yield test_util_1.AddressTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.AddressTest.deleteAll();
        yield test_util_1.ContactTest.deleteAll();
        yield test_util_1.UserTest.delete();
    }));
    // success
    it('should be able to remove address', () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const address = yield test_util_1.AddressTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .delete(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe('OK');
    }));
    // contact not found
    it('should be reject remove address if contact not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const address = yield test_util_1.AddressTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .delete(`/api/contacts/${contact.id + 122}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    }));
    // address not found
    it('should be reject remove address if address not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const address = yield test_util_1.AddressTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .delete(`/api/contacts/${contact.id}/addresses/${address.id + 122}`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    }));
});
// list
describe("GET /api/contacts/:contactId/addresses", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
        yield test_util_1.ContactTest.create();
        yield test_util_1.AddressTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.AddressTest.deleteAll();
        yield test_util_1.ContactTest.deleteAll();
        yield test_util_1.UserTest.delete();
    }));
    // success
    it('should be able to get list addresses', () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .get(`/api/contacts/${contact.id}/addresses`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
    }));
    // contact not found
    it('should reject if contact is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .get(`/api/contacts/${contact.id + 1}/addresses`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    }));
});
