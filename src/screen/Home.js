import React, { useEffect, useState } from 'react'
import Navbar from '../Component/Navbar'
import Footer from '../Component/Footer'
import Box from '../Component/Box'

import { data } from 'react-router-dom'

function Home() {
const [search,setsearch] =  useState('');
const [foodcat,setfoodcat] =  useState([]);
const [fooditem,setfooditem] = useState([]);


   const loadData = async(e)=>{
         
          let  response = await fetch("http://localhost:5000/api/foodData",{
              method:'POST',
              headers:{
               'Content-Type':'application/json'  
              },
             
          })
          
         .then(response =>response.json())
            setfoodcat(response[1])
            setfooditem(response[0])
        //  .then(data =>{
       
        // //     if (!data.success) {
        // //       alert("Enter valid Credentials")
        // //   }
        // //    if (data.success) {
        // //     localStorage.setItem("authToken",data.authToken)
        // //     console.log(localStorage.getItem("authToken"))
        // //    Navigate("/")
        // // }
        //  })
      }

  useEffect(()=>{
 loadData()
  },[])



  return (
    <div>
    <div><Navbar></Navbar></div>  
    <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
  <div className="carousel-inner" id='carousel'>
    <div class="carousel-caption" style={{zIndex:"10"}}>
         <div className="d-flex justify-content-center ">
    <input className="form-control mr-sm-2 bg-dark text-white" type="search" placeholder="Search" aria-label="Search" value={search} 
    onChange={(e)=>{setsearch(e.target.value)}}/>
    <button className="btn btn-outline-success my-2 my-sm-0 m-2" type="submit">Search</button>
  </div>
    </div>
    <div className="carousel-item active " >
      <img src='./images/burger.png' className="d-block w-100 " style={{filter: "brightness(30%)"}} alt="image is not load"/>
    </div>
    <div className="carousel-item">
      <img src='./images/pastry.png' className="d-block w-100" style={{filter: "brightness(30%)"}} alt="mage is not load"/>
    </div>
    <div className="carousel-item">
      <img src='./images/barbeque.png' className="d-block w-100" style={{filter: "brightness(30%)"}} alt="mage is not load"/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div></div>
     <div className='container'>

      {
        foodcat !=[]
        ?foodcat.map((data)=>{
            return(
              <div className='row mb-3'>  
              <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
              <hr />
                {fooditem !=[]
                ?fooditem.filter((item)=> (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                .map(filterItem =>{
                  return(
                    <div key={filterItem._id} className='col-12 col-md-6 col-lg-3'>
                      <Box fooditem = {filterItem}
                       option={filterItem.options[0]}
                       
                    ></Box>
                    </div>
                  )
                })
                :""
              }
               </div>
             
            )}
            
        )
        :""
      }

    
      
      </div>
    <div> <Footer></Footer></div> 
    </div>
  )
}


export default Home
