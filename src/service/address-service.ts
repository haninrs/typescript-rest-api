import { User } from "@prisma/client";
import { AddressResponse, CreateAddressRequest, GetAddressRequest, RemoveAddressRequest, toAddressResponse, UpdateAddressRequest } from "../model/address-model";
import { Validation } from "../validation/validation";
import { AddressValidation } from "../validation/address-validation";
import { prismaClient } from "../application/database";
import { ContactService } from "./contact-service";
import { ResponseError } from "../error/response-error";

export class AddressService {
  static async create(user: User, request: CreateAddressRequest): Promise<AddressResponse> {
    const createRequest = Validation.validate(AddressValidation.CREATE, request);
    await ContactService.checkContactMustExist(user.username, request.contact_id);

    const address = await prismaClient.address.create({
      data: createRequest,
    });
    console.log("CREATE CONTACT REQ : " + JSON.stringify(createRequest));

    return toAddressResponse(address);
  }

  static async checkAddressIsMustExist(addressId: number, contactId: number) {
    const address = await prismaClient.address.findFirst({
      where: {
        id: addressId,
        contact_id: contactId,
      },
    });

    if (!address) throw new ResponseError(404, "Address is not found");

    return address;
  }

  static async get(user: User, request: GetAddressRequest): Promise<AddressResponse> {
    const getRequest = Validation.validate(AddressValidation.GET, request);
    await ContactService.checkContactMustExist(user.username, request.contact_id);
    const address = await this.checkAddressIsMustExist(getRequest.address_id, getRequest.contact_id);

    return toAddressResponse(address);
  }

  static async update(user: User, request: UpdateAddressRequest): Promise<AddressResponse> {
    const updateRequest = Validation.validate(AddressValidation.UPDATE, request);
    await ContactService.checkContactMustExist(user.username, request.contact_id);
    await this.checkAddressIsMustExist(updateRequest.id, updateRequest.contact_id)

    const result = await prismaClient.address.update({
      data: updateRequest,
      where: {
        id: updateRequest.id,
      },
    });

    return toAddressResponse(result);
  }

  static async remove(user: User, request: RemoveAddressRequest): Promise<AddressResponse> {
    const removeRequest = Validation.validate(AddressValidation.REMOVE, request)
    await ContactService.checkContactMustExist(user.username, request.contact_id);
    await this.checkAddressIsMustExist(removeRequest.address_id, removeRequest.contact_id);

    const result = await prismaClient.address.delete({
      where: {
        id: removeRequest.address_id,
        contact: {
          username: user.username,
        },
      },
    });

    return toAddressResponse(result);
  }

  static async list(user: User, contactId: number): Promise<AddressResponse[]> {
    await ContactService.checkContactMustExist(user.username, contactId);

    const addresses = await prismaClient.address.findMany({
        where : {
            contact_id: contactId
        }
    })

    return addresses.map(address => toAddressResponse(address));
  }
}
