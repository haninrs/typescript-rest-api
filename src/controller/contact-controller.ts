import { NextFunction, Request, Response } from "express";
import { CreateContactRequest, SearchContactRequest, UpdateContactRequest } from "../model/contact-model";
import { ContactService } from "../service/contact-service";
import { UserRequest } from "../type/user-request";

export class ContactController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateContactRequest = req.body as CreateContactRequest
            const response = await ContactService.create(req.user!, request)

            res.status(201).json({
                data : response
            })
        } catch (e) {
            next(e)
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const contactId = +req.params.contactId
            const response = await ContactService.get(req.user!, contactId)

            res.status(200).json({
                data : response
            })

        } catch (e) {
            next(e)
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: UpdateContactRequest = req.body as UpdateContactRequest
            request.id = +req.params.contactId

            const response = await ContactService.update(req.user!, request)
            // console.log("response id: " + response.id);
            
            res.status(200).json({
                data : response
            })
        } catch (e) {
            next(e)
        }
    }

    static async remove(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const contactId = Number(req.params.contactId)
            const response = await ContactService.remove(req.user!, contactId)
            
            // console.log("response : " + JSON.stringify(response));
            
            res.status(200).json({
                data : "OK"
            })
        
        } catch (e) {
            next(e)
        }
    }

    static async search(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request : SearchContactRequest = {
                name : req.query.name as string,
                phone : req.query.phone as string,
                email : req.query.email as string,
                page : req.query.page ? Number(req.query.page) : 1,
                size : req.query.size ? Number(req.query.size) : 10,
            }
            const response = await ContactService.search(req.user!, request)
            
            console.log("response : " + JSON.stringify(response));
            
            res.status(200).json(response)
            
        } catch (e) {
            next(e)
        }
    }

}