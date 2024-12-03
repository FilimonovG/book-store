import './Button.css'

function Button({text, action, icon='', type=''}){
    return(
        <button className={`button ${type}`}>

            {icon}
            {text}
        </button>
    )
}
export default Button