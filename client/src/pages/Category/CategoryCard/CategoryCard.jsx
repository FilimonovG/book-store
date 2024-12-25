import './CategoryCard.css'
import {Link} from "react-router-dom";
import AuthorsNames from "../../../utils/AuthorsNames/AuthorsNames";
import Rating from "../../../components/Rating/Rating";
import BuyButton from "../../../shared/Button/BuyButton";


function CategoryCard({book}){

    function cropDescription(){
        let text_arr = book?.description.split(' ')
        return text_arr.length > 41 ? text_arr.slice(0, 41).join(' ') + ' ...' : book?.description
    }

    return(
        <div className="category-card__wrapper">
            <div className="category-card">
                <div className="category-card__image">
                    <Link to={`/book/${book.id}`}>
                        <img className="image__value" src={book.imageUrl}/>
                    </Link>
                </div>
                <div className="category-card__details">
                    <div className="category-card__info">
                        <div className="category-card__title">
                            <p className="category-card__title__value">
                                <Link to={`/book/${book.id}`}>{book.title}</Link>
                            </p>
                        </div>
                        <div className="category-card__authors">
                            <p className="category-card__authors__value">
                                <AuthorsNames book={book}/>
                            </p>
                        </div>
                        <Rating item={book} class_name={"category-card__rating"}/>
                    </div>
                    <div className="category-card__description">
                        <p className="category-card__description__value">
                            {cropDescription()}
                        </p>
                    </div>
                    <div className="category-card__buy">
                        <span className="category-card__price">{book.price} ₽</span>
                        <BuyButton book={book} type={'category-card__button'}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryCard