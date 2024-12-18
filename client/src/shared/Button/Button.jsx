import './Button.css'

function Button({text, action, icon='', type=''}){
    return(
        <button className={`button ${type}`} onClick={action}>
            {icon}
            {text}
        </button>
    )
}
export default Button