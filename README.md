# tutv-mock-api
Mock API for use in development of [TUTV](https://github.com/jumbocode/tutv).

This is a nonfunctional dummy API that will provide "fake" API responses appropriate for use
during front-end development.
<br/><br/>

### Table of Contents
1. [Endpoints](#1-endpoints)
    - [Listing equipment](#listing-equipment-apiv1equipment)
    - [Searching for equipment](#searching-for-equipment-apiv1equipmentsearch)
    - [Fetching user information](#fetching-user-information-apiv1user)
    - [Listing user requests](#listing-user-requests-apiv1userrequestsoverview)
    - [Fetching specific user requests](#fetching-specific-user-requests-apiv1userrequestsid)
2. [Authentication](#2-authentication)

## 1. Endpoints

### Listing equipment: `/api/v1/equipment/`
Lists all equipment in the inventory regardless of availability at a given time. Does not require authentication.

### Searching for equipment: `/api/v1/equipment/search`
Lists a subset of the equipment catalog, filtered by one or more search parameters. Does not require authentication. The search parameters accepted are as follows:

| parameter         | example usage                | description                                                                         |
| ----------------- | ---------------------------- | ----------------------------------------------------------------------------------- |
| q                 | `?q=Camera`                  | Searches the catalog for items that match a search term                             |
| startDate/endDate | `?startDate=123&endDate=456` | Restricts the number of available items by what is available in a given time range. |
| category          | `?category=microphone`       | Restricts the search results to items with a certain category ID                    |


##### Example request:
```http
GET /api/v1/equipment/search?q=XLR&startDate=123&endDate=456&category=microphone
```
##### Example response:
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

### Fetching user information: `/api/v1/user/`
Returns information about the authenticated user.


### Listing user requests: `/api/v1/user/requests/overview/`
Returns a summary of the authenticated user’s active requests.

##### Example request:
```http
GET /api/v1/user/requests/overview
```
##### Example respoonse:
```http
HTTP/1.1 200 OK
Connection: keep-alive
Content-Type: application/json; charset=utf-8
Date: Tue, 10 Dec 2019 22:43:40 GMT
X-Powered-By: Express

{
    "data": [
        {
            "start_date": "2019-12-14T19:08:04.186Z",
            "end_date": "2019-12-18T19:08:04.186Z",
            "name": "A Lover's Quarrel",
            "id": "t5ljqk",
            "equipment_count": 2
        },
        {
            "start_date": "2019-12-08T19:08:04.186Z",
            "end_date": "2019-12-11T19:08:04.186Z",
            "name": "Athena Project",
            "id": "s9eq6z",
            "equipment_count": 3
        },
        {
            "start_date": "2019-10-14T19:08:04.186Z",
            "name": "Bosfeed",
            "id": "lnj1e7",
            "equipment_count": 2
        }
    ]
}
```

### Fetching specific user requests: `/api/v1/user/requests/[id]`
Returns more detailed information about a specific user request.



## 2. Authentication
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
