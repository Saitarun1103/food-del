import mongoose from "mongoose";

export const connectDB = async () => {
        await mongoose.connect('mongodb+srv://tarunsai1103_db:tarunsai1103@cluster0.qdqjb2m.mongodb.net/food_del').then(()=>console.log("db connected"));
    }