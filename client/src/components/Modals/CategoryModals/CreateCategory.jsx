import '../Modal.css'
import {useDispatch, useSelector} from "react-redux";
import {selectCreateModal, toggleCreateModal} from "../../../store/reducers/toggleSlice";
import {useState} from "react";
import {useCreateCategoryMutation} from "../../../services/categoryApi";

function CreateCategory() {

    const isActive = useSelector(selectCreateModal)
    const dispatch = useDispatch();

    const [title, setTitle] = useState('')
    const [createCategory] = useCreateCategoryMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await createCategory({ title })
            setTitle('')
            dispatch(toggleCreateModal())
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <div className={`modal ${isActive ? 'active' : ''}`}>
                <div className={'modal__header'}>
                    <span>Добавить категорию</span>
                </div>
                <form className={'modal__content'} onSubmit={handleSubmit}>
                    <div className={'modal__body'}>
                        <div className={'modal__row'}>
                            <div className={'modal__col'}>
                                <span>Название:</span>
                            </div>
                            <div className={'modal__col'}>
                                <input className={'modal__input'} placeholder={'Введите название категории'} type={"text"}
                                       required onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={'modal__buttons'}>
                        <button type={"reset"} className={'button'} onClick={() => dispatch(toggleCreateModal())}>Отмена</button>
                        <button type={"submit"} className={'button confirm'}>Добавить</button>
                    </div>
                </form>
            </div>
            <div className={`shading shading-modal ${isActive ? 'active' : ''}`}
                 onClick={() => dispatch(toggleCreateModal())}></div>
        </>
    )
}

export default CreateCategory;