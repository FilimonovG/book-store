import '../Modal.css'

import {useDispatch, useSelector} from "react-redux";
import {selectUpdateModal, toggleUpdateModal} from "../../../store/reducers/toggleSlice";
import {useState} from "react";
import {useUpdateCategoryMutation} from "../../../services/categoryApi";

function UpdateCategory({category}) {

    const isActive = useSelector(selectUpdateModal)
    const dispatch = useDispatch();

    const [title, setTitle] = useState('')
    const id = category?.id;
    const [updateCategory] = useUpdateCategoryMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await updateCategory({ id, title })
            setTitle('')
            dispatch(toggleUpdateModal())
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className={`modal ${isActive ? 'active' : ''}`}>
                <div className={'modal__header'}>
                    <span>Обновить категорию</span>
                </div>
                <form className={'modal__content'} onSubmit={handleSubmit}>
                    <div className={'modal__body'}>
                        <div className={'modal__row'}>
                            <div className={'modal__col'}>
                                <span>Название:</span>
                            </div>
                            <div className={'modal__col'}>
                                <input className={'modal__input'} placeholder={category?.title} type={"text"}
                                       required onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={'modal__buttons'}>
                        <button type={"reset"} className={'button'} onClick={() => dispatch(toggleUpdateModal())}>Отмена</button>
                        <button type={"submit"} className={'button confirm'}>Обновить</button>
                    </div>
                </form>
            </div>
            <div className={`shading shading-modal ${isActive ? 'active' : ''}`}
                 onClick={() => dispatch(toggleUpdateModal())}></div>
        </>
    )
}

export default UpdateCategory;