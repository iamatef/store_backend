"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Users {
    //index all
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "Select id,firstname,lastname from users";
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Can not index with err ${error} `);
            }
        });
    }
    //get a single item
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `Select id, firstname,lastname,username  from users where id = ${id} `;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not find  with this id. Err ${error} `);
            }
        });
    }
    //create
    create(w) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //hash password
                const hash = bcrypt_1.default.hashSync(w.password + process.env.PEPPER, parseInt(process.env.SALT_ROUNDS));
                const conn = yield database_1.default.connect();
                const sql = `insert into users (firstName,lastName,password,username) values ('${w.firstName}','${w.lastName}','${hash}' , '${w.username}') returning *`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not insert with this item. Err ${error} `);
            }
        });
    }
    //delete
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `delete from users where id = '${id}' returning *`;
                const result = yield conn.query(sql);
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not delete user with id ${id}. Err: ${error}`);
            }
        });
    }
    //update
    update(id, newUsername, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //hash new password
                const hash = bcrypt_1.default.hashSync(newPassword + process.env.PEPPER, parseInt(process.env.SALT_ROUNDS));
                const conn = yield database_1.default.connect();
                const sql = `update users set username = '${newUsername}', password = '${hash}' where id = '${id}' returning *`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not update user with id ${id}. Err: ${error}`);
            }
        });
    }
    //authenticate user and return a JWT if success
    authenticate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //get the user to find the hash
                const conn = yield database_1.default.connect();
                const sql = `Select * from users where username='${username}'`;
                const result = yield conn.query(sql);
                const user = result.rows[0];
                const hash = user.password;
                conn.release();
                if (bcrypt_1.default.compareSync(password + process.env.PEPPER, hash)) {
                    const token = jsonwebtoken_1.default.sign({
                        user: {
                            id: user.id,
                            username: user.username,
                            firstname: user.firstname,
                            lastname: user.lastname
                        }
                    }, process.env.TOKEN_SECRET);
                    return { status: "success", data: token };
                }
                else {
                    return { status: "error", data: "login info are not correct" };
                }
            }
            catch (error) {
                throw new Error(`Could not insert with this item. Err ${error} `);
            }
        });
    }
}
exports.default = Users;
