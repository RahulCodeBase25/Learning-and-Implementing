import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-slate-400 text-white  py-3'>  {/**yha jo bhi apple kiya vo basically pure navbar par aplly hoga */}

        <div className="logo">

    <span className="font-bold text-xl mx-8 ">iTask</span>  {/**ye sab cheez hmare logo par apply hongi */}     

        </div>
     <ul className="flex gap-8 mx-9">  {/**ye have ul ki classes and what to aplly there.. */}

        <li className='cursor-pointer hover:font-bold transition-all duration-75'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all duration-75'>Your Tasks</li>

     </ul>
        </nav>
  )
}

export default Navbar

      