import './Search.css'

function Search(){
    return(
        <div className="search">
            <input type={"search"} placeholder={'Найти'} className={'search__field'}></input>
            <button className={'search__button'}>
                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                          fill={"#ffffff"} d="M9.167 4.167a5 5 0 100 10 5 5 0 000-10zm-6.667 5a6.667 6.667 0 1111.78 4.279l2.286 2.286a.833.833 0 01-1.179 1.179l-2.33-2.33A6.667 6.667 0 012.5 9.167z">
                    </path>
                </svg>
            </button>
        </div>
    )
}

export default Search