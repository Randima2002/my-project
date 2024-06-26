import Image from "next/image";
import React from "react";
import Img from './../../../../public/banner3.jpg';


const ImageGallery = () => {
  return(
  <div className=' w-full max-w-[600px]'>
    <div className=' w-full overflow-hidden' >
      <Image src={Img} alt="ol" className=" w-full hover:scale-150 trasition-all"/>
    </div>
  </div>
  )
};

export default ImageGallery

