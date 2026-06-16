import React, { useContext, useState } from 'react'
import './loginpopup.css'
import { assets } from '../../assets/assets';
import { storecontext } from '../../context/storecontext';
import axios from 'axios';

const Loginpopup = ({setshowlogin}) => {

    const {url , settoken} = useContext(storecontext);

    const [currState, setcurrState] = useState("login");
    const [data,setdata] = useState({
        name:"",
        email:"",
        password:""
    })

    const onchangehandler = (event)=>{
       const name = event.target.name;
       const value = event.target.value;
       setdata(data=>({...data,[name]:value}))
    }

    const onlogin = async (event)=>{
        event.preventDefault()
        let newurl = url;
        if(currState==="login") {
            newurl+="/api/user/login";
        }
        else {
            newurl+="/api/user/register";
        }

        const response = await axios.post(newurl,data);

       // const success = response.data.success ?? response.data.succes;
        if (response.data.success){
            settoken(response.data.token);
            localStorage.setItem("token",response.data.token)
            setshowlogin(false)
        }
        else{
          alert(response.data.message )
        }

    }

   

  return (
    <div className='login-popup'>
      <form onSubmit={onlogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState === "login" ? "sign in" : "sign up"}</h2>
            <img onClick={()=>setshowlogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
             {currState === "login" ? null : <input name='name' onChange={onchangehandler} value={data.name} type="text" placeholder='your name' required />}
            <input name='email' onChange={onchangehandler} value={data.email} type="email" placeholder='your email' required />
            <input name='password' onChange={onchangehandler} value={data.password} type="password" placeholder='password' required />
        </div>
        <button type='submit'> {currState === "signup" ? "create account" : "login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p> By countinuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "login"
        ? <p>create a new account? <span onClick={()=>setcurrState("signup")}>click here</span></p>
        : <p>Already have an account? <span onClick={()=>setcurrState("login")}>login here</span></p>
      }  
     </form>
    </div>
  )
}

export default Loginpopup
