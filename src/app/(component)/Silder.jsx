'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import banner1 from './../../../public/banner1.jpg';
import banner2 from './../../../public/banner2.jpg';
import banner3 from './../../../public/banner3.jpg';
import banner4 from './../../../public/banner4.jpg';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import './slider.css';
import Image from 'next/image';

import  Picker from './daterangepicker';

const Silder = () => {
  return (
    <div className=' w-full'>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        autoplay={false}
        modules={[Autoplay, EffectFade]}
        className="mySwiper"
        loop={true}
        speed={2000}
      >
        <SwiperSlide>
          <Image src={banner1} alt="banner" className=' w-full mobile:h-2/3 laptop:h-screen' />
          <div className=' w-[80%] mx-auto bg-white top-[70%] left-[10%] z-10 absolute'>
            <div className=' w-full flex flex-row' >

            <Picker/>

              {/* <div date-rangepicker class="flex items-center">
                <div class="relative">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </div>
                  <input name="start" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start"/>
                </div>
                <span class="mx-4 text-gray-500">to</span>
                <div class="relative">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </div>
                  <input name="end" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date end"/>
                </div>
              </div> */}



              <div></div>

            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <Image src={banner2} alt="banner" className=' w-full mobile:h-2/3 laptop:h-screen' />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={banner3} alt="banner" className=' w-full mobile:h-2/3 laptop:h-screen' />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={banner4} alt="banner" className=' w-full mobile:h-2/3 laptop:h-screen' />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Silder
