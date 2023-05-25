import React, { useState } from 'react'

const App = () => {
  const [bookAuthor, setBookAuthor] = useState('')
  const [bookTitle, setBookTitle] = useState('')
  const [books, setBooks] = useState([])

  const handleSubmit = () => { }
  return (

    <>
      <header className='bg-gray-900 text-center p-4'>
        <h1 className='text-white text-2xl '>Library - Firebase CRUD</h1>
      </header>
      {/* form */}
      <form className='w-1/4 mx-auto mt-20' onSubmit={handleSubmit} >
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
      <table className='w-full '>
        <thead>
          <tr className=' my-20 w-full  m-[2rem]'>
            <th className='text-end'>#</th>
            <th>Book Title</th>
            <th>Book Author</th>
            <th>Status</th>
            <th className='hidden  lg:table-cell'>Action</th>

          </tr>
        </thead>
        <tbody>
          {books.map(({ id, title, author, status }) => {
            return <CoinItem key={id} id={id} author={author} status={status} title={title} />
          })}
        </tbody>
      </table>


    </>

  )
}

export default App