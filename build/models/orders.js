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
class Orders {
    //index all
    indexByUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `Select * from orders where user_id='${user_id}'`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Can not index with err ${error} `);
            }
        });
    }
    //index complte orders by use
    indexCompletedByUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `Select * from orders where user_id='${user_id}' and status='complete'`;
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
                const sql = `Select * from orders where id = ${id} `;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not find  with this id. Err ${error} `);
            }
        });
    }
    //index order porducts
    indexProductsForOrder(order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `Select * from order_products inner join products on order_products.oid=products.id  where order_products.oid='${order_id}' `;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Can not index with err ${error} `);
            }
        });
    }
    //create a new order
    create(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `insert into orders (user_id,status ) values ('${user_id}', 'active') returning *`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not insert with this item. Err ${error} `);
            }
        });
    }
    //add a product to the order
    addProduct(orderID, productID, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `insert into order_products (oid,pid , quantity ) values ('${orderID}', '${productID}' , '${quantity}') returning *`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not insert with this item. Err ${error} `);
            }
        });
    }
    //complete  the order by changing the status to true
    completeOrder(orderID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `update orders set status='complete' where id=${orderID} returning *`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not insert with this item. Err ${error} `);
            }
        });
    }
}
exports.default = Orders;
