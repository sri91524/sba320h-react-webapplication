import './App.css'
import BookList from './components/BookList';
import Form from './components/Form';
import {useState, useEffect} from 'react'
import Pagination from './components/Pagination';


function App() {
  const apiKey = import.meta.env.VITE_GOOGLEBOOK_API_KEY;
  const [bookResult, setBookResult] = useState(null);
  const[currentPage, setCurrentPage] = useState(1);
  const[totalPages, setTotalPages] = useState(1);
  
const getBooks = async(searchterm, author, title, page) => {
  let url=`https://www.googleapis.com/books/v1/volumes?q=${searchterm}+intitle:${title}+inauthor:${author}&maxResults=40&key=${apiKey}`;
  console.log(url);
  try{
    if(searchterm || author || title){
      const response = await fetch(url);
      const data = await response.json(); 
      if(data.items){
        const uniqueBooks = filterUniqueBooks(data.items);
        // setBookResult(uniqueBooks);
        setTotalPages(Math.ceil(uniqueBooks.length/10));

        const startIndex = (page - 1) * 10;
        const pagedBooks = uniqueBooks.slice(startIndex, startIndex + 10);

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

// useEffect(() =>{
//   getBooks('','','artificial intelligence',currentPage);
// },[currentPage]);

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
      <h1 className="title">BookQuest</h1>
      <Form booksearch={getBooks} clearBookList = {clearBookList} currentPage ={currentPage} setCurrentPage={setCurrentPage}/>
      <div className="pagination-container">
        {
          bookResult && bookResult.length > 0 && (
            <Pagination currentPage ={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          )
        }
        
      </div>
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
