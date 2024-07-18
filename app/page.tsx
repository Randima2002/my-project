import React from "react";
import Image from "next/image";
import Slide from './../components/slider/Silder';
import Review from './../components/review/review';
import Room from './../components/rooms/room';
import ImageGallery from './../components/imagegallery/imageGallery';
import Aboutus from './../components/aboutus/aboutus';
import Contactus from './../components/contactus/contactus';
import Header from './../components/header/Header';


export default function Home() {

  const img = "./../../public/banner3.jpg";

  return (
    <div className=" w-full max-w-[1800px] mx-auto">

      {/* Header */}
      <Header />

      {/* banner section */}
      <div className=" w-full mobile:h-2/3 laptop:h-screen" id="home">
        <Slide />
      </div>


      {/* about us */}
      <div className=" h-auto" id="about">
        <div className=" w-full p-5">
          <div className="  w-full">
            <Aboutus />
          </div>
        </div>
      </div>


      {/* Room selection section */}
      <div className=" h-auto" id="rooms">
        <div className=" w-full p-5">
          <h2 className=" w-full text-center text-2xl font-bold my-10">Select Your Room With Your Interest</h2>
          <div className="  w-full grid mobile:grid-cols-1 laptop:grid-cols-3 gap-8">
            <Room category={"Single Room"} des={"Single room "} />
            <Room category={"Double Room"} des={"Double Room"} />
            <Room category={"Threeble Room"} des={"Threeble Room"} />
          </div>
        </div>
      </div>

      {/* Reiews section */}
      <div className=" h-auto">
        <div className=" w-full p-5">
          <h2 className=" w-full text-center text-2xl font-bold my-10">Let's Look Whats Peoples Say About Us</h2>
          <div className="  w-full grid mobile:grid-cols-1 laptop:grid-cols-3 gap-8">
            <Review title={"Hello "} descripton={"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex laborum vel incidunt eaque unde quaerat natus aspernatur nesciunt deleniti magnam nulla quasi provident rem laudantium sequi quas ducimus, dicta porro?"} />
            <Review title={"hello"} descripton={"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex laborum vel incidunt eaque unde quaerat natus aspernatur nesciunt deleniti magnam nulla quasi provident rem laudantium sequi quas ducimus, dicta porro?"} />
            <Review title={"hello"} descripton={"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex laborum vel incidunt eaque unde quaerat natus aspernatur nesciunt deleniti magnam nulla quasi provident rem laudantium sequi quas ducimus, dicta porro?"} />
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





      {/* contact us */}
      <div className=" h-auto mt-10" id="contact">
        <div className=" w-full p-5">
          <div className="  w-full">
            <Contactus />
          </div>
        </div>
      </div>

    </div>
  );
}

