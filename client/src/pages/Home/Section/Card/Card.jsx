import './Card.css'

function Card({book}){
    return(
        <div className={'card'}>
            <img className={'card-img'} src={book.imageUrl}/>
            <div>
                <p>
                    {book.price}
                </p>
                <p>
                    {book.discount}
                </p>
            </div>
            <div>
                <p>
                    {book.title}
                </p>
            </div>
            <div>
                <p>
                    {book.authors.map((author, id)=>{
                        if (id){
                            return ', ' + author.name
                        }
                        return author.name
                    })}
                </p>
            </div>
            <div className="">
                <p>
                    {book.rating}
                </p>
                <p>
                    {book.number_of_ratings}
                </p>
            </div>
            <button>
                Купить
            </button>
        </div>
    )
}
export default Card