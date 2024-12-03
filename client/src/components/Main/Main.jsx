import './Main.css'
import Slider from "../Slider/Slider";

function Main({children}){
    return(
        <main className={'main'}>
            <div className={"content"}>
                {children}
            </div>
        </main>
    )
}
export default Main