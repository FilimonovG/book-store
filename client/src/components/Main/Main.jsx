import './Main.css'

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