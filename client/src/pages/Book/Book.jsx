import './Book.css'
import Layout from "../../components/Layout/Layout";
import {useGetBookByIdQuery} from "../../services/bookApi";
import {useParams} from "react-router-dom";

function Book(){
    const {id} = useParams()
    const {data: book} = useGetBookByIdQuery(id)
    return(
        <Layout>
            <div className={"book-page"}>
                <div className={""}>
                    <img className={"book__img"} src={book.imageUrl}/>

                </div>
            </div>
        </Layout>
    )
}

export default Book