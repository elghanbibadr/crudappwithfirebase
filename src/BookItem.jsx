import React from 'react'

const BookItem = ({id,title,author,status,rank}) => {
  return (
    <tr>
    <td className='text-center border-[1px] p-2'>{rank + 1}</td>
    <td className='text-center border-[1px] p-2'>{author}</td>
    <td className='text-center border-[1px] p-2'>{title}</td>
    <td className='text-center border-[1px] p-2'>{status}</td>
    <td className='text-center border-[1px] p-2'>
        <button className='bg-red-400 text-white px-3 py-1 font-medium rounded-md'>Edit</button>
        <button className='bg-gray-900 text-white mx-1 px-3 py-1 font-medium rounded-md'>Delete</button>
    </td>
    </tr>
  )
}

export default BookItem