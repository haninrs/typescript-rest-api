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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressController = void 0;
const address_service_1 = require("../service/address-service");
class AddressController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                request.contact_id = +req.params.contactId;
                const response = yield address_service_1.AddressService.create(req.user, request);
                console.log("response : " + JSON.stringify(response));
                res.status(201).json({
                    data: response,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = {
                    contact_id: +req.params.contactId,
                    address_id: +req.params.addressId,
                };
                const response = yield address_service_1.AddressService.get(req.user, request);
                res.status(200).json({
                    data: response,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requests = req.body;
                requests.id = +req.params.addressId;
                requests.contact_id = +req.params.contactId;
                const response = yield address_service_1.AddressService.update(req.user, requests);
                res.status(200).json({
                    data: response,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static remove(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = {
                    contact_id: +req.params.contactId,
                    address_id: +req.params.addressId,
                };
                const response = yield address_service_1.AddressService.remove(req.user, request);
                res.status(200).json({
                    data: "OK",
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contact_id = +req.params.contactId;
                const response = yield address_service_1.AddressService.list(req.user, contact_id);
                res.status(200).json({
                    data: response,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.AddressController = AddressController;
