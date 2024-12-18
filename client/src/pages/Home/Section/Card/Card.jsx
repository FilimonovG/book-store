import './Card.css'
import {Link} from "react-router-dom";
import Rating from "../../../../components/Rating/Rating";
import AuthorsNames from "../../../../utils/AuthorsNames/AuthorsNames";

function Card({book}){
    return(
        <div className={'card'}>
            <Link className={"card__link"} to={`/book/${book.id}`}>
                <img className={'card__img'} src={book.imageUrl}/>
            </Link>
            <div className={'card__price'}>
                <span className={'price__value'}>
                    {book.price} ₽
                </span>
            </div>
            <Link className={"card__link"} to={`/book/${book.id}`}>
                <div className={'card__title'}>
                    <span className={'title__value'}>
                        {book.title}
                    </span>
                </div>
            </Link>
            <div className={'card__authors'}>
                <span className={'authors__value'}>
                    <AuthorsNames book={book}/>
                </span>
            </div>
            <Rating item={book} class_name={"card__rating"}/>
            <button className={'card__button-buy'}>
                Купить
            </button>
        </div>
    )
}

export default Card