import {useGetAllCategoriesQuery} from "../../../services/categoryApi";
import Loading from "../../../utils/ProtectedRoute/Loading";
import {useDispatch} from "react-redux";
import DeleteCategory from "../../../components/Modals/CategoryModals/DeleteCategory";
import {useState} from "react";
import {toggleCreateModal, toggleDeleteModal, toggleUpdateModal} from "../../../store/reducers/toggleSlice";
import UpdateCategory from "../../../components/Modals/CategoryModals/UpdateCategory";
import CreateCategory from "../../../components/Modals/CategoryModals/CreateCategory";

function AdminCategory(){

    const {data: categories} = useGetAllCategoriesQuery()

    const dispatch = useDispatch();

    const [data, setData] = useState(null);

    return(
        <div className={'admin'}>
            <div className={'admin__header'}>
                <span>Управление категориями</span>
                <button className={'button'} onClick={()=>dispatch(toggleCreateModal())}>Добавить</button>
            </div>
            <div className={'admin__content'}>
                {categories ?
                    <div className="admin__table">
                        <div className={'admin__table__row header'}>
                            <div className={'admin__table__col'}>
                                <span className={'admin__table__col__value'}>id</span>
                            </div>
                            <div className={'admin__table__col'}>
                                <span className={'admin__table__col__value'}>Название</span>
                            </div>
                            <div className={'admin__table__col'}></div>
                        </div>
                        {categories.toSorted((a,b) => a.id - b.id).map(category => (
                            <div key={category.id} className={'admin__table__row'}>
                                <div className={'admin__table__col'}>
                                    <span className={'admin__table__col__value'}>{category.id}</span>
                                </div>
                                <div className={'admin__table__col'}>
                                    <span className={'admin__table__col__value'}>{category.title}</span>
                                </div>
                                <div className={'admin__table__col btn'}>
                                    <div className={'admin__btn'}>
                                        <button className={'button'} onClick={() => {
                                            setData(category)
                                            dispatch(toggleUpdateModal())
                                        }}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                                                    stroke="#fff" strokeWidth="1.5" strokeLinecap="round"
                                                    strokeLinejoin="round"/>
                                                <path
                                                    d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                                                    stroke="#fff" strokeWidth="1.5" strokeLinecap="round"
                                                    strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    </div>
                                    <div className={'admin__btn'}>
                                        <button className={'button delete'} onClick={() => {
                                            setData(category.id)
                                            dispatch(toggleDeleteModal())
                                        }}>
                                            <svg data-v-7a84296f="" width="26" height="26" viewBox="0 0 24 24"
                                                 fill="none" xmlns="http://www.w3.org/2000/svg" alt="clear-cart"
                                                 className="icon">
                                                <path data-v-7a84296f="" d="M17 19V8H7v11h10z" stroke="#fff"
                                                      strokeWidth="1.5"
                                                      strokeLinecap="round" strokeLinejoin="round"></path>
                                                <path data-v-7a84296f="" d="M6 8h12" stroke="#fff" strokeWidth="1.5"
                                                      strokeLinecap="round"></path>
                                                <path data-v-7a84296f="" d="M10 8V7a2 2 0 012-2v0a2 2 0 012 2v1"
                                                      stroke="#fff"
                                                      strokeWidth="1.5" strokeLinecap="round"
                                                      strokeLinejoin="round"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                    :
                    <Loading/>
                }
            </div>
            <DeleteCategory id={data}/>
            <UpdateCategory category={data}/>
            <CreateCategory/>
        </div>
    )
}

export default AdminCategory