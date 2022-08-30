import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Signup = () => {
  const [values,setValues]=useState({
    name:'',
    email:'',
    password:'',
    error:'',
    success:false
  })

  const handleChange=(name)=>(event)=>{
    setValues({...values,error:false,[name]:event.target.value})
  }
  return (
    <div className="flex h-[89vh] justify-center signbg">
      <form className="mt-16">
        <div className="w-full m-2  h-[60vh] bg-transparent border-2">
          <div className="text-orange-500 pb-2 mt-6">
            <h2 className="text-center py-7 uppercase font-bold text-[32px]">
             
              Sign up
            </h2>
          </div>
          <div className="m-3">
            <div className="mx-16 text-center">
              <input
                onChange={handleChange('name')}
                type="text"
                name="name"
                className="py-3 w-96 px-2 rounded-lg"
                placeholder="Enter the Name"
              />
            </div>
          </div>
          <div className="m-3">
            <div className="mx-16 text-center">
              <input
                type="email"
                name="email"
                onChange={handleChange('email')}
                className="py-3 px-2  w-96 rounded-lg"
                placeholder="Enter the Email"
              />
            </div>
          </div>
          <div className="m-3">
            <div className="mx-16 text-center">
              <input
                type="password"
                name="password"
                onChange={handleChange('password')}
                className="py-3 px-2  w-96 rounded-lg "
                placeholder="Enter the Password"
              />
            </div>
          </div>
          <div className="m-3">
            <div className="mx-10 text-white font-bold text-center">
              <button className="w-96 rounded-lg py-3 bg-orange-500" type="submit">Submit</button>
            </div>
           
          </div>
            <div className="text-blue-900 text-lg  text-center underline">
            <NavLink to='/signin'> Already registered ? Signin</NavLink>
            </div>

        </div>
      </form>
    </div>
  );
};

export default Signup;
