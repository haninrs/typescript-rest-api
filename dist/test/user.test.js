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
const bcrypt_1 = __importDefault(require("bcrypt"));
const web_1 = require("../src/application/web");
const logging_1 = require("../src/application/logging");
const test_util_1 = require("./test-util");
// Register new user
describe("POST /api/users", () => {
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.delete();
    }));
    //  scenario kl salah
    it("should reject register new user if request is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .post("/api/users")
            .send({
            username: "",
            name: "",
            password: "",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    }));
    //  scenario kl bener
    it("should register new user if request is valid", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .post("/api/users")
            .send({
            username: "test",
            name: "test",
            password: "test",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(201);
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.name).toBe("test");
    }));
});
// LOGIN 
describe("POST /api/users/login", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.delete();
    }));
    //  scenario kl bener
    it("should be able to login", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .post("/api/users/login")
            .send({
            username: "test",
            password: "test",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.name).toBe("test");
        expect(response.body.data.token).toBeDefined();
    }));
    //  scenario username wrong
    it("should reject login user if username is wrong", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .post("/api/users/login")
            .send({
            username: "wrong",
            password: "test",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    }));
    //  scenario password wrong
    it("should reject login user if password is wrong", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .post("/api/users/login")
            .send({
            username: "test",
            password: "wrong",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    }));
});
// GET
describe('GET /api/users/current', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.delete();
    }));
    // scenario bener
    it('should be able to get current user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .get('/api/users/current')
            .set('X-API-TOKEN', 'test');
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.name).toBe("test");
    }));
    //  scenario salah token
    it("should reject if token invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .get('/api/users/current')
            .set('X-API-TOKEN', 'wrong');
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    }));
});
//  UPDATE
describe("PATCH /api/users/current", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.delete();
    }));
    //  scenario request name betul
    it("should be able to update current user name", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .patch('/api/users/current')
            .set('X-API-TOKEN', 'test')
            .send({
            name: "test2",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.name).toBe("test2");
    }));
    // scenario request password betul
    it("should be able to update current user password", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .patch('/api/users/current')
            .set('X-API-TOKEN', 'test')
            .send({
            password: "test2",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        const user = yield test_util_1.UserTest.get();
        expect(yield bcrypt_1.default.compare("test2", user.password)).toBe(true);
    }));
    //  scenario request invalid (name or password empty)
    it("should reject if request is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .patch('/api/users/current')
            .set('X-API-TOKEN', 'test')
            .send({
            name: "",
            password: "",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    }));
    //  scenario salah token
    it("should reject if token invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .patch('/api/users/current')
            .set('X-API-TOKEN', 'wrong')
            .send({
            name: "test2",
            password: "test2",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    }));
});
//  LOGOUT
describe("DELETE /api/users/current", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.delete();
    }));
    // scenario betul
    it("should be able to logout", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .delete('/api/users/current')
            .set('X-API-TOKEN', 'test');
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe('OK');
        // expect(response.body.token).toBeUndefined()
        // console.log(response.body.token);
        // or gini juga bisa
        const user = yield test_util_1.UserTest.get();
        expect(user.token).toBe(null);
    }));
    it('should reject if token invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .delete('/api/users/current')
            .set('X-API-TOKEN', 'wrong');
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    }));
});
