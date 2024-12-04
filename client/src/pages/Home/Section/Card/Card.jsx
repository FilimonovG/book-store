import './Card.css'

function Card({book}){
    return(
        <div className={'card'}>
            <img className={'card__img'} src={book.imageUrl}/>
            <div className={'card__price'}>
                <span className={'price__value'}>
                    {book.price} ₽
                </span>
            </div>
            <div className={'card__title'}>
                <span className={'title__value'}>
                    {book.title}
                </span>
            </div>
            <div className={'card__authors'}>
                <span className={'authors__value'}>
                    {book.authors.map((author, id)=>{
                        if (id){
                            return ', ' + author.name
                        }
                        return author.name
                    })}
                </span>
            </div>
            <div className={'card__rating'}>
                <span className={'rating__value'}>
                    {book.rating}
                </span>
                <span className={'number_of_ratings__value'}>
                    {book.number_of_ratings}
                </span>
            </div>
            <button className={'card__button-buy'}>
                Купить
            </button>
        </div>
    )
}
export default Card