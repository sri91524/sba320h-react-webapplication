function BookList({book}){    
   const loaded = () =>{
    // console.log(book);
    // console.log(`${book.volumeInfo.title} by book.volumeInfo.authors.join(",")`);
    // console.log(`Publisher - ${book.volumeInfo.publisher}`);
    // console.log(`Published Date -  ${book.volumeInfo.publishedDate}`);
        return (     
            <div >
                <div className="max-w-sm w-64 h-75 bg-amber-100 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 items-center content-center flex flex-col">
                    <a href ={book.volumeInfo.previewLink}> 
                        <div className="flex justify-center items-center">                      
                            <img className="rounded-t-lg" src={book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail} />
                        </div>
                    </a>
                    <div className="flex-grow p-5 overflow-hidden">                        
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            <span className="text-pink-950 font-bold">
                            <a href ={book.volumeInfo.previewLink}>
                                {book.volumeInfo?.title}
                            </a>
                            </span>
                            <br/> 
                        <span className="text-neutral-600">
                        {book.volumeInfo?.authors?.length > 0 && ` by ${book.volumeInfo.authors.join(", ")}`}
                        </span>
                        </p>                        
                       
                    </div>
                </div>
            </div>
        )
   }
   
   const loading = () => {
    return <h2>Loading...</h2>
   }

   return book ? loaded() : loading();
}

export default BookList;