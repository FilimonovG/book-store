import './Book.css'
import Layout from "../../components/Layout/Layout";
import {useGetBookByIdQuery} from "../../services/bookApi";
import {useParams} from "react-router-dom";
import Loading from "../../utils/ProtectedRoute/Loading";
import Rating from "../../components/Rating/Rating";
import AuthorsNames from "../../utils/AuthorsNames/AuthorsNames";

function Book(){
    const {id} = useParams()
    const {data: book} = useGetBookByIdQuery(id)

    return(
        <Layout>
            {book ?
                <div className={"book-page"}>
                    <div className={"book__header"}>
                        <p className={"book__title"}>
                            {book.title}
                        </p>
                        <p className={"book__authors"}>
                            <AuthorsNames book={book} />
                        </p>
                    </div>
                    <div className={"book__details"}>
                        <div className={"details__col"}>
                            <div className={"details__img"}>
                                <img className={"img__value"} src={book.imageUrl}/>
                            </div>
                            <div className={"details__price"}>
                                <p className={'price__value'}>
                                    {book.price} ₽
                                </p>
                            </div>
                            <Rating item={book} class_name={"details__rating"}/>
                            <div className={"details__buy"}>
                                <button className={'details__button'}>
                                    Купить
                                </button>
                            </div>
                        </div>
                        <div className={"details__col"}>
                            <p className={"details__header"}>
                                Описание
                            </p>
                            <p className={"description__value"}>
                                {book.description}
                            </p>
                            <p className={"details__header"}>
                                Характеристики
                            </p>
                            <div className={"details__attributes"}>
                                <div className={"attributes__row"}>
                                    <div className={"attributes__col"}>
                                        <p className={"attributes__text"}>
                                            Издательство
                                        </p>
                                    </div>
                                    <div className={"attributes__col"}>
                                        <p className={"attributes__text"}>

                                            Эксмо
                                        </p>
                                    </div>
                                </div>
                                <div className={"attributes__row"}>
                                    <div className={"attributes__col"}>
                                    <p className={"attributes__text"}>
                                            Год издания
                                        </p>
                                    </div>
                                    <div className={"attributes__col"}>
                                        <p className={"attributes__text"}>
                                            2024
                                        </p>
                                    </div>
                                </div>
                                <div className={"attributes__row"}>
                                    <div className={"attributes__col"}>
                                        <p className={"attributes__text"}>
                                            Количество страниц
                                        </p>
                                    </div>
                                    <div className={"attributes__col"}>
                                        <p className={"attributes__text"}>
                                            {book.pagesAmount}
                                        </p>
                                    </div>
                                </div>
                                <div className={"attributes__row"}>
                                    <div className={"attributes__col"}>
                                        <p className={"attributes__text"}>
                                            Тип обложки
                                        </p>
                                    </div>
                                    <div className={"attributes__col"}>
                                        <p className={"attributes__text"}>
                                            {book.coverType}
                                        </p>
                                    </div>
                                </div>
                                <div className={"attributes__row"}>
                                    <div className={"attributes__col"}>
                                        <p className={"attributes__text"}>
                                            Вес, г
                                        </p>
                                    </div>
                                    <div className={"attributes__col"}>
                                        <p className={"attributes__text"}>
                                            {book.weight}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"book__reviews"}>
                        <div className={"reviews__header"}>
                            <div>
                                <p>
                                    Отзывы
                                </p>
                            </div>
                            <div className={"review__button"}>
                                <button className={"details__button"}>
                                    Оставить отзыв
                                </button>
                            </div>
                        </div>
                        {[...Array(5)].map((_, i) => {
                            return (
                                <div className={"review"}>
                                    <div className={"review__author"}>
                                        <span className={"author__text"}>
                                            Надежда
                                        </span>
                                        <span className={"author__text"}>
                                            24.11.2024
                                        </span>
                                    </div>
                                    <div className={"review__rating"}>
                                        <span className={'review-rating__value'}>
                                            {5}
                                        </span>
                                        {[...Array(5)].map((_, i) => {
                                            if (5 > i) {
                                                return (
                                                    <span className={'review__star'}>
                                                <svg viewBox="0 0 24 24" fill="#fbb500"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                                                </svg>
                                            </span>
                                                )
                                            }
                                            return (
                                                <span className={'review__star'}>
                                                <svg viewBox="0 0 24 24" fill="#d3dadf"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                                    />
                                                </svg>
                                            </span>
                                            )
                                        })}
                                    </div>
                                    <div className={"review__header"}>
                                        <p>
                                            Хорошая антиутопия
                                        </p>
                                    </div>
                                    <div className={"review__content"}>
                                        <p className={""}>
                                            Мне понравилось читать "451° по Фаренгейту" Рэя Брэдбери. Действие книги
                                            происходит в обществе будущего, где чтение и интеллектуализм запрещены, и
                                            повествует о человеке, который начинает сомневаться в своем обществе и в той
                                            роли, которую он в нем играет. Темы книги, такие как цензура и конформизм,
                                            заставляют задуматься об окружающем мире. Книга держит в напряжении, а
                                            персонажи сложные и легко узнаваемые. Хотя книга затрагивает некоторые
                                            сложные темы, я нашла ее действительно интересной. Я бы определенно
                                            рекомендовала эту книгу другим людям, которые любят антиутопическую
                                            фантастику и истории, которые заставляют задуматься.
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                : <Loading/>
            }
        </Layout>
    )
}

export default Book