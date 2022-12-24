import client from "../database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//define type for TS
export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
  username: string;
};

export type AuthResponse = {
  status: string;
  data: string;
};

export default class Users {
  //index all
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = "Select id,firstname,lastname from users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Can not index with err ${error} `);
    }
  }

  //get a single item
  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = `Select id, firstname,lastname,username  from users where id = ${id} `;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find  with this id. Err ${error} `);
    }
  }

  //create
  async create(w: User): Promise<User> {
    try {
      //hash password

      const hash = bcrypt.hashSync(
        w.password + (process.env.PEPPER as string),
        parseInt(process.env.SALT_ROUNDS as string)
      );

      const conn = await client.connect();
      const sql = `insert into users (firstName,lastName,password,username) values ('${w.firstName}','${w.lastName}','${hash}' , '${w.username}') returning *`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not insert with this item. Err ${error} `);
    }
  }

  //delete
  async delete(id: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = `delete from users where id = '${id}' returning *`;
      const result = await conn.query(sql);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not delete user with id ${id}. Err: ${error}`);
    }
  }

  //update
  async update(
    id: string,
    newUsername: string,
    newPassword: string
  ): Promise<User> {
    try {
      //hash new password
      const hash = bcrypt.hashSync(
        newPassword + (process.env.PEPPER as string),
        parseInt(process.env.SALT_ROUNDS as string)
      );

      const conn = await client.connect();
      const sql = `update users set username = '${newUsername}', password = '${hash}' where id = '${id}' returning *`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not update user with id ${id}. Err: ${error}`);
    }
  }

  //authenticate user and return a JWT if success
  async authenticate(
    username: string,
    password: string
  ): Promise<AuthResponse> {
    try {
      //get the user to find the hash
      const conn = await client.connect();
      const sql = `Select * from users where username='${username}'`;
      const result = await conn.query(sql);
      const user = result.rows[0];
      const hash = user.password;

      conn.release();

      if (bcrypt.compareSync(password + process.env.PEPPER, hash)) {
        const token = jwt.sign(
          {
            user: {
              id: user.id,
              username: user.username,
              firstname: user.firstname,
              lastname: user.lastname
            }
          },
          process.env.TOKEN_SECRET as string
        );

        return { status: "success", data: token };
      } else {
        return { status: "error", data: "login info are not correct" };
      }
    } catch (error) {
      throw new Error(`Could not insert with this item. Err ${error} `);
    }
  }
}
