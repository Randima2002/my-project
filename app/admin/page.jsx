import React from 'react';
import Home from '../../components/admin/home/home'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';



const page = async () => {
  const session = await getServerSession();
  console.log("session is : " + session)
  if (session) {
  try {
      redirect('/admin');
      console.log("session is here: " + session.role);
    } catch (err) {
      console.log(err)
    }}
    else {
      redirect('/login');
    } 
    

  return (
    <div className=' w-full h-full'>
      <Home />
    </div>
  )
}

export default page
