import Image from 'next/image'
import React from 'react'
import Img from './../../../public/banner1.jpg';
import { FaUserAlt } from "react-icons/fa";

const header = () => {
  return (
    <div className=' w-full'>
        <div className=' w-full flex flex-row justify-between p-3 px-10 bg-slate-200'>
            <div>
                <Image src={Img} alt='logo' className=' w-[60px] h-[60px] rounded-full border-white'/>
            </div>
            <div className=' space-y-2'>
              <FaUserAlt className=' w-[40px] h-[40px] mx-auto '/>
              <h3 className='  '>Akila Prabath</h3>
            </div>
        </div>
    </div>
  )
}

export default header
