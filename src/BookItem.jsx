import React from 'react'

const BookItem = ({id,title,author,status,rank}) => {
  return (
    <tr>
    <td className='text-center border-[1px] p-2'>{rank}</td>
    <td className='text-center border-[1px] p-2'>{author}</td>
    <td className='text-center border-[1px] p-2'>{title}</td>
    <td className='text-center border-[1px] p-2'>{status}</td>
    <td className='text-center border-[1px] p-2'>
        <button>edit</button>
        <button>delete</button>
    </td>
    </tr>
  )
}

export default BookItem