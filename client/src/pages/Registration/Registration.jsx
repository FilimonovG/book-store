import './Registration.css';
import {useRegistrationMutation} from "../../services/userApi";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

function Registration(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [registration] = useRegistrationMutation()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await registration({ email, password }).unwrap()
            setEmail('')
            setPassword('')
            navigate('/login')
        } catch (err) {
            console.log(err)
        }
    }

    return(
        <Layout>
            <div className={"auth__wrapper"}>
                <div className='wrapper__content'>
                    <div className="content__block">
                        <div className="login-header">Регистрация</div>
                        <form onSubmit={handleSubmit}>
                            <div className="login-field">
                                <p className="login-text">E-mail</p>
                                <input className="login-input" type={"email"} required value={email} onChange={e => {
                                    setEmail(e.target.value)
                                }}/>
                            </div>
                            <div className="login-field">
                                <p className="login-text">Имя пользователя</p>
                                <input className="login-input" type={"text"} required value={password}/>
                            </div>
                            <div className="login-field">
                                <p className="login-text">Пароль</p>
                                <input className="login-input" type={"password"} required value={password}
                                       onChange={e => {
                                           setPassword(e.target.value)
                                       }}/>
                            </div>
                            <div className="login-field">
                                <p className="login-text">Пароль ещё раз</p>
                                <input className="login-input" type={"password"} required value={password}/>
                            </div>
                            <div className="login-field">
                                <button className={`login-btn`}>Зарегистрироваться</button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Registration;