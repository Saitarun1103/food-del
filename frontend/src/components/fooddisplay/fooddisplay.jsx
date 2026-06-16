import React from 'react'
import './fooddisplay.css'
import { storecontext } from '../../context/storecontext'
import Fooditem from '../fooditem/fooditem'

const Fooddisplay = ({category}) => {

    const {food_list} = React.useContext(storecontext)

  return (
    <div className='fooddisplay' id='fooddisplay'>
      <h2>Top dishes near you</h2>
      <div className="fooddisplay-list">
    {food_list.map((item,index)=>{
        if(category==="All" || category===item.category){
            return  <Fooditem key={index} id={item._id} name={item.name} price={item.price} description={item.description} image={item.image} />
        }
   })}
      </div>
    </div>
  )
}

export default Fooddisplay
