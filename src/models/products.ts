import client from "../database";

//define type for TS
export type Product = {
  id?: number;
  name: string;
  category: number;
  price: number;
};

export default class BackEndStoreProducts {
  //index all
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = "Select * from products";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Can not index with err ${error} `);
    }
  }

  //get a single item
  async show(id: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = `Select * from products where id = ${id} `;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find  with this id. Err ${error} `);
    }
  }

  //create
  async create(w: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = `insert into products (name,price,category) values ('${w.name}','${w.price}',${w.category}) returning *`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not insert with this item. Err ${error} `);
    }
  }

  //update
  async update(id: string, product: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = `update products set name='${product.name}', price='${product.price}', category='${product.category}' where id='${id}' returning *`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not update product with id ${id}. Err: ${error}`);
    }
  }

  //delete
  async delete(id: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = `delete from products where id = '${id}' returning *`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not delete product with id ${id}. Err: ${error}`);
    }
  }

  //top 5
  async indexTop5(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT p.id, p.name, count(o.pid) as total_ordered FROM products p JOIN order_products o ON p.id = o.pid GROUP BY p.id ORDER BY total_ordered DESC LIMIT 5";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Can not index with err ${error} `);
    }
  }

  //product by category id
  async indexByCat(c: number): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = `Select * from products where category = ${c}`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Can not index with err ${error} `);
    }
  }

  //index all categories for the products
  async indexCategories(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = "Select * from products_categories";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Can not index with err ${error} `);
    }
  }
}
