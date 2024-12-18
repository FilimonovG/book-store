import './Login.css';
import {useDispatch} from "react-redux";
import {useLoginMutation} from "../../services/userApi";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setCredentials } from '../../store/reducers/authSlice'
import Layout from '../../components/Layout/Layout';

function Login(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [login] = useLoginMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const userData = await login({ email, password }).unwrap()
            dispatch(setCredentials({...userData}))
            setEmail('')
            setPassword('')
            navigate('/profile')
        } catch (err) {
            console.log(err)
        }
    }

    return(
        <Layout>
            <div className={"auth__wrapper"}>
                <div className='wrapper__content'>
                    <div className="content__block">
                        <div className="login-header">Вход</div>
                        <form onSubmit={handleSubmit}>
                            <div className="login-field">
                                <p className="login-text">E-mail</p>
                                <input className="login-input" type={"email"} required value={email} onChange={e => {
                                    setEmail(e.target.value)
                                }}/>
                            </div>
                            <div className="login-field">
                                <p className="login-text">Пароль</p>
                                <input className="login-input" type={"password"} required value={password}
                                       onChange={e => {
                                           setPassword(e.target.value)
                                       }}/>
                            </div>
                            <div className="login-field">
                                <button className={`login-btn`}>Войти</button>
                            </div>
                        </form>

                    </div>
                    <div className="content__block">
                        <div className='reg-link'>
                            <span>Ещё нет аккаунта? </span>
                            <Link to="/registration" className='regular-link'>
                                Зарегистрируйтесь
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Login;