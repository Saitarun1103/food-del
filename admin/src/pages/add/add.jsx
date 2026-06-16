import React, { useState } from 'react'
import './add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const add = ({ url }) => {

      const [image,setimage] = React.useState(false);
      const[data,setdata] = React.useState({
        name:'',
        description:'',
        price:'',
        category:'salad'
      })

    const onchangeHandler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setdata (data=>({...data,[name]:value}))
    }

     const onsubmitHandler = async (event)=>{
        event.preventDefault();
            const formdata = new FormData();
            formdata.append('name',data.name);
            formdata.append('description',data.description);
            formdata.append('price',Number(data.price));
            formdata.append('category',data.category);
            formdata.append('image',image);
           const response = await axios.post(`${url}/api/food/add`,formdata);
           if(response.data.success){
               setdata({
                    name:'',
                    description:'',
                    price:'' ,
                    category:'salad'
                 });
                setimage(false);
                toast.success(response.data.message)
           }
           else{
                toast.error(response.data.message)
           }
     }

  return (
    <div className='add'>
      <form className="flex-col" onSubmit={onsubmitHandler}>
        <div className="add-img-upload flex-col">
            <p>upload image</p>
            <label htmlFor="image">
                <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
            </label>
            <input onChange={(e)=>setimage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
            <p>product name</p>
            <input onChange={onchangeHandler} name="name" value={data.name} type="text" placeholder='type name' />
        </div>
        
        <div className="add-product-description flex-col">
            <p>product description</p>
            <textarea onChange={onchangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
        </div>
        <div className="add-category-price">
            <div className="add-product-category flex-col">
                <p>product category</p>
                <select onChange={onchangeHandler} name="category" >
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Deserts">Deserts</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure veg">Pure veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option>
                </select>
            </div>
            <div className="add-price flex-col">
                <p>product price</p>
                <input onChange={onchangeHandler} value={data.price} type="number" name='price' placeholder='$20' />
            </div>
        </div>
       <button type="submit" className='add-btn'>ADD</button>
      </form>
    </div>
  )
}

export default add
