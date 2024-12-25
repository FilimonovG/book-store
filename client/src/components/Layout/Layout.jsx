import './Layout.css'
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

function Layout({children}) {
    return (
        <div className={'wrapper'}>
            <Header/>
            <Main>
                {children}
            </Main>
            <Footer/>
        </div>
    )
}

export default Layout