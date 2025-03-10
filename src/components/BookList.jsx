function BookList({book}){    
   const loaded = () =>{
    console.log(book, book.volumeInfo);
        return (

            <div className="cardImg">
                <a href ={book.volumeInfo.previewLink}>
                    <img src={book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail} />
                </a>
            </div>
        )
   }
   
   const loading = () => {
    return <h2>Loading...</h2>
   }

   return book ? loaded() : loading();
}

export default BookList;