import './Header.css'
import Button from "../../shared/Button/Button";
import Search from "../../shared/Search/Search";

function Header(){
    return(
        <header className={'header'}>
            <div className="header__row">
                <div className="header__menu">
                    <div className="temp-icon"></div>
                    <div className="temp-icon"></div>
                    <div className="temp-icon"></div>
                    <div className="temp-icon"></div>
                </div>
                <div className="header__catalog">
                    <Button text={'Каталог'} type={'catalog'}
                    icon={
                        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="catalog__button-image">
                            <path fill="#ffffff" d="M6.667 3.333C5.747 3.333 5 4.08 5 5v10.834c-.92 0-1.667-.746-1.667-1.666V5a3.333 3.333 0 013.334-3.333h7.5c.92 0 1.667.746 1.667 1.666V5h-1.667V3.333h-7.5z"/>
                            <path fill="#ffffff" d="M3.333 5.832c0-.92.747-1.667 1.667-1.667h10c.92 0 1.667.746 1.667 1.667v10.834c0 .92-.746 1.666-1.667 1.666H5c-.92 0-1.667-.746-1.667-1.666V5.832zm11.667 0H5v10.834h10V5.832z"/>
                            <path fill="#ffffff" d="M8.335 4.165c.46 0 .833.373.833.833v5.833a.833.833 0 01-1.667 0V4.998c0-.46.374-.833.834-.833z"/>
                        </svg>
                    }
                    />
                    <Search/>
                </div>
            </div>
        </header>
    )
}

export default Header