import usermodel from "../models/usermodel.js";

// Add to Cart
const addToCart = async (req, res) => {
    try {
        const userId = req.userId || req.body.userId;
        let userdata = await usermodel.findById(userId);
        let cartData = await userdata.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }
        await usermodel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to add to cart" });
    }
}

// Remove from Cart
const removeFromCart = async (req, res) => {
    try {
        const userId = req.userId || req.body.userId;
        let userdata = await usermodel.findById(userId);
        let cartData = await userdata.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await usermodel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Removed from cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to remove from cart" });
    }
}

// fetch user Cart
const getCart = async (req, res) => {
    try {
        const userId = req.userId || req.body.userId;
        let userdata = await usermodel.findById(userId);
        let cartData = await userdata.cartData;
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to fetch cart" });

    }
}

export { addToCart, removeFromCart, getCart }