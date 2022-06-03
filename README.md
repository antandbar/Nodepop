# NodePop
--------------------------
## Server configuration and application deployment:

### Backend:
    - Service documentation: http://ec2-54-242-115-29.compute-1.amazonaws.com/api-docs  

    - Grid on server - ejs:
    http://ec2-54-242-115-29.compute-1.amazonaws.com

### Frontend:
    http://54.242.115.29

    - Credentials:
        user:user@example.com
        password:1234

---------------------------
* node version: 16.13.2

Init DB:

```sh
npm run initdb
```

* ATTENTION * This will erase all data from the DB and load the initial state.

## API methods

Documentation:

- /api-docs/

Examples GET /apiv1/login:

 - http://localhost:3000/apiv1/login

    {   
    "email": "user@example.com",  
    "password": 1234  
    } 

Examples GET /apiv1/ads:

Filters:
- http://localhost:3000/apiv1/ads/?name=bici&sale=true&tags=motor&minprice=50&maxprice=500

- http://localhost:3000/apiv1/ads?tags=computing&tags=sea

Pagination:
- http://localhost:3000/apiv1/ads/?skip=1&limit=1

Select fields:
- http://localhost:3000/apiv1/ads/?select= name -_id

Sort:
- http://localhost:3000/apiv1/ads/?sort=price 

Rules GET /apiv1/ads:
 - price or minprice,maxprice

Example POST /apiv1/ads:

 - http://localhost:3000/apiv1/ads

    {   
    "name": "motocicleta",
    "sale": true,
    "price": 600,
    "photo": "motocicleta.jpeg",
    "tags":  
        [  
        "lifestyle",
        "motor"  
        ]  
    }    

Example GET /apiv1/ads/taglist:

http://localhost:3000/apiv1/ads/tagslist

## API integration test

- npm run test:int

- npm run test:int:watch

## web

- /

Examples GET / :

Filters:
- http://localhost:3000/?name=bici&sale=true&tags=motor&minprice=50&maxprice=500

- http://localhost:3000/?tags=computing&tags=sea

Pagination:
- http://localhost:3000/?skip=1&limit=1

Sort:
- http://localhost:3000/?sort=price 

Rules:
 - price or minprice,maxprice