import './AuthorsNames.css'

function AuthorsNames({book}){
    return(
        <>
            {book.authors.map((author, i)=>{
                return (
                    <span key={author.id} to={`/author/${author.id}`}>{i ? author.name : author.name + '\n'}</span>
                )
            })}
        </>
    )
}

export default AuthorsNames