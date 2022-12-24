import express from "express";
import Users from "../models/users";

const usersC = new Users();

//index all users
const index = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  //grab all users
  try {
    const users = await usersC.index();
    res.json(users);
  } catch (error) {
    res.status(404).send(error);
  }
};

//indexByID
const indexByID = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  //grab all users
  try {
    const { id } = req.params;

    const users = await usersC.show(parseInt(id));
    res.json(users);
  } catch (error) {
    res.status(404).send(error);
  }
};

//createUser
const createUser = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  //create
  try {
    const { firstname, lastname, password, username } = req.body;

    const users = await usersC.create({
      firstName: firstname,
      lastName: lastname,
      password: password,
      username: username
    });
    res.json(users);
  } catch (error) {
    res.status(404).send(error);
  }
};

//deleteUser
const deleteUser = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  //create
  try {
    const { id } = req.params;
    const users = await usersC.delete(id as string);
    res.json(users);
  } catch (error) {
    res.status(404).send(error);
  }
};

//updateUser
const updateUser = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  //create
  try {
    const { id } = req.params;
    const { username, password } = req.body;
    const users = await usersC.update(id, username, password);
    res.json(users);
  } catch (error) {
    res.status(404).send(error);
  }
};

const authenticateUser = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  //create
  try {
    const { username, password } = req.body;

    const users = await usersC.authenticate(username, password);
    res.json(users);
  } catch (error) {
    res.status(404).send(error);
  }
};

export default {
  index,
  indexByID,
  createUser,
  authenticateUser,
  deleteUser,
  updateUser
};
