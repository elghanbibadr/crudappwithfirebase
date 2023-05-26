import React, { useEffect, useState } from 'react'
import { collection, getDocs, addDoc, deleteDoc, doc ,updateDoc} from "firebase/firestore";
import { db } from '../firebaseConfig';
import BookItem from './BookItem'

const App = () => {
  const [bookAuthor, setBookAuthor] = useState('')
  const [bookTitle, setBookTitle] = useState('')
  const [books, setBooks] = useState([])
  const [bookNeedToUpdate,setBookNeedToUpdate] = useState(false)
  const [bookToBeUpdatedId,setBookToBeEditedId]=useState('')

  //  get books
  const getBooks = async () => {
    const querySnapshot = await getDocs(collection(db, 'books'))
    const booksData = []
    querySnapshot.forEach((doc) => {
      booksData.push({ id: doc.id, ...doc.data() });
    });
    setBooks(booksData)
  }

  useEffect(() => {
    getBooks()
  }, [])


  // add book
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookNeedToUpdate){
      try {
        await addDoc(collection(db, "books"), {
          title: bookTitle,
          author: bookAuthor,
          status: "available"
        });
      } catch (e) {
        alert(e.message)
      }
    }else{
      try {
          await updateDoc(doc(db, "books",bookToBeUpdatedId), {
            id:bookToBeUpdatedId,
            title: bookTitle,
            author: bookAuthor,
            status: "available"
          });
        } catch (e) {
          alert(e.message)
        }
        setBookNeedToUpdate(false)
    }
    setBookAuthor('')
    setBookTitle('')
    getBooks()
  }


  // delete book
  const deleteBook = async (bookId) => {
    console.log((bookId))
    try {
      await deleteDoc(doc(db, 'books', bookId))
    } catch (e) {
      // alert(e.message)
    }
    getBooks()

  }

  // update books
  const editBook=   (bookId) => {
    setBookNeedToUpdate(true)
    setBookToBeEditedId(bookId)
    const {author,title}=books.find(book => book.id === bookToBeUpdatedId)
    console.log(author,title)
    setBookAuthor(author)
    setBookTitle(title)
  //  const {author,title}=books.find(book => book.id === bookId)
  // //  console.log(targetedBook)
  //  setBookTitle(title)
  //  setBookAuthor(author)
  //  console.log(title)
  //  try {
  //   await updateDoc(doc(db, "books",bookId), {
  //     id:bookId,
  //     title: bookTitle,
  //     author: bookAuthor,
  //     status: "available"
  //   });
  // } catch (e) {
  //   alert(e.message)
  // }
  // setBookNeedToUpdate(false)
  }


  return (
    <>
      <header className='bg-gray-900 text-center p-4'>
        <h1 className='text-white text-2xl '>Library - Firebase CRUD</h1>
      </header>
      <main className=' mt-20 p-4'>
        {/* form */}
        <form className='md:w-1/4 mx-auto ' onSubmit={handleSubmit} >
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
        <table className='md:w-1/2 mx-auto mt-20 '>
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
            {books.map(({ id, title, author, status }, index) => {
              return <tr key={id} >
                <td className='text-center border-[1px] p-2'>{index + 1} </td>
                <td className='text-center border-[1px] p-2'>{title}</td>
                <td className='text-center border-[1px] p-2'>{author}</td>
                <td className='text-center border-[1px] p-2'>{status}</td>
                <td className='text-center flex   border-[1px] p-2'>
                  <button onClick={() => editBook(id)} className='bg-red-400  text-white px-3 py-1 font-medium rounded-md'>Edit</button>
                  <button onClick={() => deleteBook(id)} className='bg-gray-900 text-white mx-1 px-3 py-1 font-medium rounded-md'>Delete</button>
                </td>
              </tr>
              // return <BookItem key={id} rank={index} id={id} author={author} status={status} title={title} />
            })}
          </tbody>
        </table>
      </main>


    </>

  )
}

export default App