import React from 'react';
import Home from '../../components/admin/home/home'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';



const page = () => {

  // const session = await getServerSession();

  // if (session) {
  //   redirect('/admin');
  // }else{
  //   redirect('/login');
  // }

  return (
    <div className=' w-full h-full'>
      <Home />
    </div>
  )
}

export default page
