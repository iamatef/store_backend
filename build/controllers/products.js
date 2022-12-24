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
const products_1 = __importDefault(require("../models/products"));
const BackEndStoreProductsC = new products_1.default();
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //grab all products for sending
    try {
        const products = yield BackEndStoreProductsC.index();
        res.json(products);
    }
    catch (error) {
        res.status(404).send(error);
    }
});
const listTopProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //grab all products for sending
    try {
        const products = yield BackEndStoreProductsC.indexTop5();
        res.json(products);
    }
    catch (error) {
        res.status(404).send(error);
    }
});
const showProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //grab product ID
    const { id } = req.params;
    //grab all products for sending
    try {
        const products = yield BackEndStoreProductsC.show(parseInt(id));
        res.json(products);
    }
    catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
});
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, category } = req.body;
        const products = yield BackEndStoreProductsC.create({
            name,
            price,
            category
        });
        res.json(products);
    }
    catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
});
//updateProduct
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, price, category } = req.body;
        const products = yield BackEndStoreProductsC.update(id, {
            name,
            price,
            category
        });
        res.json(products);
    }
    catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
});
//deleteProduct
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const products = yield BackEndStoreProductsC.delete(parseInt(id));
        res.json(products);
    }
    catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
});
const listCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //grab all products for sending
    try {
        const products = yield BackEndStoreProductsC.indexCategories();
        res.json(products);
    }
    catch (error) {
        res.status(404).send(error);
    }
});
const listProductsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //grab all products for sending
    try {
        const { id } = req.params;
        const products = yield BackEndStoreProductsC.indexByCat(parseInt(id));
        res.json(products);
    }
    catch (error) {
        res.status(404).send(error);
    }
});
exports.default = {
    list,
    showProduct,
    createProduct,
    listCategories,
    listProductsByCategory,
    listTopProducts,
    updateProduct,
    deleteProduct
};
