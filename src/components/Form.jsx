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
        <div>
            <form onSubmit={handleSubmit}>
                 <input type="text" name="title" placeholder="Title" value ={formData.title || ''} onChange ={handleInputChange}/>
                <input type="text" name="author" placeholder="Author" value ={formData.author || ''} onChange ={handleInputChange}/>
                <input type="text" name="searchkeyword" placeholder="Keyword" value ={formData.searchkeyword || ''} onChange ={handleInputChange}/>

                <input type="submit" value ="Submit"/>
            </form>
        </div>
    );
}
export default Form;