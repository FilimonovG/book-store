import './AuthorsNames.css'
import {Link} from "react-router-dom";

function AuthorsNames({book}){
    return(
        <>
        {book.authors.map((author, i)=>{
            console.log(author);
                if (i){
                    return (
                        <span>,
                            <Link className={"author_link"} to={`/author/${author.id}`}> {author.name}</Link>
                        </span>
                    )
                }
                return (
                    <Link className={"author_link"} to={`/author/${author.id}`}>{author.name}</Link>
                )
            })}
        </>
    )
}

export default AuthorsNames