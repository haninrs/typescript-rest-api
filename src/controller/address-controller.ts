import { json, NextFunction, Response } from "express";
import { UserRequest } from "../type/user-request";
import { CreateAddressRequest, GetAddressRequest, RemoveAddressRequest, UpdateAddressRequest } from "../model/address-model";
import { AddressService } from "../service/address-service";

export class AddressController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateAddressRequest = req.body as CreateAddressRequest;
      request.contact_id = +req.params.contactId;
      const response = await AddressService.create(req.user!, request);
      console.log("response : " + JSON.stringify(response));

      res.status(201).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: GetAddressRequest = {
        contact_id: +req.params.contactId,
        address_id: +req.params.addressId,
      };
      const response = await AddressService.get(req.user!, request);

      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const requests: UpdateAddressRequest = req.body as UpdateAddressRequest;
      requests.id = +req.params.addressId;
      requests.contact_id = +req.params.contactId;

      const response = await AddressService.update(req.user!, requests);

      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async remove(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: RemoveAddressRequest = {
        contact_id: +req.params.contactId,
        address_id: +req.params.addressId,
      };
      const response = await AddressService.remove(req.user!, request);

      res.status(200).json({
        data: "OK",
      });
    } catch (e) {
      next(e);
    }
  }

  static async list(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const contact_id = +req.params.contactId;
      const response = await AddressService.list(req.user!, contact_id);
      
      res.status(200).json({
        data: response,
      })
    } catch (e) {
      next(e);
    }
  }
}
