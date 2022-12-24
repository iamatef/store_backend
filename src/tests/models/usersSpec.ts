import Users from "../../models/users"; //users model

describe("Testing users model", async function () {
  //Instanticate users class
  const usersC = new Users();

  it("Check if index method on users class exists and is defined", async () => {
    expect(usersC.index).toBeDefined;
  });

  it("Add a new user and Check if returned ID is a numeric value", async () => {
    //create our first user
    const createdUser = await usersC.create({
      firstName: "Ahmed",
      lastName: "Rajeb",
      password: "Hamoksha",
      username: "ahmedrajeb2"
    });
    expect(createdUser.id).toEqual(jasmine.any(Number));

    //create second user to be deleted
    await usersC.create({
      firstName: "Ahmed",
      lastName: "Rajeb",
      password: "Hamoksha",
      username: "ahmedrajeb3"
    });
    expect(createdUser.id).toEqual(jasmine.any(Number));
  });

  it("index users method to return an array of users and first user ID is numeric", async () => {
    const userList = await usersC.index();
    expect(userList[0].id).toEqual(jasmine.any(Number));
  });

  it("show user method to return a user and user ID is numeric", async () => {
    const userRet = await usersC.show(1);
    expect(userRet.id).toEqual(jasmine.any(Number));
  });

  it("authenticate user method with correct credentials to return a status success and a JWT", async () => {
    const userRet = await usersC.authenticate("ahmedrajeb2", "Hamoksha");
    expect(userRet.status).toEqual("success");
  });

  //update username and password
  it("update user method to update username and password the user by id", async () => {
    const userRet = await usersC.update("2", "Johnny", "Manga");
    expect(userRet.username).toEqual("Johnny");
  });

  //delete
  it("delete user method to delete the user by id", async () => {
    const userRet = await usersC.delete("2");
    expect(userRet.id).toEqual(2);
  });
});
