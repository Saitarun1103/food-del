import { deserialize } from "v8";
import foodmodel from "../models/foodmodel.js";
import fs from "fs";
import path from "path";


// add  food item

const addfood = async (req, res) => {

    // Check if file was uploaded
    // if (!req.file) {
    //     return res.status(400).json({success:false,message:"No image file provided"})
    // }

    let image_filename = `${req.file.filename}`;

    const food = new foodmodel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    });
    try{
        await food.save();
        res.json({success:true,message:"Food added successfully"})
    } catch(error){
       // console.log("Error saving food:", error.message);
        console.log(error);
        res.json({success:false,message:"Error adding food item", error: error.message})
    }

}

//  all food items
   const listfood = async (req, res) => {
    try {
        const food = await foodmodel.find({});
        res.json({success:true, data:food})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
   }
 //remove food item

 const removefood = async (req,res) =>{
    try{
        
        const food = await foodmodel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => {})

        await foodmodel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food item removed successfully"})
    } catch(error){
        console.log(error);
        res.json({success:false,message:"Error removing food item" })
    }
 }



export { addfood, listfood, removefood }


