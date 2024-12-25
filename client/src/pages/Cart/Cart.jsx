import './Cart.css'
import Layout from "../../components/Layout/Layout";
import {useDispatch, useSelector} from "react-redux";
import {clearCart, selectCart, selectCartQuantity, selectCartTotal} from "../../store/reducers/cartSlice";
import Loading from "../../utils/ProtectedRoute/Loading";
import CartItem from "./CartItem/CartItem";

function Cart(){

    const cart = useSelector(selectCart)
    const total_price = useSelector(selectCartTotal)
    const quantity = useSelector(selectCartQuantity)
    const dispatch = useDispatch();

    return(
        <Layout>
            {cart ?
                <div className="cart__wrapper">
                    <div className="cart">
                        <div className="cart__header">
                        <span>
                            Корзина
                        </span>
                            <div className="cart__clear" onClick={() => dispatch(clearCart())}>
                                <svg data-v-7a84296f="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" alt="clear-cart" className="icon">
                                    <path data-v-7a84296f="" d="M17 19V8H7v11h10z" stroke="#2C7EDC" strokeWidth="1.5"
                                          strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path data-v-7a84296f="" d="M6 8h12" stroke="#2C7EDC" strokeWidth="1.5"
                                          strokeLinecap="round"></path>
                                    <path data-v-7a84296f="" d="M10 8V7a2 2 0 012-2v0a2 2 0 012 2v1" stroke="#2C7EDC"
                                          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                                <span>Очистить корзину</span>
                            </div>
                        </div>
                        <div className="cart__content">
                            <div className="cart__items">
                                {cart.map(book=>(
                                    <CartItem key={book.id} book={book} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="cart__total">
                        <div className="total__header">
                        <span>
                            Детали заказа
                        </span>
                        </div>
                        <div className="total__row">
                            <span>
                                Кол-во товаров
                            </span>
                            <span className="products__amount">
                                {quantity}
                            </span>
                        </div>
                        <div className="total__row">
                        <span>
                            Скидка
                        </span>
                            <span className="discount__value">
                            0 ₽
                        </span>
                        </div>
                        <div className="total__row">
                            <span className="total-price">
                                Итого
                            </span>
                            <span className="total-price value">
                                {total_price} ₽
                            </span>
                        </div>
                        <div className="total__row">
                            <button className="button buy__button">
                                Перейти к оформлению
                            </button>
                        </div>
                    </div>
                </div>
                :
                <Loading/>
            }
        </Layout>
    )
}

export default Cart