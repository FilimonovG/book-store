import './Profile.css'
import Layout from "../../components/Layout/Layout";
import {useGetUserByIdQuery} from "../../services/userApi";
import {useDispatch, useSelector} from "react-redux";
import {logOut, selectCurrentUser} from "../../store/reducers/authSlice";
import Loading from "../../utils/ProtectedRoute/Loading";
import {Link} from "react-router-dom";


function Profile(){

    const id = useSelector(selectCurrentUser)?.id
    const {data: user} = useGetUserByIdQuery(id)
    const dispatch = useDispatch()

    return(
        <Layout>
            {user?
                <div className={'profile'}>
                    <div className="profile__block">
                        <div className={'profile__header'}>
                            <span>Профиль</span>
                        </div>
                        <div className={'profile__content'}>
                            <div className={'profile__details'}>
                                <div className="profile__details__row">
                                    <div className="profile__details__col">
                                        <span className={'profile__details__col__title'}>
                                            Имя пользователя
                                        </span>
                                    </div>
                                    <div className="profile__details__col">
                                        <span className={'profile__details__col__value'}>
                                            {user.username}
                                        </span>
                                    </div>
                                </div>
                                <div className="profile__details__row">
                                    <div className="profile__details__col">
                                        <span className={'profile__details__col__title'}>
                                            Email
                                        </span>
                                    </div>
                                    <div className="profile__details__col">
                                        <span className={'profile__details__col__value'}>
                                            {user.email}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className={'profile__exit'}>
                                <button className="button profile__exit__button" onClick={()=>dispatch(logOut())}>
                                    Выйти
                                </button>
                            </div>
                        </div>
                    </div>
                    {user.role === 'ADMIN' ?
                        <div className={'profile__block'}>
                            <div className={'profile__admin'}>
                                <div className={'profile__header'}>
                                    <span>Панель администратора</span>
                                </div>
                                <div className="profile__admin__content">
                                    <Link className={'profile__admin__link'} to={'/admin/category'}>
                                        <span>Управление категориями</span>
                                    </Link>
                                    <Link className={'profile__admin__link'} to={'/admin/book'}>
                                        <span>Управление книгами</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        :
                        <></>
                    }
                    <div className={'profile__block'}>
                        <div className={'profile__orders'}>
                            <div className={'profile__header'}>
                                <span>Заказы</span>
                            </div>
                            <div className={'profile__orders__content'}>
                                {user?.orders.length > 0 ?
                                    user.orders.map(order=> (
                                        <div className={'profile__orders__order'}>

                                        </div>
                                    ))
                                    :
                                    <span>Заказов пока нет</span>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                :
                <Loading/>
            }
        </Layout>
    )
}

export default Profile