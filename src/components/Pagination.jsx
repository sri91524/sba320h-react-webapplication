import {React} from 'react'
function Pagination({currentPage, totalPages, onPageChange}){  
    //on page changed, then current page will be assigned to onPageChange props  
    const handlePageChange = (newPage) =>{
        if(newPage >=1 && newPage <= totalPages){
            onPageChange(newPage);
        }
    }
return(
    <div>        
        <button className="btnPage" onClick ={() =>handlePageChange (currentPage-1)} disabled ={currentPage <=1} >Previous</button>
        <span className="paginationtext">Page {currentPage} of {totalPages}</span>
        <button className="btnPage" onClick = {() => handlePageChange(currentPage +1)} disabled ={currentPage >= totalPages}>Next</button>        
    </div>
)}

export default Pagination;