import './App.css'
import BookList from './components/BookList';
import Form from './components/Form';
import {useState, useEffect} from 'react'
import Pagination from './components/Pagination';

/**
 * 
 * !-- This application is designed to enable users to search books online and can preview it
 * !-- Uses Googleapis - 
 * !-- @Params - search keyword, title, author, max results - 40 (allowable limit)
 * !-- Authorization API KEY 
 */
function App() {

  //ToDo -- useState to store search result from api, current page and total pages for pagination
  const apiKey = import.meta.env.VITE_GOOGLEBOOK_API_KEY;
  const [bookResult, setBookResult] = useState(null);
  const[currentPage, setCurrentPage] = useState(1);
  const[totalPages, setTotalPages] = useState(1);

  //ToDo -- Fetching from google api passing required parameters
  
const getBooks = async(searchterm, author, title, page) => {
  let url=`https://www.googleapis.com/books/v1/volumes?q=${searchterm}+intitle:${title}+inauthor:${author}&maxResults=40&key=${apiKey}`;
  
  try{
    if(searchterm || author || title){
      const response = await fetch(url);
      const data = await response.json(); 
      //Sometimes, we are getting duplicate records
      // filterUniqueBooks method used to get unique records
      if(data.items){
        const uniqueBooks = filterUniqueBooks(data.items);
        
      //10 books/page
        setTotalPages(Math.ceil(uniqueBooks.length/10));

        //fetching required records from result for pagination
        const startIndex = (page - 1) * 10;
        const pagedBooks = uniqueBooks.slice(startIndex, startIndex + 10);
        //store it in useState
        setBookResult(pagedBooks);
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

//ToDo -- filter unique records

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
//clear old list of result
const clearBookList = () =>{
  console.log("clear book list")
  setBookResult(null);
}

  return (    
    <>
      <h1 className="title">BookQuest</h1>
      <Form booksearch={getBooks} clearBookList = {clearBookList} currentPage ={currentPage} setCurrentPage={setCurrentPage}/>
      //pagination available only if there are records from search result
      <div className="pagination-container">
        {
          bookResult && bookResult.length > 0 && (
            <Pagination currentPage ={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          )
        }
        
      </div>
      //if there is search result,then book components will be displayed
      //else books not available message
      <div className='img-container'>     
        {              
          bookResult && bookResult.length > 0 ?
          bookResult.map(book => <BookList book={book} key={book.id} />):
          (
            <p className='emptyresult'>No books found for this search. <br/>Please try different keywords for filters.</p>
          )
        } 
       
      </div>
    </>
  )
}

export default App
