/* Replace with your SQL commands */
Create table products_categories (id serial primary key, name varchar(150) );
insert into products_categories(name) values('Uncategorized');
Create table products(id serial primary key, name varchar(200) , price float , category bigint references products_categories(id)  );
Create table users(id serial primary key, firstName varchar(200) , lastName varchar(200) , password varchar, username varchar(100) unique );
create table orders (id serial primary key, user_id bigint references users(id) ,status varchar(10));
create table order_products(oid bigint references orders(id) , pid bigint references products(id) , quantity integer);