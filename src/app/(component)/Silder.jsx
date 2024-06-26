'use client'
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import banner1 from './../../../public/banner1.jpg';
import banner2 from './../../../public/banner2.jpg';
import banner3 from './../../../public/banner3.jpg';
import banner4 from './../../../public/banner4.jpg';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { DatePicker, Stack } from 'rsuite';
import { InputNumber, InputGroup } from 'rsuite';
import { Button, ButtonToolbar, ButtonGroup } from 'rsuite';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import './slider.css';
import Image from 'next/image';


const Silder = () => {

  const [selectedfromDates, setSelectedfromDates] = useState([]);
  const [selectedtoDates, setSelectedtoDates] = useState([]);
  const [valueadult, setvalueadult] = useState(0);
  const [valuechild, setvaluechild] = useState(0);

  const handleMinusadult = () => {
    setvalueadult(parseInt(valueadult, 10) - 1);
  };

  const handlePlusadult = () => {
    setvalueadult(parseInt(valueadult, 10) + 1);
  };

  const handleMinuschild = () => {
    setvaluechild(parseInt(valuechild, 10) - 1);
  };

  const handlePluschild = () => {
    setvaluechild(parseInt(valuechild, 10) + 1);
  };


  const handleDateChangefrom = (value) => {
    const formattedDatefrom = value.toLocaleDateString('en-CA')
    setSelectedfromDates(formattedDatefrom);
  };

  const handleDateChangeto = (value) => {
    const formattedtoDateto = value.toLocaleDateString('en-CA')
    setSelectedtoDates(formattedtoDateto);
  };

  const searchAvailability = () =>{
    console.log(selectedfromDates);
    console.log(selectedtoDates);
    console.log(valueadult);
    console.log(valuechild);
  }

  useEffect(() => {
    // console.log(selectedfromDates);
    // console.log(selectedtoDates);
  }, [selectedfromDates, selectedtoDates]);

  return (
    <div className=' w-full'>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        autoplay={true}
        modules={[Autoplay, EffectFade]}
        className="mySwiper"
        loop={true}
        speed={2000}
      >
        <SwiperSlide>
          <Image src={banner1} alt="banner" className=' w-full mobile:h-2/3 laptop:h-screen' />
          <div className=' w-[80%] mx-auto bg-white rounded top-[70%] left-[10%] z-10 absolute'>
            <div className=' w-full flex flex-row p-4 gap-4' >

              <div className=' flex flex-col'>
                <label htmlFor="" className=' my-auto leading-5'>Check in</label>
                <Stack spacing={10} direction="column" alignItems="flex-start">
                  <DatePicker format="MMMM dd, yyyy" onChange={(value) => handleDateChangefrom(value)} className=' hover:ring-black'/>
                </Stack>
              </div>

              <div className='  flex flex-col'>
                <label htmlFor="" className=' my-auto leading-5'>Check Out</label>
                <Stack spacing={10} direction="column" alignItems="flex-start">
                  <DatePicker format="MMMM dd, yyyy" onChange={(value) => handleDateChangeto(value)} />
                </Stack>
              </div>

              <div className='  flex flex-col' >
                <label htmlFor="" className=' my-auto leading-5'>Adult</label>
                <InputGroup>
                  <InputGroup.Button onClick={handleMinusadult}>-</InputGroup.Button>
                  <InputNumber className={'custom-input-number'} value={valueadult} onChange={(value) => setvalueadult(value)} />
                  <InputGroup.Button onClick={handlePlusadult}>+</InputGroup.Button>
                </InputGroup>
              </div>
              
              <div className='flex flex-col' >
                <label htmlFor="" className=' my-auto leading-5'>Children</label>
                <InputGroup>
                  <InputGroup.Button onClick={handleMinuschild}>-</InputGroup.Button>
                  <InputNumber className={'custom-input-number'} value={valuechild} onChange={(value) => setvaluechild(value)} />
                  <InputGroup.Button onClick={handlePluschild}>+</InputGroup.Button>
                </InputGroup>
              </div>

              <div className='flex flex-col'>
                <label htmlFor="" className=' my-auto leading-5'></label>
                <Button size="md" className=' my-auto' onClick={searchAvailability}>Check Availability</Button>
              </div>

            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <Image src={banner2} alt="banner" className=' w-full mobile:h-2/3 laptop:h-screen' />
           <div className=' w-[80%] mx-auto bg-white rounded top-[70%] left-[10%] z-10 absolute'>
            <div className=' w-full flex flex-row p-4 gap-4' >

              <div className=' flex flex-col'>
                <label htmlFor="" className=' my-auto leading-5'>Check in</label>
                <Stack spacing={10} direction="column" alignItems="flex-start">
                  <DatePicker format="MMMM dd, yyyy" onChange={(value) => handleDateChangefrom(value)} className=' hover:ring-black'/>
                </Stack>
              </div>

              <div className='  flex flex-col'>
                <label htmlFor="" className=' my-auto leading-5'>Check Out</label>
                <Stack spacing={10} direction="column" alignItems="flex-start">
                  <DatePicker format="MMMM dd, yyyy" onChange={(value) => handleDateChangeto(value)} />
                </Stack>
              </div>

              <div className='  flex flex-col' >
                <label htmlFor="" className=' my-auto leading-5'>Adult</label>
                <InputGroup>
                  <InputGroup.Button onClick={handleMinusadult}>-</InputGroup.Button>
                  <InputNumber className={'custom-input-number'} value={valueadult} onChange={(value) => setvalueadult(value)} />
                  <InputGroup.Button onClick={handlePlusadult}>+</InputGroup.Button>
                </InputGroup>
              </div>
              
              <div className='flex flex-col' >
                <label htmlFor="" className=' my-auto leading-5'>Children</label>
                <InputGroup>
                  <InputGroup.Button onClick={handleMinuschild}>-</InputGroup.Button>
                  <InputNumber className={'custom-input-number'} value={valuechild} onChange={(value) => setvaluechild(value)} />
                  <InputGroup.Button onClick={handlePluschild}>+</InputGroup.Button>
                </InputGroup>
              </div>

              <div className='flex flex-col'>
                <label htmlFor="" className=' my-auto leading-5'></label>
                <Button size="md" className=' my-auto' onClick={searchAvailability}>Check Availability</Button>
              </div>

            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <Image src={banner3} alt="banner" className=' w-full mobile:h-2/3 laptop:h-screen' />
           <div className=' w-[80%] mx-auto bg-white rounded top-[70%] left-[10%] z-10 absolute'>
            <div className=' w-full flex flex-row p-4 gap-4' >

              <div className=' flex flex-col'>
                <label htmlFor="" className=' my-auto leading-5'>Check in</label>
                <Stack spacing={10} direction="column" alignItems="flex-start">
                  <DatePicker format="MMMM dd, yyyy" onChange={(value) => handleDateChangefrom(value)} className=' hover:ring-black'/>
                </Stack>
              </div>

              <div className='  flex flex-col'>
                <label htmlFor="" className=' my-auto leading-5'>Check Out</label>
                <Stack spacing={10} direction="column" alignItems="flex-start">
                  <DatePicker format="MMMM dd, yyyy" onChange={(value) => handleDateChangeto(value)} />
                </Stack>
              </div>

              <div className='  flex flex-col' >
                <label htmlFor="" className=' my-auto leading-5'>Adult</label>
                <InputGroup>
                  <InputGroup.Button onClick={handleMinusadult}>-</InputGroup.Button>
                  <InputNumber className={'custom-input-number'} value={valueadult} onChange={(value) => setvalueadult(value)} />
                  <InputGroup.Button onClick={handlePlusadult}>+</InputGroup.Button>
                </InputGroup>
              </div>
              
              <div className='flex flex-col' >
                <label htmlFor="" className=' my-auto leading-5'>Children</label>
                <InputGroup>
                  <InputGroup.Button onClick={handleMinuschild}>-</InputGroup.Button>
                  <InputNumber className={'custom-input-number'} value={valuechild} onChange={(value) => setvaluechild(value)} />
                  <InputGroup.Button onClick={handlePluschild}>+</InputGroup.Button>
                </InputGroup>
              </div>

              <div className='flex flex-col'>
                <label htmlFor="" className=' my-auto leading-5'></label>
                <Button size="md" className=' my-auto' onClick={searchAvailability}>Check Availability</Button>
              </div>

            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <Image src={banner4} alt="banner" className=' w-full mobile:h-2/3 laptop:h-screen' />
           <div className=' w-[80%] mx-auto bg-white rounded top-[70%] left-[10%] z-10 absolute'>
            <div className=' w-full flex flex-row p-4 gap-4' >

              <div className=' flex flex-col'>
                <label htmlFor="" className=' my-auto leading-5'>Check in</label>
                <Stack spacing={10} direction="column" alignItems="flex-start">
                  <DatePicker format="MMMM dd, yyyy" onChange={(value) => handleDateChangefrom(value)} className=' hover:ring-black'/>
                </Stack>
              </div>

              <div className='  flex flex-col'>
                <label htmlFor="" className=' my-auto leading-5'>Check Out</label>
                <Stack spacing={10} direction="column" alignItems="flex-start">
                  <DatePicker format="MMMM dd, yyyy" onChange={(value) => handleDateChangeto(value)} />
                </Stack>
              </div>

              <div className='  flex flex-col' >
                <label htmlFor="" className=' my-auto leading-5'>Adult</label>
                <InputGroup>
                  <InputGroup.Button onClick={handleMinusadult}>-</InputGroup.Button>
                  <InputNumber className={'custom-input-number'} value={valueadult} onChange={(value) => setvalueadult(value)} />
                  <InputGroup.Button onClick={handlePlusadult}>+</InputGroup.Button>
                </InputGroup>
              </div>
              
              <div className='flex flex-col' >
                <label htmlFor="" className=' my-auto leading-5'>Children</label>
                <InputGroup>
                  <InputGroup.Button onClick={handleMinuschild}>-</InputGroup.Button>
                  <InputNumber className={'custom-input-number'} value={valuechild} onChange={(value) => setvaluechild(value)} />
                  <InputGroup.Button onClick={handlePluschild}>+</InputGroup.Button>
                </InputGroup>
              </div>

              <div className='flex flex-col'>
                <label htmlFor="" className=' my-auto leading-5'></label>
                <Button size="md" className=' my-auto' onClick={searchAvailability}>Check Availability</Button>
              </div>

            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Silder
