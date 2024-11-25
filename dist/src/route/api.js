"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth-middleware");
const user_controller_1 = require("../controller/user-controller");
const contact_controller_1 = require("../controller/contact-controller");
const address_controller_1 = require("../controller/address-controller");
//  route yang butuh auth middleware
//  route yg butuh login dulu 
//  kayak contoh get user 
//  butuh login, klo login kan ada token, dari token bisa dpt req.user
// butuh req.user
exports.apiRouter = express_1.default.Router();
exports.apiRouter.use(auth_middleware_1.authMiddleware);
// USER API
exports.apiRouter.get('/api/users/current', user_controller_1.UserController.get);
exports.apiRouter.patch('/api/users/current', user_controller_1.UserController.update);
exports.apiRouter.delete('/api/users/current', user_controller_1.UserController.logout);
// CONTACT API
exports.apiRouter.post('/api/contacts', contact_controller_1.ContactController.create);
exports.apiRouter.get('/api/contacts/:contactId(\\d+)', contact_controller_1.ContactController.get);
exports.apiRouter.put('/api/contacts/:contactId(\\d+)', contact_controller_1.ContactController.update);
exports.apiRouter.delete('/api/contacts/:contactId(\\d+)', contact_controller_1.ContactController.remove);
exports.apiRouter.get('/api/contacts', contact_controller_1.ContactController.search);
// ADDRESS API
exports.apiRouter.post('/api/contacts/:contactId(\\d+)/addresses', address_controller_1.AddressController.create);
exports.apiRouter.get('/api/contacts/:contactId(\\d+)/addresses/:addressId(\\d+)', address_controller_1.AddressController.get);
exports.apiRouter.put('/api/contacts/:contactId(\\d+)/addresses/:addressId(\\d+)', address_controller_1.AddressController.update);
exports.apiRouter.delete('/api/contacts/:contactId(\\d+)/addresses/:addressId(\\d+)', address_controller_1.AddressController.remove);
exports.apiRouter.get('/api/contacts/:contactId(\\d+)/addresses', address_controller_1.AddressController.list);
