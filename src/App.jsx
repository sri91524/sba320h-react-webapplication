import './App.css'
import BookList from './components/BookList';
import Form from './components/Form';
import {useState, useRef} from 'react'


function App() {
  const apiKey = import.meta.env.VITE_GOOGLEBOOK_API_KEY;
  const [bookResult, setBookResult] = useState(null);
  const imgContainerRef = useRef(null);
  
const getBooks = async(searchterm, author, title) => {
  let url=`https://www.googleapis.com/books/v1/volumes?q=${searchterm}+intitle:${title}+inauthor:${author}&key=${apiKey}`;
  console.log(url);
  try{
    if(searchterm || author || title){
      const response = await fetch(url);
      const data = await response.json(); 
      if(data.items){
        const uniqueBooks = filterUniqueBooks(data.items);
        setBookResult(uniqueBooks);
      } 
      else{
        setBookResult(null);
      }
    } 
    }
    catch(error){
      console.error(`Error feching book results ${error}`)
    }    
} 

const filterUniqueBooks = (books) =>{
  const uniqueBooks = [];
  const uniqueIds = new Set();
  books.forEach((book) =>{
    if(!uniqueIds.has(book.id)){
      uniqueBooks.push(book);
      uniqueIds.add(book.id);
    }
  });
  return uniqueBooks;
}

const clearBookList = () =>{
  console.log("clear book list")
  setBookResult(null);
}

  return (    
    <>
      <h1>BookQuest</h1>
      <Form booksearch={getBooks} clearBookList = {clearBookList} />
      <div className='img-container'>     
        {              
          bookResult && bookResult.length > 0 ?
          bookResult.map(book => <BookList book={book} key={book.id} />):
          (
            <p>No books available</p>
          )
        } 
      </div>
    </>
  )
}

export default App
