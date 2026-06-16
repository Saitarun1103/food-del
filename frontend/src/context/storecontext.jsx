//import { createContext } from "react";
import React, { use, useEffect, useState } from 'react';
import axios from 'axios';

export const storecontext = React.createContext(null);

const StorecontextProvider = (props) => {

    // use an object for cart items mapping id -> quantity
    const [cartitems, setcartitems] = React.useState({});
    const url = "https://food-del-backend-k155.onrender.com";
    const [token,settoken] = React.useState("");
    const [food_list,setfoodlist] = React.useState([]);

    const addTocart = async (itemId) => {
        if(!cartitems[itemId])  {
            setcartitems((prev)=>({...prev,[itemId]:1}));
        }
        else {
            setcartitems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        }
        if (token) {
            await axios.post( `${url}/api/cart/add`,{ itemId }, { headers: { token }});
        }
    }

    const removeFromcart = async (itemId) => {
        setcartitems((prev)=> ({...prev,[itemId]: prev[itemId]-1}));
         if (token) {
            await axios.post( `${url}/api/cart/remove`,{ itemId }, { headers: { token }});
        }
    }

    const gettotalcartamount = () => {
        let totalamount = 0;
        for (const itemId in cartitems) {
            const qty = cartitems[itemId];
            if (!qty || qty <= 0) continue;
            const iteminfo = food_list.find((product) => product._id === itemId);
            if (!iteminfo) continue;
            totalamount += iteminfo.price * qty;
        }
        return totalamount;
    }

    const fetchfoodlist = async () => {
        const response = await fetch(url+"/api/food/list");
        const data = await response.json();
        setfoodlist(data.data); // setfoodlist(response.data.data);
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get",{}, { headers: { token }});
        setcartitems(response.data.cartData);
    }

    useEffect(()=>{
        async function loaddata(){
           await fetchfoodlist();
             if(localStorage.getItem("token")){
                settoken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
              }
        }
        loaddata();
    },[])
   
    const contextvalue = {
        food_list,
        cartitems,
        setcartitems,
        addTocart,
        removeFromcart,
        gettotalcartamount,
        url,
        token,
        settoken
    }

    return (
        <storecontext.Provider value={contextvalue}>
            {props.children}
        </storecontext.Provider>
    )

}

export default StorecontextProvider;


