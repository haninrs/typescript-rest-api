import { Address } from "@prisma/client"
import e from "express"

// create address
export type CreateAddressRequest = {
    contact_id: number,
    street?: string,
    city?: string,
    province?: string,
    country: string,
    postal_code: string
}

// update address
export type UpdateAddressRequest = {
    id: number
    contact_id: number,
    street?: string,
    city?: string,
    province?: string,
    country: string,
    postal_code: string
}

// get address request
export type GetAddressRequest = {
    address_id:number,
    contact_id: number
}

// remove address request
export type RemoveAddressRequest = GetAddressRequest

// response 
export type AddressResponse = {
    id: number,
    street?: string | null,
    city?: string | null,
    province?: string | null,
    country: string,
    postal_code: string
}

export function toAddressResponse(address:Address): AddressResponse {
    return {
        id: address.id,
        street: address.street,
        city: address.city,
        province: address.province,
        country: address.country,
        postal_code: address.postal_code
    }
}