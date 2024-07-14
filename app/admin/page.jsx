import React from 'react';
import Home from '../../components/admin/home/home'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { getSession } from 'next-auth/react';
// import Home from '../../components/test'



const page = async () => {
  const session = await getServerSession();
  // const sess= await getSession(session);
  // const mail = JSON.stringify(session.user.email, null, 2);
  // console.log(mail)

  if (session) {
    try {
      redirect('/admin');
    } catch (err) {
      console.log(err)
    }
  }
  else {
    redirect('/login');
  }


  return (
    <div className=' w-full h-full'>
      <Home session={session}/>
    </div>
  )
}

export default page
