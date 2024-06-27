import Image from 'next/image';
import React from 'react';
import image from './../../../public/banner2.jpg';
import './aboutus.css';
import { Button } from 'rsuite';

function aboutus() {
  return (
    <div className=" w-full ">
      <div className=" w-full flex flex-row-reverse gap-10">
        <div >
          <Image className=' w-[100vw] h-[70vh]' src={image} alt="Lobby Image" />
        </div>
        <div className="about-us-info w-full p-5 my-auto shadow-md shadow-orange-200 hover:shadow-slate-500 transition-all duration-300 ">
          <div className=' space-y-8 pl-20 leading-8 '>
            <h2>We are Digital Upgrade</h2>
            <p className=' text-justify'>Digital Upgrade, located in Evansville, IN, makes it easy for businesses to create and manage their digital presence and logistics, meaning we can make your business more efficient and profitable! We believe in our community and want to help our local business economy grow and expand. We believe in our clients, and want to assist in their digital success. The D-UP team grades ourselves on outcomes, not on sales.</p>
          </div>
          
        </div>
      </div>
    </div>

  )
}

export default aboutus