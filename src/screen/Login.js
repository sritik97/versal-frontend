import React, { useState } from 'react'
import { data, Link, useNavigate } from 'react-router-dom'
function Login() {
  const [Credentials,setCredentials] =  useState({email:"",password:""})
  let Navigate = useNavigate()
      const heandlSubmit = async(e)=>{
          e.preventDefault();
          console.log(JSON.stringify({email:Credentials.email,password:Credentials.password}))
          const response = fetch("http://localhost:5000/api/loginuser",{
              method:'POST',
              headers:{
               'Content-Type':'application/json'  
              },
              body:JSON.stringify({email:Credentials.email,password:Credentials.password})
          })
         .then(response =>response.json())
         .then(data =>{
          console.log(data)
            if (!data.success) {
              alert("Enter valid Credentials")
          }
           if (data.success) {
             localStorage.setItem("userEmail",Credentials.email)
            localStorage.setItem("authToken",data.authToken)
            console.log(localStorage.getItem("authToken"))
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
    <label htmlFor="exampleInputEmail1">Email</label>
    <input type="email" className="form-control"  name='email' value={Credentials.email} onChange={ONchange} />
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"  name='password' value={Credentials.password} onChange={ONchange}/>
  </div>
  <button type="submit" className="btn btn-success m-3">Submit</button>
  <Link to="/creatuser" className='m-3 btn btn-danger'>Signup</Link>
</form>
    </div>
  )
}

export default Login
