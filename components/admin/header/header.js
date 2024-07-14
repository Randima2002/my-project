'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import Img from './../../../public/banner1.jpg';
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { signOut } from 'next-auth/react';


const Header = ({ Logedusername }) => {
  const [isCardVisible, setIsCardVisible] = useState(false);
  const logputRef = useRef(null);

  const showCard = () => {
    setIsCardVisible(!isCardVisible);
  }

  const handleClickOutside = (event) => {
    if (logputRef.current && !logputRef.current.contains(event.target)) {
      setIsCardVisible(false);
    }
  }

  useEffect(() => {
    if (isCardVisible) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isCardVisible]);


  const handleLogout = () => {
    alert("Signout Succefully.....")
    signOut({ callbackUrl: '/login' }); // Redirect to login page after logout
  }

  return (
    <div className='w-full overflow-hidden'>
      <div className='w-full flex flex-row justify-between p-3 px-10 bg-slate-200'>
        <div>
          <Image src={Img} alt='logo' className='w-[60px] h-[60px] rounded-full border-white' />
        </div>
        <div className='space-y-2' onClick={showCard} id='user-name'>
          <FaUserAlt className='w-[40px] h-[40px] mx-auto' />
          <h3>{Logedusername ? Logedusername : "Hotel"}</h3>
        </div>
      </div>
      {isCardVisible && (
        <div ref={logputRef} className='absolute w-[200px] h-[300px] bg-white z-10 top-24 right-4 rounded-lg transition-all duration-100' id='logput'>
          <div className='flex flex-row my-4 px-5 gap-4' id='crd' onClick={handleLogout}>
            <AiOutlineLogout className='my-auto text-[20px]' />
            <p className='my-auto font-lg'>Log Out</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
