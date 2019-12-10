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
