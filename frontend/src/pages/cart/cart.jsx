import React from 'react'
import './cart.css'
import { storecontext } from '../../context/storecontext'
import { Navigate, useNavigate } from 'react-router-dom'


const Cart = () => {

  // storecontext provides `cartitems`, `food_list`, and `removeFromcart` (note exact casing)
  const { cartitems, food_list, removeFromcart , gettotalcartamount , url } = React.useContext(storecontext)

  // call the hook to get the navigate function
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {food_list.map((item,index) => {
             if ( cartitems[item._id] > 0) {
                return (
                  <div>
                    <div  className='cart-items-title  cart-items-item'>
                    <img src={url+"/images/"+item.image} alt="" />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartitems[item._id]}</p>
                    <p>${(item.price * cartitems[item._id])}</p>
                    <p onClick={()=>removeFromcart(item._id)} className='cross'>x</p>
                  </div>
                  <hr />
                  </div>
                )
             }
             return null
          })}
      </div>
      <div className="cart-bottom">
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
            <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If youu have a promo code, Enter it here</p>
              <div className="cart-poromocode-input">
                <input type="text" placeholder='promo code' />
                <button>submit</button>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Cart
