import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Badge from  'react-bootstrap/Badge';
import Modal from '../Model';
import Cart from '../screen/cart';
import { useCart } from './contentReducer';

function Navbar() {
  let data = useCart();
const [cartview,setCartView] = useState(false)
   const navigate = useNavigate();
  const handlogout = ()=>{
    localStorage.removeItem("authToken")
    navigate("/login")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg  navbar-dark bg-success" >
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic" to="/">gofood</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNavaltMarkup" aria-controls="navbarNavaltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavaltMarkup">
      <ul className="navbar-nav ">
      <Link className="nav-link active fs-5 " aria-current="page" to="/">Home</Link>
        {(localStorage.getItem("authToken"))?
         <Link className="nav-link active fs-5 " aria-current="page" to="/myOrder">My Order</Link>
        :""}
      </ul>
    </div>
    {(!localStorage.getItem("authToken"))?
     <div className='d-flex'>
       <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
     <Link className="btn bg-white text-success mx-1" to="/creatuser">Signup</Link>
      </div>
    :
    <div>
    <div className='btn bg-white text-success mx-2' onClick={()=>{setCartView(true)}}>My Cart{" "}
     <Badge pill bg='danger'>{data.length}</Badge>
    </div>
    {cartview? <Modal onClose={()=>setCartView(false)}><Cart></Cart></Modal>:null}
    <div className='btn bg-white text-danger mx-2' onClick={handlogout}>
    Logout</div>
    </div>
 }

  </div>
</nav>
    </div>
  )
}

export default Navbar
