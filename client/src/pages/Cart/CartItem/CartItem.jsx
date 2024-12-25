import './CartItem.css'
import {Link} from "react-router-dom";
import AuthorsNames from "../../../utils/AuthorsNames/AuthorsNames";
import {useDispatch} from "react-redux";
import {decreaseQuantity, increaseQuantity, removeBook} from "../../../store/reducers/cartSlice";

function CartItem({book}){

    const dispatch = useDispatch();

    return(
        <div className="cart__item">
            <div className="item__image">
                <Link to={`/book/${book.id}`}>
                    <img className="image__value" src={book.imageUrl}/>
                </Link>
            </div>
            <div className="item__info">
                <div className="item__title">
                    <Link to={`/book/${book.id}`}>{book.title}</Link>
                </div>
                <div className="item__authors">
                    <AuthorsNames book={book}/>
                </div>
                <div className="item__price">{book.price} ₽/шт.</div>
            </div>
            <div className="item__cost">
                <div className="item__counter">
                    <button disabled={book.quantity < 2 ? 'disabled' : ''} className={`counter__button remove ${book.quantity < 2 ? 'disabled' : ''}`} onClick={()=>dispatch(decreaseQuantity(book))}>
                        <span>-</span>
                    </button>
                    <span className="quantity">{book.quantity}</span>
                    <button className="counter__button add" onClick={()=>dispatch(increaseQuantity(book))}>
                        <span>+</span>
                    </button>
                </div>
                <p className="item__total">{book.price * book.quantity} ₽</p>
                <div className="clear__item" onClick={() => dispatch(removeBook(book))}>
                    <svg data-v-7a84296f="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" alt="clear-cart" className="icon">
                        <path data-v-7a84296f="" d="M17 19V8H7v11h10z" stroke="#2C7EDC" strokeWidth="1.5"
                              strokeLinecap="round" strokeLinejoin="round"></path>
                        <path data-v-7a84296f="" d="M6 8h12" stroke="#2C7EDC" strokeWidth="1.5"
                              strokeLinecap="round"></path>
                        <path data-v-7a84296f="" d="M10 8V7a2 2 0 012-2v0a2 2 0 012 2v1" stroke="#2C7EDC"
                              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    <span>Убрать из корзины</span>
                </div>
            </div>
        </div>
    )
}

export default CartItem