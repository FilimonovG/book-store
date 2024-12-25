import './BuyButton.css'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addBook, selectCart} from "../../store/reducers/cartSlice";

function BuyButton({book, type}){

    const cart = useSelector(selectCart)
    const dispatch = useDispatch();

    return(
        <>
            {cart.find(item => item.id === book.id) ?
                <Link to={'/cart'}>
                    <button className={`button ${type} confirm`}>
                        Оформить
                    </button>
                </Link>
                :
                <button className={`button ${type}`} onClick={()=>dispatch(addBook({...book, quantity: 1}))}>
                    Купить
                </button>
            }
        </>
    )
}
export default BuyButton