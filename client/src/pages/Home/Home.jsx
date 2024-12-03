import './Home.css'
import Layout from "../../components/Layout/Layout";
import {useGetAllBooksQuery} from "../../services/bookApi";
import Section from "./Section/Section";

function Home(){
    const {data: books} = useGetAllBooksQuery()
    return(
        <Layout>
            <div className={"home-page"}>
                <Section title={'Научная фантастика'} books={books} />
                <Section title={'Научная фантастика'} books={books} />
            </div>
        </Layout>
    )
}

export default Home