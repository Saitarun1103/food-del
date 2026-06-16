import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/home'
import Cart from './pages/cart/cart'
import PlaceOrder from './pages/placeorder/placeorder'
import Verify from './pages/verify/verify'
import MyOrders from './pages/myorders/myorders'
import Footer from './components/footer/footer'
import Loginpopup from './components/loginpopup/loginpopup'

const App = () => {

    const [showlogin, setshowlogin] = React.useState(false);

  return (
    <>
    {showlogin ? <Loginpopup setshowlogin={setshowlogin} /> : null}
    <div className='app'>
      <Navbar setshowlogin={setshowlogin} />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
      </Routes>
    </div>
    <Footer />
    </>
   
    
  )
}

export default App

