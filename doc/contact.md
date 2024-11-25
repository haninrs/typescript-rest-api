# Contact API Specification

## Create Contact

Endpoint: POST /api/contacts

Request Header :
- X-API-TOKEN : token

Request Body:

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "qgS2S@example.com",
  "phone": "0123456789"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "qgS2S@example.com",
    "phone": "0123456789"
  }
}
```

Response Body (Failed) :

```json
{
    "errors" : "Unauthorized, ..."
}
```

## Get Contact

Endpoint: GET /api/contacts/:id

Request Header :
- X-API-TOKEN : token


Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "qgS2S@example.com",
    "phone": "0123456789"
  }
}
```

Response Body (Failed) :

```json
{
    "errors" : "Contact not found, ..."
}
```

## Update Contact

Endpoint: PUT /api/contacts/:id

Request Header :
- X-API-TOKEN : token

Request Body:

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "qgS2S@example.com",
  "phone": "0123456789"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "qgS2S@example.com",
    "phone": "0123456789"
  }
}
```

Response Body (Failed) :

```json
{
    "errors" : "Unauthorized, ..."
}
```

## Remove Contact
Endpoint: DELETE /api/contacts/:id

Request Header :
- X-API-TOKEN : token


Response Body (Success) :

```json
{
  "data": "OK",
}
```

Response Body (Failed) :

```json
{
    "errors" : "Contact is not found, ..."
}
```

## Search Contact

Endpoint: GET /api/contacts

Query Parameter : 
- name : string, contact first name or last name, optional
- phone : string, contact phone, optional
- email : string, contact email, optional  
- page : number, default 1
- size : number, default 10  

Request Header :
- X-API-TOKEN : token


Response Body (Success) :

```json
{
  "data": [
    {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "qgS2S@example.com",
    "phone": "0123456789"
  },
  {
    "id": 2,
    "first_name": "Doni",
    "last_name": "Bebek",
    "email": "donibebek@example.com",
    "phone": "0998776555"
  }
  ],
  "paging": {
      "current_page": 1,
      "total_page": 10,
      "size" : 10
  }
}
```

Response Body (Failed) :

```json
{
    "errors" : "Unauthorized, ..."
}
```