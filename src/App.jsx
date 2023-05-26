import React, { useEffect, useState } from 'react'
import { collection, getDocs, addDoc, deleteDoc, doc ,updateDoc} from "firebase/firestore";
import { db } from '../firebaseConfig';
import BookItem from './componenet/BookItem'
import TableHeaderCell from './componenet/TableHeaderCell';

const App = () => {
  const [bookAuthor, setBookAuthor] = useState('')
  const [bookTitle, setBookTitle] = useState('')
  const [books, setBooks] = useState([])
  const [bookStatus,setBookStatus] = useState('available')
  const [bookNeedToUpdate,setBookNeedToUpdate] = useState(false)
  const [bookToBeUpdatedId,setBookToBeEditedId]=useState('')
 const tableHeaderCells=['#',"Book Title","Book Author","Status","Action"]
 const tableBodyCellStyle="text-center border-[1px] p-2"
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
    if (bookStatus ==="book status" || bookTitle==="" || bookAuthor===""){
      alert('please make sure all the inputs are valid');
      return
    }
    if (!bookNeedToUpdate){
      try {
        await addDoc(collection(db, "books"), {
          title: bookTitle,
          author: bookAuthor,
          status: bookStatus
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
 
  }


  const handleStatusChange = (event) => {
    setBookStatus(event.target.value);
  };


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
          <select name="book status" className='mb-2' onChange={handleStatusChange} value={bookStatus} id="bookstatus">
            <option>book status</option>
            <option value="available">available</option>
            <option value="not available">not available</option>
          </select>
          <button className='text-white bg-gray-900 p-3 w-full  rounded-md font-bold '>Add/Update</button>
        </form>
        {/* table */}
      { books.length!==0 &&  <table className='md:w-1/2 mx-auto mt-20 '>
          <thead>
            <tr className=' my-20 w-full  m-[2rem]'>
              {tableHeaderCells.map((cellName,index) => {
                return <TableHeaderCell key={index} title={cellName} />
              })}
            </tr>
          </thead>
          <tbody>
            {books.map(({ id, title, author, status }, index) => {
              return <tr key={id} >
                <td className={tableBodyCellStyle}>{index + 1} </td>
                <td className={tableBodyCellStyle}>{title}</td>
                <td className={tableBodyCellStyle}>{author}</td>
                <td className={tableBodyCellStyle}>{status}</td>
                <td className='text-center flex   border-[1px] p-2'>
                  <button onClick={() => editBook(id)} className='bg-red-400  text-white px-3 py-1 font-medium rounded-md'>Edit</button>
                  <button onClick={() => deleteBook(id)} className='bg-gray-900 text-white mx-1 px-3 py-1 font-medium rounded-md'>Delete</button>
                </td>
              </tr>
            })}
          </tbody>
        </table>}
        {books.length===0 && <h1 className='text-black text-xl font-normal text-center mt-10'>please add a book</h1>}
      </main>


    </>

  )
}

export default App