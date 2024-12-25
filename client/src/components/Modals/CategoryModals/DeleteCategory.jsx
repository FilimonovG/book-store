import '../Modal.css'
import {useDispatch, useSelector} from "react-redux";
import {selectDeleteModal, toggleDeleteModal} from "../../../store/reducers/toggleSlice";
import {useDeleteCategoryMutation} from "../../../services/categoryApi";

function DeleteCategory({id}) {

    const isActive = useSelector(selectDeleteModal)
    const dispatch = useDispatch();

    const [deleteCategory] = useDeleteCategoryMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await deleteCategory(id)
            dispatch(toggleDeleteModal())
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className={`modal ${isActive ? 'active' : ''}`}>
                <div className={'modal__header'}>
                    <span>Подтвердите удаление</span>
                </div>
                <div className={'modal__content'}>
                    <div className={'modal__body'}>
                        <span>Это действие нельзя будет отменить</span>
                    </div>
                    <div className={'modal__buttons'}>
                        <button className={'button'} onClick={() => dispatch(toggleDeleteModal())}>Отмена</button>
                        <button className={'button delete'} onClick={handleSubmit}>Удалить</button>
                    </div>
                </div>
            </div>
            <div className={`shading shading-modal ${isActive ? 'active' : ''}`}
                 onClick={() => dispatch(toggleDeleteModal())}></div>
        </>
    )
}

export default DeleteCategory;