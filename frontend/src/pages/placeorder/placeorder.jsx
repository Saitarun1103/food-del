import React, { useEffect } from 'react'
import './placeorder.css'
import { storecontext } from '../../context/storecontext';
import { use } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const placeorder = () => {

  const navigate = useNavigate();
  const {gettotalcartamount,token,food_list,cartitems,url} = React.useContext(storecontext);

  const [data,setData] = React.useState({
      firstName:"",
      lastName:"",
      email:"",
      street:"",
      city:"",
      state:"",
      zipcode:"",
      country:"",
      phone:""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

   const placeOrder = async (event) => {
    event.preventDefault();
  let orderitems = [];
  food_list.map((item)=>{
    if(cartitems[item._id]){
      let itemInfo = item;
      itemInfo["quantity"] = cartitems[item._id];
      orderitems.push(itemInfo);
    }
  })
    let orderData = {
      address:data,
      items:orderitems,
      amount:gettotalcartamount()+2
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
       if(response.data.success){
        const {session_url} = response.data;
        window.location.replace(session_url);
       }
       else{
        alert("Order placement failed. Please try again.");
       }
   }

      useEffect(()=>{
        if(!token){
          navigate('/cart');
        }else if(gettotalcartamount()===0){
          navigate('/cart');
        }
      }, [token]);


  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery information</p>
        <div className="multi-fields">
          <input required name='firstName'  onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name'  />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name'  />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder='Email adderss' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City'  />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State'  />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code'  />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country'  />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone}  type="text" placeholder='Phone number'  />
      </div>
      <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>subtotal</p>
                <p>${gettotalcartamount()}</p>
              </div>
              <div className="cart-total-details">
                <p>Delivery fee</p>
                <p>${gettotalcartamount()===0?0:2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${gettotalcartamount()===0?0:gettotalcartamount()+2}</b>
              </div>
            </div>
            <button type='submit' >PROCEED TO PAYMENT</button>
          </div>
      </div>
    </form>
  )
}

export default placeorder
