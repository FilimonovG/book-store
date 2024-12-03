import './Section.css'
import Card from "./Card/Card";

function Section({title, books}){
    return(
        <div className={'section'}>
            <h3 className={'section__title'}>{title}</h3>
            <div className={'section__cards'}>
                {books?.map(book => (
                    <Card book={book}/>
                ))}
            </div>
        </div>
    )
}
export default Section