import React from 'react'

interface subtitle{
    title:string,
}
function SubTitle({title}:subtitle) {
  return (
    <div className='w-full flex justify-center items-center'>
        <p className='border-b-2 border-[#247D7B] font-bold py-2 px-8 text-[#FAFAFA] text-md md:text-xl'>{title}</p>
    </div>
  )
}

export default SubTitle