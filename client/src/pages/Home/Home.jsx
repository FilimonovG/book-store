import './Home.css'
import Layout from "../../components/Layout/Layout";
import Section from "./Section/Section";
import {useSelector} from "react-redux";
import Loading from "../../utils/ProtectedRoute/Loading";
import {useGetAllBooksQuery} from "../../services/bookApi";
import {useGetAllCategoriesQuery} from "../../services/categoryApi";

function Home(){

    const {data: books} = useGetAllBooksQuery()
    const {data: categories} = useGetAllCategoriesQuery()

    return(
        <Layout>
            {books && categories ?
                <div className={"home-page"}>
                    <Section category={categories.toSorted((a,b)=>a.id > b.id ? 1 : -1)[0]} books={books}/>
                    <Section category={categories.toSorted((a,b)=>a.id > b.id ? 1 : -1)[2]} books={books}/>
                </div>
                :
                <Loading/>
            }
        </Layout>
    )
}

export default Home