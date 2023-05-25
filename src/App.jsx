import React, { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebaseConfig';
import BookItem from './BookItem'

const App = () => {
  const [bookAuthor, setBookAuthor] = useState('')
  const [bookTitle, setBookTitle] = useState('')
  const [books, setBooks] = useState([])

  const getBooks=async () =>{
   const querySnapshot = await getDocs(collection(db,'books'))
   const booksData=[]
   querySnapshot.forEach((doc) => {
     booksData.push(doc.data()) ;
  });
  setBooks(booksData)
  }

  useEffect(() => {
   return () => getBooks()
  },[])

console.log(books)

  const handleSubmit = () => { }
  return (

    <>
      <header className='bg-gray-900 text-center p-4'>
        <h1 className='text-white text-2xl '>Library - Firebase CRUD</h1>
      </header>
      <main  className=' mt-20'>
        {/* form */}
        <form className='w-1/4 mx-auto '  onSubmit={handleSubmit} >
          <input
            id="booktitle"
            className="border-2 outline-none w-full border-[#272626]  p-3 rounded-sm"
            type='text'
            value={bookTitle}
            placeholder='Book Title'
            onChange={(e) => setBookTitle(e.target.value)} />
          <input
            className="border-2 outline-none my-6 w-full border-[#272626]  p-3 rounded-sm"
            type='text'
            value={bookAuthor}
            placeholder='Book Author'
            onChange={(e) => setBookAuthor(e.target.value)} />
          <select name="book status" id="bookstatus">
            <option value="">book status</option>
            <option value="">available</option>
            <option value="">not available</option>
          </select>
          <button className='text-white bg-gray-900 p-3 w-full  rounded-md font-bold '>Add/Update</button>
        </form>
        {/* table */}
        <table className='w-1/2 mx-auto mt-20 '>
          <thead>
            <tr className=' my-20 w-full  m-[2rem]'>
              <th className=' text-center border-[1px] p-2'>#</th>
              <th className='text-center border-[1px] p-2'>Book Title</th>
              <th className='text-center border-[1px] p-2'>Book Author</th>
              <th className='text-center border-[1px] p-2'>Status</th>
              <th className='text-center border-[1px] p-2'>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map(({ id, title, author, status },index) => {
              return <BookItem key={id} rank={index} id={id} author={author} status={status} title={title} />
            })}
          </tbody>
        </table>
      </main>


    </>

  )
}

export default App