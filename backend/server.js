import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodrouter from "./routes/foodroute.js"
import userRouter from "./routes/userroute.js";
import 'dotenv/config'
import cartrouter from "./routes/cartroute.js";
import orderrouter from "./routes/orderroute.js";


// app config
const app = express()
const port = process.env.PORT || 4000

// middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();

// api endpoints
app.use("/api/food",foodrouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartrouter) 
app.use("/api/order",orderrouter)

app.get("/",(req,res)=>{
    res.send("API working")
})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})

