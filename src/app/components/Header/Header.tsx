import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='z-custom h-[75px] w-full sticky top-0 flex justify-between px-2 shadow-md bg-white justify-center items-center'>
        <div className='flex-1'><Image src='/Images/logo.webp' className='logo' height={100} width={100} alt="1"/></div>
    </div>
  )
}

export default Header