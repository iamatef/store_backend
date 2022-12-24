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
const orders_1 = __importDefault(require("../models/orders"));
const ordersC = new orders_1.default();
const listUserOrdersByUserID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //grab user ID
    const { id } = req.params;
    //grab all orders for current user id
    try {
        const products = yield ordersC.indexByUser(parseInt(id));
        res.json(products);
    }
    catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
});
const listUserOrdersByUserIDComplete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //grab user ID
    const { id } = req.params;
    //grab all orders for current user id
    try {
        const products = yield ordersC.indexCompletedByUser(parseInt(id));
        res.json(products);
    }
    catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
});
const createNewOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.body;
    try {
        const products = yield ordersC.create(parseInt(user_id));
        res.json(products);
    }
    catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
});
const addProductToOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { product_id, quantity } = req.body;
    try {
        const products = yield ordersC.addProduct(parseInt(id), parseInt(product_id), parseInt(quantity));
        res.json(products);
    }
    catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
});
const CompleteAnOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const products = yield ordersC.completeOrder(parseInt(id));
        res.json(products);
    }
    catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
});
//showProductsOFANOrder
const showProductsOFANOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const products = yield ordersC.indexProductsForOrder(parseInt(id));
        res.json(products);
    }
    catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
});
exports.default = {
    listUserOrdersByUserID,
    listUserOrdersByUserIDComplete,
    createNewOrder,
    addProductToOrder,
    CompleteAnOrder,
    showProductsOFANOrder
};
