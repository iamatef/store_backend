import Products from "../../models/products"; //products model

describe("Testing Products model", async function () {
  //Instanticate Products class
  const productsC = new Products();

  it("Check if index method  exists and is defined", async () => {
    expect(productsC.index).toBeDefined;
  });

  it("Add a new product and Check if returned ID is a numeric value", async () => {
    //create our first product
    const createdProduct = await productsC.create({
      name: "Tea",
      price: 12,
      category: 1
    });
    expect(createdProduct.id).toEqual(jasmine.any(Number));
  });

  it("index products method to return an array of products and first product ID is numeric", async () => {
    const productList = await productsC.index();
    expect(productList[0].id).toEqual(jasmine.any(Number));
  });

  it("show product method to return a procut and product ID is numeric", async () => {
    const productRet = await productsC.show(1);
    expect(productRet.id).toEqual(jasmine.any(Number));
  });

  //update { "name":"Four Cheese Pizza","price":90,"category":"1"}
  it("Update product values by id", async () => {
    //create our first product
    const createdProduct = await productsC.update("1", {
      name: "Green Tea",
      price: 19,
      category: 1
    });
    expect(createdProduct.price).toEqual(19);
  });

  //indexTop5
  it("index top 5 products method to return an array of products", async () => {
    const productList = await productsC.indexTop5();
    expect(productList).toEqual(jasmine.any(Array));
  });

  //indexByCat
  it("index products by category method to return an array of products", async () => {
    const productList = await productsC.indexByCat(1);
    expect(productList[0].id).toEqual(jasmine.any(Number));
  });

  //indexCategories
  it("index all products categories method to return an array of categories", async () => {
    const catsList = await productsC.indexCategories();
    expect(catsList[0].id).toEqual(jasmine.any(Number));
  });

  //delete
  it("Delete product by id", async () => {
    //create another product to delete
    const createdProduct2 = await productsC.create({
      name: "Tea bags",
      price: 12,
      category: 1
    });
    expect(createdProduct2.id).toEqual(jasmine.any(Number));

    //delete this created product
    const deletedProduct = await productsC.delete(createdProduct2.id as number);
    expect(deletedProduct.id).toEqual(createdProduct2.id);
  });
});
