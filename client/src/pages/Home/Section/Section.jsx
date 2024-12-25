import './Section.css'
import Card from "./Card/Card";
import {Link} from "react-router-dom";

function Section({category, books}){
    return(
        <div className={'section'}>
            <Link className={'section__link'} to={`category/${category.id}`}>
                <h3 className={'section__title'}>{category.title}</h3>
            </Link>
            <div className={'section__cards'}>
            {books?.filter(book=>book.category.id === category.id).slice(0, 4).map(book => (
                    <Card key={book.id} book={book}/>
                ))}
            </div>
        </div>
    )
}
export default Section