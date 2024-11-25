
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min';
import '../node_modules/font-awesome/css/font-awesome.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Topbar from './Components/Topbar/Topbar';
import Home from './Components/Home/Home';
import UserContext from './Context/Context';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cart from './Components/Cart/Cart';
import { Toaster } from 'react-hot-toast';

function App() {
  const [isList,setIsList] = useState(false)
  const [cartList,setCartList] = useState([])

  const getCartList = ()=>{
    axios.get('https://670ce40a7e5a228ec1d1c69e.mockapi.io/cart').then((res)=>{
      setCartList(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
useEffect(()=>{
  getCartList()
},[isList])

console.log(cartList)

  return (
    <>
    <BrowserRouter>
    <UserContext.Provider value={cartList}>
    <Topbar/>
    <Routes>
      <Route path='/' element={<Home isList={isList} setIsList={setIsList}/>}/>
      <Route path='/cart' element={<Cart isList={isList} setIsList={setIsList}/>}/>
    </Routes>
    <Toaster/>
    </UserContext.Provider>
    </BrowserRouter>
    </>

  );
}

export default App;
