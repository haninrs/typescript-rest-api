import { Contact } from "@prisma/client";

//  create contact request model
export type CreateContactRequest = {
    first_name: string;
    last_name?: string;
    email?: string;
    phone?: string;
}

//  update contact request model
export type UpdateContactRequest = {
    id: number;
    first_name: string;
    last_name?: string;
    email?: string;
    phone?: string;
}

// Search contact request model
export type SearchContactRequest = {
    name?: string;
    phone?: string;
    email?: string;
    page: number;
    size: number;
}



// response
export type ContactResponse = {
    id: number;
    first_name: string;
    last_name?: string | null; //karna di prisma ? dan ? di prisma type | null jd tambahin null disini
    email?: string | null;
    phone?: string | null;
}


// function untuk mengkonversi model dr schema prisma jadi ContactResponse
export function toContactResponse(contact: Contact): ContactResponse {
    return {
        id: contact.id,
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email,
        phone: contact.phone
    }
}