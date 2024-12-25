import './Category.css'
import Layout from "../../components/Layout/Layout";
import Loading from "../../utils/ProtectedRoute/Loading";
import {useParams} from "react-router-dom";
import {useGetCategoryByIdQuery} from "../../services/categoryApi";
import CategoryCard from "./CategoryCard/CategoryCard";

function Category(){

    const {id} = useParams()
    const {data: category} = useGetCategoryByIdQuery(id)

    return(
        <Layout>
            {category ?
                <div className={"category-page"}>
                    <div className={"category__header"}>
                        <p className={"category__title"}>{category.title}</p>
                    </div>
                    <div className={"category__content"}>
                        {category.books.map((book) => (
                            <CategoryCard key={book.id} book={book} />
                        ))}
                    </div>
                </div>
                :
                <Loading/>
            }
        </Layout>
    )
}

export default Category