import React, { useEffect, useState } from 'react'
import { collection,deleteDoc} from "firebase/firestore";
import { db } from '../firebaseConfig';

const BookItem = ({id,title,author,status,rank}) => {
    const deleteBook=async() => { 
        console.log((id))
        try{
            await deleteDoc(collection(db,'books',id))
        }catch(e){
            // alert(e.message)
        }
     
    }
  return (
    <tr>
    <td className='text-center border-[1px] p-2'>{rank + 1} </td>
    <td className='text-center border-[1px] p-2'>{author}</td>
    <td className='text-center border-[1px] p-2'>{title}</td>
    <td className='text-center border-[1px] p-2'>{status}</td>
    <td className='text-center border-[1px] p-2'>
        <button className='bg-red-400 text-white px-3 py-1 font-medium rounded-md'>Edit</button>
        <button onClick={deleteBook} className='bg-gray-900 text-white mx-1 px-3 py-1 font-medium rounded-md'>Delete</button>
    </td>
    </tr>
  )
}

export default BookItem