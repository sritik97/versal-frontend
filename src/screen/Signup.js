import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'


function Signup() {
  const [Credentials,setCredentials] =  useState({name:"",email:"",password:"",geolocation:""})
   let Navigate = useNavigate()
    const heandlSubmit = async(e)=>{
        e.preventDefault();
        const response = fetch("http://localhost:5000/api/creatuser",{
            method:'POST',
            headers:{
             'Content-Type':'application/json'  
            },
            body:JSON.stringify({name:Credentials.name,email:Credentials.email,password:Credentials.password,location:Credentials.geolocation})
        })
        .then(response =>response.json())
         .then(data =>{
          console.log(data)
            if (!data.success) {
              alert("Enter valid Credentials")
          }
           if (data.success) {
           Navigate("/")
        }
         })
    
    }
    const ONchange =(events)=> {
        setCredentials({...Credentials,[events.target.name]:events.target.value})
    }
  return (
    
    <div className='container mt-5'>
        <form onSubmit={heandlSubmit}>
    <div className="form-group">
    <label htmlFor="name">Name</label>
    <input type="text" className="form-control"   name='name' value={Credentials.name} onChange={ONchange}/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email</label>
    <input type="email" className="form-control"  name='email' value={Credentials.email} onChange={ONchange} />
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"  name='password' value={Credentials.password} onChange={ONchange}/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Location</label>
    <input type="text" className="form-control" id="exampleInputPassword1"  name='geolocation' value={Credentials.geolocation} onChange={ONchange}/>
  </div>
  
  <button type="submit" className="btn btn-success m-3">Submit</button>
  <Link to="/Login" className='m-3 btn btn-danger'>Already a User</Link>
</form>
    </div>
  )
}

export default Signup
