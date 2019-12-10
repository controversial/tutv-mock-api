# tutv-mock-api
Mock API for use in development of https://github.com/jumbocode/tutv

This is a nonfunctional "dummy" API that will provide "fake" API responses appropriate for use
during front-end development.
<br/><br/>


# 1. Endpoints

## Listing equipment: `/api/v1/equipment/`
Lists all equipment in the inventory regardless of availability at a given time. Does not require authentication.
</br></br>

## Searching for equipment: `/api/v1/equipment/search`
Lists a subset of the equipment catalog, filtered by one or more search parameters. Does not require authentication. The search parameters accepted are as follows:

| parameter         | example usage                | description                                                                         |
| ----------------- | ---------------------------- | ----------------------------------------------------------------------------------- |
| q                 | `?q=Camera`                  | Searches the catalog for items that match a search term                             |
| startDate/endDate | `?startDate=123&endDate=456` | Restricts the number of available items by what is available in a given time range. |
| category          | `?category=microphone`       | Restricts the search results to items with a certain category ID                    |


#### Exmample request:
```http
GET /api/v1/equipment/search?q=XLR&startDate=123&endDate=456&category=microphone
```
#### Example response:
```http
HTTP/1.1 200 OK
Connection: keep-alive
Content-Type: application/json; charset=utf-8
Date: Tue, 10 Dec 2019 21:59:50 GMT
X-Powered-By: Express

{
    "data": [
        {
            "name": "XLR-XLR Cable (10ft)",
            "slug": "xlr-xlr-cable-10ft",
            "available_count": 1,
            "total_count": 4,
            "image": null
        },
        {
            "name": "XLR-XLR Cable (15ft)",
            "slug": "xlr-xlr-cable-15ft",
            "available_count": 2,
            "total_count": 2,
            "image": null
        }
    ]
}
```


# 2. Authentication
Some routes in the API require authentication. To make developing the front-end alongside this API easier, this mock API will return the correct data for all requests. However, requests to protected endpoints that are made without the proper credentials will return status `403` alongside the data requested, and add an error message to the response. This is designed to remind consumers of this API that the real API will require authentication, while avoiding slowing development.

To make an authenticated request, include an `Authorization` header with a valid [JSON Web Token](https://jwt.io/) (JWT).

```http
Accept: */*
Cache-Control: no-cache
Connection: keep-alive
Authorization: Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbl91c2VyIiwibmFtZSI6IkFkbWluIFVzZXIiLCJpYXQiOjE1NzYwMTA5Mzh9.2lqotAo24DOySIP8U0dNaxm_jB_-ATQQ2CwD6ZgNLzw
```

In the real app, JSON web tokens will be issued securely. However, for the purpose of this mock API, JSON web tokens can be obtained by the following two token endpoints:
- `/api/v1/token_obtain/user/` will return a JWT representing a normal user
- `/api/v1/token_obtain/admin/` will return a JWT for an admin user.

The JSON web tokens in this endpoint will allow use of this mock API's authenticated routes without encountering the `403 Forbidden` warning, and will last for 24 hours. After this time window, request a new token from the same endpoint in order to keep making authenticated requests.
