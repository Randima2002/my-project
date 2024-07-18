import Image from 'next/image'
import React from 'react'
import star from './../../public/star.png';
import reviewBack from './../../public/review.png';

export default function review({title , descripton}) {
    return (
        <div className=' w-full max-w-[600px]'>
            <div className=' w-full '>
                <div className=' w-full mobile:h-auto laptop:h-[300px] rounded-md hover:rounded-sm relative transition-all bg-blue-900'>
                    <div className=' w-[70px] h-[70px] rounded-full hover:rounded-2xl absolute -right-5 -top-5 transition-all ' style={{
                        backgroundImage: `url(${reviewBack.src})`,
                        backgroundAttachment: 'scroll',
                        backgroundSize: 'cover',
                        objectFit: 'cover',
                        backgroundPosition: 'center'
                    }}>
                    </div>
                    <div className=' p-5 pt-10 space-y-3'>
                        <h2 className=' flex font-bold text-white text-[25px]'>{title}</h2>
                        <Image src={star} alt="star" className=' flex ' />
                        <p className=' w-full pr-3 text-white text-justify text-[15px]'>{descripton}</p>
                    </div>
                </div>

            </div>

        </div>
    )

}
