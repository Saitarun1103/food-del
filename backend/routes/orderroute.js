import express from "express";
import authmiddleware from "../middleware/auth.js";
import { placeOrder,verifyOrder,userOrders , listOrders, updateStatus } from "../controllers/ordercontroller.js";

const orderrouter = express.Router();

orderrouter.post("/place", authmiddleware, placeOrder);
orderrouter.post("/verify", verifyOrder);
orderrouter.post("/userorders", authmiddleware,userOrders);
orderrouter.get("/list",  listOrders);
orderrouter.post("/status", updateStatus);

export default orderrouter;