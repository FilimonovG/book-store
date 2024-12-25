import './AuthorsNames.css'

function AuthorsNames({book}){
    return(
        <>
            {book.authors.map((author, i)=>{
                return (
                    <soan key={author.id} to={`/author/${author.id}`}>{i ? author.name : author.name + '\n'}</soan>
                )
            })}
        </>
    )
}

export default AuthorsNames