# User API Specification

## Register User

Endpoint: POST /api/users

Request Body:

```json
{
  "username": "haninrs",
  "password": "secret",
  "name": "Hani N"
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "haninrs",
    "name": "Hani N"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "username required"
}
```

## Login User

Endpoint: POST /api/users/login

Request Body:

```json
{
  "username": "haninrs",
  "password": "secret"
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "haninrs",
    "name": "Hani N",
    "token": "uuid"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "username or password wrong"
}
```

## Get User

Endpoint: GET /api/users/current

Request Header:

- X-API-TOKEN : token

Response Body (Success):

```json
{
  "data": {
    "username": "haninrs",
    "name": "Hani N"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "username required"
}
```

## Update User

Endpoint: PATCH /api/users/current

Request Header:

- X-API-TOKEN : token

Request Body:

```json
{
  "password": "secret", // optional
  "name": "Hani N" // optional
}
```

Response Body (Success):

```json
{
  "data": {
    "username": "haninrs",
    "name": "Hani N"
  }
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized"
}
```

## Logout User
Endpoint : DELETE /api/users/current

Request Header:

- X-API-TOKEN : token


Response Body (Success):

```json
{
  "data": "OK"
}
```

Response Body (Failed):

```json
{
  "errors": "Unauthorized"
}
```
