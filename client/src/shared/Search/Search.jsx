import './Search.css'
import {useGetAllBooksQuery} from "../../services/bookApi";
import {useState} from "react";
import {Link} from "react-router-dom";

function Search(){

    const [search_items, setSearchItems] = useState([])

    const {data: books} = useGetAllBooksQuery()

    const handleInput = (e) => {
        let input = e.target.value
        setSearchItems([])
        if (input !== '') {
            let res = books?.filter(book=>book.title.toLowerCase().includes(input.toLowerCase()))
            setSearchItems(res)
        }

    }

    return(
        <div className="search">
            <input type={"search"} placeholder={'Найти'} className={'search__field'} onInput={handleInput}></input>
            <div className={`search__results ${search_items.length > 0 ? 'active' : ''}`}>
                {search_items.map(item => (
                    <Link to={`/book/${item.id}`} key={item.id} className={'search__item'}>{item.title}</Link>
                ))}
            </div>
        </div>
    )
}

export default Search