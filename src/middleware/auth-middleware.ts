import { NextFunction, Request, Response } from "express";
import { error, log } from "winston";
import { prismaClient } from "../application/database";
import { UserRequest } from "../type/user-request";
import { logger } from "../application/logging";

export const authMiddleware = async (req:UserRequest, res:Response, next:NextFunction) => {
    const token = req.get('X-API-TOKEN')

    if (token) {
        const user = await prismaClient.user.findFirst({
            where: { token }
        })

        if (user) {
            req.user = user
            next()
            return
        }
    }
    

    res.status(401).json({
        errors : 'Unauthorized'
    }).end()


}