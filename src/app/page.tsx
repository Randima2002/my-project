import React from "react";
import Image from "next/image";
import Slide from './(component)/Silder';



export default function Home() {
  return (
   <div className=" w-full max-w-[1800px] mx-auto">

      {/* banner section */}
      <div className=" w-full mobile:h-2/3 laptop:h-screen">
          <Slide/>
      </div>

      <div className=" h-screen"></div>

   </div> 
  );
}

