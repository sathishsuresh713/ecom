import React, { useContext } from 'react'
import '../Topbar/topbar.css'
import userContext from '../../Context/Context'
import { useNavigate } from 'react-router-dom'

function Topbar() {
  const navigate=useNavigate()
  const cartData=useContext(userContext)
  const onCart=()=>{
navigate('/cart')
  }
  return (
    <nav class="navbar bg-info navbar-expand-lg navbar-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Mens Wear</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Mobiles</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Shoes</a>
        </li>
        
      </ul>
    </div>
    <div className='d-flex' onClick={()=>onCart()}>
    <i class="fa fa-shopping-cart fa-2x" aria-hidden="true"></i>
    <div className='text-light'>
    {cartData.length}
    </div>
    </div>
  </div>
</nav>
  )
}

export default Topbar
