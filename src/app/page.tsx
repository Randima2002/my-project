import React from "react";
import Image from "next/image";
import Slide from './(component)/Silder';
import Review from './(component)/review/review';
import Room from './(component)/rooms/room';
import ImageGallery from './(component)/imagegallery/imageGallery';


export default function Home() {

  const img = "./../../public/banner3.jpg";

  return (
    <div className=" w-full max-w-[1800px] mx-auto">

      {/* banner section */}
      <div className=" w-full mobile:h-2/3 laptop:h-screen">
        <Slide />
      </div>


      {/* Reiews section */}
      <div className=" h-auto">
        <div className=" w-full p-5">
          <h2 className=" w-full text-center text-2xl font-bold my-10">Let's Look Whats Peoples Say About Us</h2>
          <div className="  w-full grid mobile:grid-cols-1 laptop:grid-cols-3 gap-8">
            <Review title={"hello"} descripton={"THis is a goood hotel"} />
            <Review title={"hello"} descripton={"THis is a goood hotel"} />
            <Review title={"hello"} descripton={"THis is a goood hotel"} />
          </div>
        </div>
      </div>


      {/* Room selection section */}
      <div className=" h-auto">
        <div className=" w-full p-5">
          <h2 className=" w-full text-center text-2xl font-bold my-10">Select Your Room With Your Interest</h2>
          <div className="  w-full grid mobile:grid-cols-1 laptop:grid-cols-3 gap-8">
            <Room category={"Single Room"} />
            <Room category={"Double Room"} />
            <Room category={"Threeble Room"} />
          </div>
        </div>
      </div>


      {/* Memories section */}
      <div className=" h-auto">
        <div className=" w-full p-5">
          <h2 className=" w-full text-center text-2xl font-bold my-10">Our Some Memories</h2>
          <div className="  w-full grid mobile:grid-cols-1 laptop:grid-cols-3 gap-8 ">
            <ImageGallery />
            <ImageGallery />
            <ImageGallery />
            <ImageGallery />
            <ImageGallery />
            <ImageGallery />
            
          </div>
        </div>
      </div>

    </div>
  );
}

