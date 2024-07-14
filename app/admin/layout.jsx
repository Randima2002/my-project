import React from 'react'
import Page from './page';
import Header from './../../components/admin/header/header';


const layut = async () => {
  return (
    <SessionProvider>
      <div className=' w-full h-full'>
        <Header />
        <Page />
      </div>
    </SessionProvider>
  )
}

export default layut
