import React, { useState } from 'react'

const App = () => {
  const [bookAuthor,setBookAuthor] =useState('')
  const [bookTitle,setBookTitle]=useState('')

  const handleSubmit=() =>{}
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
                        onChange={(e) => setBookTitle(e.target.value) } />
                    <input 
                        className="border-2 outline-none my-6 w-full border-[#272626]  p-3 rounded-sm"
                        type='text'
                        value={bookAuthor}
                        placeholder='Book Author'
                        onChange={(e) => setBookAuthor(e.target.value)} />
                <button className='text-white bg-gray-900 p-3 w-full  rounded-md font-bold '>Add/Update</button>
            </form>

      
    
    </>

  )
}

export default App