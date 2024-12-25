import './Main.css'
import Catalog from "../Catalog/Catalog";
function Main({children}){
    return(
        <main className={'main'}>
            <Catalog/>
            <div className={"content"}>
                {children}
            </div>
        </main>
    )
}
export default Main