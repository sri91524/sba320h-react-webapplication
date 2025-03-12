import {useState} from 'react'
function Form(props){
    
    const [formData, setFormData] = useState({title:"",author:"",searchkeyword:""});

    const handleInputChange = (e) =>{
        setFormData({...formData,
            [e.target.name] : e.target.value
        })        
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        props.clearBookList();
        props.booksearch(formData.searchkeyword, formData.author, formData.title);        
        
    }

    return(
        <div className='flex items-center justify-center'>
            <form onSubmit={handleSubmit} className='w-4/5 max-w-4xl'>
                <div className="grid gap-4 mb-6 md:grid-cols-4">
                    <div>
                        <label htmlFor="title" className="block mb-2 text-lg font-medium text-white dark:text-white">Title</label>
                        <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="title" placeholder="Title" value ={formData.title || ''} onChange ={handleInputChange}  />
                    </div>
                    <div>
                        <label htmlFor="author" className="block mb-2 text-lg font-medium text-white dark:text-white">Author</label>
                        <input type="text" id="author" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="author" placeholder="Author" value ={formData.author || ''} onChange ={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="searchkeyword" className="block mb-2 text-lg font-medium text-white dark:text-white">Keyword</label>
                        <input type="text" id="searchkeyword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="searchkeyword" placeholder="Keyword" value ={formData.searchkeyword || ''} onChange ={handleInputChange} />
                    </div> 
 
                    <div className="flex items-center justify-left">
                        <input 
                            type="submit" value="search" 
                            className="w-full sm:w-auto  text-center btnImage"
                        />
                     </div>
                </div>
               
           
            </form>
        </div>
    );
}
export default Form;