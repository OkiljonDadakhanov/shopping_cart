import React from 'react'
import arrow from '../assets/images/arrow.png'

const Header = () => {

  

  return (
    <header className='flex items-center py-6 border-b-2 border-[#D0CFCF]'>
        <button className="flex items-center">
            <img src={arrow} alt="" />
            <h1 className='ml-2 text-xl font-semibold' >
                Shopping Continue
            </h1>
        </button>
    </header>
  )
}

export default Header
