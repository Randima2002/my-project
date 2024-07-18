import React from 'react';
import reviewBack from './../../public/banner1.jpg';


export default function room({ category,des }) {
    return (
        <div className=' w-full max-w-[600px]'>
            <div className=' w-full '>
                <div className=' w-full mobile:h-auto laptop:h-[300px] rounded-md relative bg-blue-900' style={{
                        backgroundImage: `url(${reviewBack.src})`,
                        backgroundAttachment: 'scroll',
                        backgroundSize: 'cover',
                        objectFit: 'cover',
                        backgroundPosition: 'center'
                    }}>
                    <div className=' p-5 space-y-1 absolute bottom-4'>
                        <h2 className=' flex font-bold text-white text-[25px]'>{category}</h2>
                        <p className=' w-full pr-3 text-white text-justify text-[18px]'>{des}</p>
                    </div>
                </div>

            </div>

        </div>
    )

}
