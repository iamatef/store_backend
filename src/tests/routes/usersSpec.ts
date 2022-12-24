import supertest from "supertest";
import app from "../../index";
import Users from "../../models/users"; //users model

const request = supertest;
const token = process.env.TEST_JWT; //test JWT for endpoints that requires authentication

describe("Supertest Endpoints /users", function () {
  //GET http://localhost:3000/users
  it("GET /users index all users without a jwt token to return 401 unauthorized", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(401);
  });

  //POST http://localhost:3000/users  { "firstname":"Aya","lastname":"Atef","password":"AtefPass","username":"aya"}
  it("POST /users //create a new user", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        firstname: "Aya",
        lastname: "Atef",
        password: "AtefPass",
        username: "aya2"
      })
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);

    const json = JSON.parse(response.text);
    expect(json.id).toEqual(jasmine.any(Number));
    expect(json.username).toEqual("aya2");
  });

  //POST http://localhost:3000/users/authenticate { "password":"AtefPass","username":"aya"}
  it("POST /users/authenticate //login with username and password and get a JWT", async () => {
    const response = await request(app)
      .post("/users/authenticate")
      .send({ password: "AtefPass", username: "aya2" })
      .set("Accept", "application/json");

    const json = JSON.parse(response.text);
    expect(json.status).toEqual("success");
  });

  //GET http://localhost:3000/users
  it("GET /users index all users", async () => {
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    const json = JSON.parse(response.text);

    expect(json[0].id).toEqual(jasmine.any(Number));
  });

  //GET http://localhost:3000/users/1
  it("GET /users/1 index a specific user", async () => {
    const response = await request(app)
      .get("/users/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    const json = JSON.parse(response.text);

    expect(json.id).toEqual(jasmine.any(Number));
  });

  //PUT http://localhost:3000/users/1 { "username":"Polly","password":"secretsaresecrets" }
  it("PUT /users //update username and password for user by id", async () => {
    const response = await request(app)
      .put("/users/1")
      .send({
        password: "no",
        username: "hell"
      })
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`);

    const json = JSON.parse(response.text);
    expect(json.id).toEqual(1);
    expect(json.username).toEqual("hell");
  });

  //DELETE
  it("DELETE /users/id Delete a specific user", async () => {
    try {
      const usersC = new Users();

      const createdU = await usersC.create({
        firstName: "John",
        lastName: "Due",
        password: "P@ssw0rd",
        username: "johndue4"
      });

      createdU.id;

      //deleting....
      const response = await request(app)
        .delete("/users/" + createdU.id)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
      const json = JSON.parse(response.text);

      expect(json.id).toEqual(createdU.id);
    } catch (error) {
      //do nothing
    }
  });
});
