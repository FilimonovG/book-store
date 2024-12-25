import './Admin.css'
import Layout from "../../components/Layout/Layout";
import {useLocation} from "react-router-dom";
import AdminBook from "./AdminBook/AdminBook";
import AdminCategory from "./AdminCategory/AdminCategory";

function Admin(){
    const location = useLocation();
    const type = location.pathname.split('/')[2]
    return(
        <Layout>
            {type === "book" ?
                <AdminBook/>
                :
                <AdminCategory/>
            }
        </Layout>
    )
}

export default Admin