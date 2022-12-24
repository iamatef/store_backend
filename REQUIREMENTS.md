# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
GET http://localhost:3000/products //index of all products

- Show (args: product id) 
GET http://localhost:3000/products/1 //show a specific product by id

- Create (args: Product)[token required]

POST http://localhost:3000/products //create a new product
{ "name":"Cheese Lovers Pizza","price":70,"category":"1"}

result
{
    "id": 2,
    "name": "Cheese Lovers Pizza",
    "price": 70,
    "category": "1"
}

- Top 5 most popular products 

GET http://localhost:3000/products/top // top 5 selling products

- Products by category (args: product category) 

GET http://localhost:3000/products/category/1 //products of a specific category

- Update product 

PUT http://localhost:3000/products/1 { "name":"Four Cheese Pizza","price":90,"category":"1"}

- Delete product

DELETE http://localhost:3000/products/1

- Index Categories 

GET http://localhost:3000/products/categories //list of all categories




#### Users
- Index [token required]

GET http://localhost:3000/users

- Show (args: id)[token required]

GET http://localhost:3000/users/1

- Create (args: User)[token required]

POST http://localhost:3000/users  { "firstname":"Aya","lastname":"Atef","password":"AtefPass","username":"aya"}

- Authenticate a user and get a JWT

POST http://localhost:3000/users/authenticate { "password":"AtefPass","username":"aya"}

- Delete a specicif user by id 

DELETE http://localhost:3000/users/3

- Update a specific user username and password by id

PUT http://localhost:3000/users/1 { "username":"Polly","password":"secretsaresecrets" }

#### Orders
- Current Order by user (args: user id)[token required]

GET http://localhost:3000/orders/user/1 //user orders

- Completed Orders by user (args: user id)[token required]

GET http://localhost:3000/orders/user/1/complete //user completed order

- Create a new order

POST http://localhost:3000/orders { "user_id": "1"  } //create an order 

result
{
    "id": 1,
    "user_id": "1",
    "status": "active"
}

- add a product to an order

POST http://localhost:3000/orders/1 {"product_id" : "1" , "quantity": 5} //add a product to the created order

result
{
    "oid": "1",
    "pid": "1",
    "quantity": 5
}

- complete an order and set its status to complete


POST http://localhost:3000/orders/1/close
result
{
    "id": 1,
    "user_id": "1",
    "status": "complete"
}
 
- display a specific order porducts

GET http://localhost:3000/orders/1

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

  



 


 
