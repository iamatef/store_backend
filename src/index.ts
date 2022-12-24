import express from "express"; //express import for building a server
import productsRouter from "./routes/products"; //prodcuts route
import ordersRouter from "./routes/orders"; //orders route
import usersRouter from "./routes/users"; //users route

//ini express
const app = express();
const port = 3000;

//support parsing JSON
app.use(express.json());

// /products endpoing
app.use("/products", productsRouter);

// /orders endpoing
app.use("/orders", ordersRouter);

// /users endpoing
app.use("/users", usersRouter);

//app listining to serve traffic
app.listen(port, (): void => {
  console.log(`Example app listening on port ${port}`);
});

//export app for unittesting endpoint supertest
export default app;
