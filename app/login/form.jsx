'use client'
import React, { useState } from 'react'
import Background from './../../public/banner3.jpg';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { NextResponse } from 'next/server';

const login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null);
  // const [Success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn(`credentials`,{
        email:email,
        password:password,
        redirect:false
    });
    if (res?.error) {
      setError(res.error);
      // setSuccess(null)
    } else {
      setError(null);
      alert('Login successful! Redirecting...');

      router.push('/admin');
      router.refresh();
      console.log(res)
    }
  };

  return (
    <div className=' w-full h-screen' style={{
      backgroundImage: `url(${Background.src})`,
      backgroundAttachment: 'scroll',
      backgroundSize: 'cover',
      objectFit: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className=' h-screen w-[40%] absolute right-0 top-0 flex flex-col justify-center bg-gradient-to-r from-orange-500/[.1] to-orange-500/[.2] space-y-5'>
        <div className=' flex flex-col w-[70%] mx-auto space-y-10 px-5 py-3 bg-white/[.8] rounded-md'>
          <h1 className=' w-full text-center p-2 text-2xl font-semibold'>Login To The System</h1>
          <form onSubmit={handleSubmit} className=' space-y-4'>
            <div className=' flex flex-col space-y-2 px-2'>
              <label className=' text-lg '>Email:</label>
              <input
                type="email"
                className=' rounded-sm'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className=' flex flex-col space-y-2 px-2'>
              <label className=' text-lg '>Password:</label>
              <div className='  w-full flex flex-row gap-4'>
                <input
                  type={showPassword ? "text" : "password"}
                  className=' rounded-sm w-[95%]'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  aria-label={
                    showPassword ? "Password Visible" : "Password Invisible."
                  }
                  className="text-white w-[2%]"
                  onClick={() => {
                    setShowPassword((prev) => !prev);
                  }}
                >
                  {showPassword ? (
                    <FaEye className=' text-black'/>
                  ) : (
                    <FaEyeSlash className=' text-black'/>
                  )}
                </button>

              </div>
            </div>
            {error && (
              <div className='text-red-500 font-bold text-sm px-2'>
                {error}
              </div>
            )}
            {/* {Success && (
              <div className='text-green-600 font-bold text-sm px-2'>
                {error}
              </div>
            )} */}
            <div className=' w-full justify-start flex mt-4 px-2'>
              <button type="submit" className=' bg-black text-white rounded-md px-4 py-2 font-semibold mt-4'>Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default login
