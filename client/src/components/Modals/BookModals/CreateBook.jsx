import '../Modal.css'
import {useDispatch, useSelector} from "react-redux";
import {selectCreateModal, toggleCreateModal} from "../../../store/reducers/toggleSlice";
import {useState} from "react";
import {useGetAllCategoriesQuery} from "../../../services/categoryApi";
import {useCreateBookMutation} from "../../../services/bookApi";
import {useGetAllAuthorsQuery} from "../../../services/authorApi";

function CreateBook() {

    const isActive = useSelector(selectCreateModal)
    const dispatch = useDispatch();

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState(null)
    const [categoryId, setCategory] = useState(1)
    const [authors, setAuthors] = useState([1])

    const {data: categories} = useGetAllCategoriesQuery()
    const {data: authorsData} = useGetAllAuthorsQuery()

    const [createBook] = useCreateBookMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const formData = new FormData()
            formData.append("title", title)
            formData.append("price", price)
            formData.append("image", image)
            formData.append('description', description)
            formData.append("categoryId", categoryId)
            formData.append("authors", authors)
            await createBook(formData)
            setTitle('')
            setDescription('')
            setImage(null)
            setCategory(1)
            setPrice(0)
            setAuthors([1])
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
                    <span>Добавить книгу</span>
                </div>
                <form className={'modal__content'} onSubmit={handleSubmit}>
                    <div className={'modal__body'}>
                        <div className={'modal__row'}>
                            <div className={'modal__col'}>
                                <span>Название:</span>
                            </div>
                            <div className={'modal__col'}>
                                <input className={'modal__input'} placeholder={'Введите название'}
                                       type={"text"} required
                                       onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={'modal__row'}>
                            <div className={'modal__col'}>
                                <span>Цена:</span>
                            </div>
                            <div className={'modal__col'}>
                                <input className={'modal__input'} placeholder={'Введите цену'}
                                       type={"number"} required
                                       onChange={(e) => setPrice(Number(e.target.value))}
                                />
                            </div>
                        </div>
                        <div className={'modal__row'}>
                            <div className={'modal__col'}>
                                <span>Категория:</span>
                            </div>
                            <div className={'modal__col'}>
                                <select className={'modal__input'}>
                                    {categories?.toSorted((a, b) => a.id - b.id).map((category) => (
                                        <option onClick={() => setCategory(category.id)}
                                                key={category.id}>{category.title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className={'modal__row'}>
                            <div className={'modal__col'}>
                                <span>Автор:</span>
                            </div>
                            <div className={'modal__col'}>
                                <select className={'modal__input'}>
                                    {authorsData?.toSorted((a, b) => a.id - b.id).map((author) => (
                                        <option onClick={() => setAuthors([author.id])}
                                                key={author.id}>{author.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className={'modal__row'}>
                            <div className={'modal__col'}>
                                <span>Изображение:</span>
                            </div>
                            <div className={'modal__col'}>
                                <input className={'modal__input__image'}
                                       type={"file"} required
                                       onChange={(e) => setImage(e.target.files[0])}
                                />
                            </div>
                        </div>
                        <div className={'modal__row'}>
                            <div className={'modal__col'}>
                                <span>Описание:</span>
                            </div>
                            <div className={'modal__col'}>
                                <textarea rows={10} cols={50} className={'modal__text-area'} placeholder={'Введите описание'}
                                          required onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={'modal__buttons'}>
                        <button type={"reset"} className={'button'}
                                onClick={() => dispatch(toggleCreateModal())}>Отмена
                        </button>
                        <button type={"submit"} className={'button confirm'}>Добавить</button>
                    </div>
                </form>
            </div>
            <div className={`shading shading-modal ${isActive ? 'active' : ''}`}
                 onClick={() => dispatch(toggleCreateModal())}></div>
        </>
    )
}

export default CreateBook;