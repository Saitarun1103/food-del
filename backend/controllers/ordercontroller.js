import Ordermodel from "../models/ordermodel.js";
import usermodel from "../models/usermodel.js";
import Stripe from "stripe";
import mongoose from "mongoose";

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// placing user order for frontend
const placeOrder = async (req, res) => {

    const frontend_Url = "http://localhost:5174"; // Replace with your frontend URL

    try {
        const neworder = new Ordermodel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })
        await neworder.save();

        // Clear user's cart after placing order
        await usermodel.findByIdAndUpdate(req.body.userId, { cartData: {} });

       const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100*80, // Convert to paise
            },
            quantity: item.quantity,
            
       })) 

       line_items.push({
          price_data: {
            currency: 'inr',
            product_data: {
                name: "Delivery Charges",
            },
            unit_amount: 2 * 100*80, // 50 rupees in paise
          },
          quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${frontend_Url}/verify?success=true&orderId=${neworder._id}&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${frontend_Url}/verify?success=false&orderId=${neworder._id}`,
        });
    
        res.json({ success: true, session_url: session.url, sessionId: session.id });

    } catch (error) {  
        console.log(error);
        res.json({success:false,message:"Error placing order"});

    }
}    

const verifyOrder = async (req,res) => {
    const {orderId, success   } = req.body;

    try {
        if(success== "true"){
            await Ordermodel.findByIdAndUpdate(orderId, { payment:true });
            res.json({ success: true, message: "paid" });
        }
        else{
            await Ordermodel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "not paid" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error verifying order" });
    }
    
}

// user orders for frontend
const userOrders = async (req,res) => {
    try {
        const orders = await Ordermodel.find({ userId: req.body.userId });
        res.json({ success: true, data:orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching orders" });
    }
}

// listing orders for admin panel
const listOrders = async (req,res) => {
    try {
        const orders = await Ordermodel.find({});
        res.json({ success: true, data:orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching orders" });
    }

}
// updating order status for admin panel

const updateStatus = async (req,res) => {
    try {
        
        await Ordermodel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: " status updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating order status" });
    }
}

export { placeOrder, verifyOrder, userOrders , listOrders, updateStatus};