import React, { useContext, useState } from "react";
import UserContext from "../../Context/Context";
import { truncate } from "lodash";
import '../Cart/cart.css'
import axios from "axios";
import toast from "react-hot-toast";
import {Modal, ModalBody, ModalHeader } from "reactstrap";
import { useNavigate } from "react-router-dom";
function Cart({isList,setIsList}) {
  const [isCheckOut,setIsCheckOut] = useState(false)
  const navigate=useNavigate()

  const cartData = useContext(UserContext);
  console.log(cartData);

const removeCart=(cartId)=>{
  axios.delete(`https://670ce40a7e5a228ec1d1c69e.mockapi.io/cart/${cartId}`).then((res)=>{
    toast.success('Item removed from cart')
    setIsList(!isList)
  }).catch((err)=>{
    console.log(err)
  })
}

const handleCheckOut=()=>{
  setIsCheckOut(!isCheckOut)
}

const payCard =()=>{
  cartData.forEach((item)=>{
    axios.delete(`https://670ce40a7e5a228ec1d1c69e.mockapi.io/cart/${item.id}`).then((res)=>{
      console.log(res)
      setIsList(!isList)
    }).catch((err)=>{
      console.log(err)
    })
  })
  toast.success('Order placed successfully')
  setIsCheckOut(!isCheckOut)
  navigate('/')
  
}


  return (
    <div className="container">
      <div className="row">
        {cartData.map((item) => {
          return (
            <div class="col-12">
              <div class="card my-4 cart-shad m-auto " style={{ width: "75%" }}>
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    src={item.image}
                    class="card-img-top mt-2"
                    alt="..."
                    style={{ width: "25%" }}
                  />
                </div>
                <div class="card-body">
                  <h5 class="card-title">{item.name}</h5>
                  <div className="d-flex ">
                    <h6 class="card-title">₹{item.price}</h6>
                    <h6 class="card-title text-decoration-line-through text-muted mx-3">
                      ₹{item.offerprice}
                    </h6>
                    <h6 className="text-success fw-bold">{item.discount}%</h6>
                  </div>
                  <p class="card-text ">
                    {truncate(item.description, { length: 90 })}
                  </p>
                  <div className="text-end">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => removeCart(item.id)}
                    >
                      Remove From Cart{" "}
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className=" d-flex justify-content-end">
        <h3>
          Total Price:₹
          {cartData.reduce((acc, curr) => acc + Number(curr.price), 0)}
        </h3>
      </div>
      <div className="text-center mb-3">
        <button
          className="btn btn-outline-success btn-lg"
          onClick={() => handleCheckOut()}
        >
          Check out
        </button>
      </div>
      <Modal
        isOpen={isCheckOut}
        toggle={() => setIsCheckOut(!isCheckOut)}
        size="lg"
      >
        <ModalHeader toggle={() => setIsCheckOut(!isCheckOut)}>
          Checkout
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-6">
                <div class="mb-3">
                  <label class="form-label">Full Name</label>
                  <input type="text" class="form-control" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Email address</label>
                  <input type="email" class="form-control" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Address</label>
                  <textarea rows={5} cols={10} class="form-control"></textarea>
                </div>
                <div class="mb-3">
                  <label class="form-label">Mobile No</label>
                  <input type="number" class="form-control" />
                </div>
              </div>
              <div className="col-6">
                <div className="row cart-shad pb-3">
                  <div className="col-12 mt-4">
                    <input className="form-control" placeholder="Card Number" />
                  </div>
                  <div className="col-6 mt-3">
                    <input className="form-control" placeholder="Expiry date" />
                  </div>
                  <div className="col-6 mt-3">
                    <input className="form-control" placeholder="CVV" />
                  </div>
                  
                </div>
                <div className="cart-shad p-2 mt-3">
                    <div>
                      <h3>
                        Total Price:₹
                        {cartData.reduce(
                          (acc, curr) => acc + Number(curr.price),
                          0
                        )}
                      </h3>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <button className="btn btn-outline-success" onClick={()=>payCard()}>Pay Now</button>
                  </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Cart;
