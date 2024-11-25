import React, { useEffect, useState } from 'react'
import '../Home/home.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import adimg1 from '../Home/Adimg/adimg1.webp'
import adimg2 from '../Home/Adimg/adimg2.webp'
import adimg3 from '../Home/Adimg/adimg3.webp'
import axios from 'axios';
import {truncate} from 'lodash'
import toast from 'react-hot-toast';


function Home({isList,setIsList}) {

  const [mobiles,setMobiles] = useState([])

const fetchMobiles = async()=>{
  await axios.get('https://670ce40a7e5a228ec1d1c69e.mockapi.io/mobiles').then((res)=>{
    if(res.status===200){
      setMobiles(res.data)
    }
  }).catch((err)=>{
    console.log(err)
  })
}



useEffect(()=>{
  fetchMobiles()
},[])

const handleAddToCart = async(item)=>{
  await axios.post('https://670ce40a7e5a228ec1d1c69e.mockapi.io/cart',item).then((res)=>{
    toast.success('Item added to cart')
    setIsList(!isList)
  })
}

  return (
    <>
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>{<img src={adimg1}></img>}</SwiperSlide>
        <SwiperSlide>{<img src={adimg2}></img>}</SwiperSlide>
        <SwiperSlide>{<img src={adimg3}></img>}</SwiperSlide>
      </Swiper>
      </div>
      <div className='container-fluid'>
        <div className='row ms-2'>
          {
            mobiles.map((item)=>{
              return  <div class="col-3">
              <div class="card my-4 card-shadow1" style={{width: "18rem"}}>
                <img src={item.image} class="card-img-top" alt="..."/>
                <div class="card-body">
                  <h5 class="card-title">{item.name}</h5>
                  <div className='d-flex '>
                  <h6 class="card-title">₹{item.price}</h6>
                  <h6 class="card-title text-decoration-line-through text-muted mx-3">₹{item.offerprice}</h6>
                  <h6 className='text-success fw-bold'>{item.discount}%</h6>
                  </div>
                  <p class="card-text ">
                    {
                      truncate(item.description,{length:90})
                    }
                  </p>
                  <button className='me-2 but-col1 p-2'onClick={()=>handleAddToCart(item)}>Add to Cart</button>
                  <button className='but-col p-2'>Buy Now</button>
                </div>
              </div>
              </div>
            })
          }
     
      </div>
      </div>
    </>
  );
}

export default Home
