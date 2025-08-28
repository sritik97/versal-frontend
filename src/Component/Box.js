import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart,useCart } from './contentReducer'
function Box(props) {
  let dispatch = useDispatchCart()
  const priceref = useRef();
  let data = useCart()
  let options = props.option
  
  let pricoptions = Object.keys(options)
  const [qty,setQty] = useState(1)
  const [size,setSize] = useState("")
  const HandelToCart = async ()=>{
          let food = []
    for (const item of data) {
      if (item.id === props.fooditem._id) {
        food = item;

        break;
      }
    }
      if (food != []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.fooditem._id, price: finalPrice, qty:qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id:props.fooditem._id, name: props.fooditem.name, price: finalPrice, qty:qty, size: size})
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }
     await dispatch({type:"ADD",id:props.fooditem._id, name:props.fooditem.name, price:finalPrice, qty:qty, size:size})
      console.log(data)
  }

  let finalPrice = qty*parseInt(options[size]);
  useEffect(()=>{
    setSize(priceref.current.value)
  },[])
  return (
    <div>
       <div>
        <div className="card mt-3 bg-dark text-white" style={{}}>
  <img src={props.fooditem.img} className="card-img-top" alt="..." style={{height:"120px",objectFit:"fill"}}/>
  <div className="card-body">
    <h5 className="card-title">{props.fooditem.name}</h5>
    <p className="card-text">this is my card</p>
    <div className='container w-100'>
      <select className='m-2 h-100  bg-success rounded'onChange={(e)=>setQty(e.target.value)}>
        {Array.from(Array(6),(e,i)=>{
          return(
          <option key={i+1} value={i+1}>{i+1}</option>
           )
        })}
      </select>
      <select className='m-2 h-100  bg-success rounded' ref={priceref} onChange={(e)=>setSize(e.target.value)}>
        {
          pricoptions.map((data)=>{
            return <option key={data} value={data}>{data}</option>
          })
        }
      </select>
      <div className='d-inline h-100 fs-5'>${finalPrice}/-</div>
    </div>
    <hr></hr>
    <button className={`btn btn-success justify-center ms-2`} onClick={HandelToCart}>Add to Cart</button>
  </div>
</div></div>
    </div>
  )
}

export default Box
