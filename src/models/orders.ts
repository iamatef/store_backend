import client from "../database";
//  Create table users(id serial primary key, firstName varchar(200) , lastName varchar(200) , password varchar);
//define type for TS
export type Order = {
  id?: number;
  user_id: number;
  status?: string;
};

export type OrderProduct = {
  oid: number;
  pid: number;
  quantity: number;
};

export default class Orders {
  //index all
  async indexByUser(user_id: number): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = `Select * from orders where user_id='${user_id}'`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Can not index with err ${error} `);
    }
  }

  //index complte orders by use
  async indexCompletedByUser(user_id: number): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = `Select * from orders where user_id='${user_id}' and status='complete'`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Can not index with err ${error} `);
    }
  }

  //get a single item
  async show(id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = `Select * from orders where id = ${id} `;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find  with this id. Err ${error} `);
    }
  }

  //index order porducts
  async indexProductsForOrder(order_id: number): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = `Select * from order_products inner join products on order_products.oid=products.id  where order_products.oid='${order_id}' `;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Can not index with err ${error} `);
    }
  }

  //create a new order
  async create(user_id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = `insert into orders (user_id,status ) values ('${user_id}', 'active') returning *`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not insert with this item. Err ${error} `);
    }
  }

  //add a product to the order
  async addProduct(
    orderID: number,
    productID: number,
    quantity: number
  ): Promise<OrderProduct> {
    try {
      const conn = await client.connect();
      const sql = `insert into order_products (oid,pid , quantity ) values ('${orderID}', '${productID}' , '${quantity}') returning *`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not insert with this item. Err ${error} `);
    }
  }

  //complete  the order by changing the status to true
  async completeOrder(orderID: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = `update orders set status='complete' where id=${orderID} returning *`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not insert with this item. Err ${error} `);
    }
  }
}
