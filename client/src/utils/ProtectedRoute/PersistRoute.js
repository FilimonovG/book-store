import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation, useRefreshMutation } from "../../services/userApi";
import { logOut, selectCurrentUser, setCredentials } from "../../store/reducers/AuthSlice";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Loading from "./Loading";



const PersistRoute = () => {

    const [refresh] = useRefreshMutation()
    const [serverLogOut] = useLogoutMutation()
    const user = useSelector(selectCurrentUser)
    const isAuth = JSON.parse(localStorage.getItem('isAuth'))
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
        try {
            const userData = await refresh().unwrap()
            dispatch(setCredentials({...userData}))
        }
        catch (err) {
            console.error(err);
            if (err.status === 401){
                dispatch(logOut())
                serverLogOut()
            }
        }
        finally {
            isMounted && setIsLoading(false);
        }
    }
    !user && isAuth ? verifyRefreshToken() : setIsLoading(false)

    return () => isMounted = false;
    }, [dispatch, isAuth, refresh, user, isLoading, serverLogOut])

    return (
        <>
            {!isAuth
                ? <Outlet />
                : isLoading
                    ? <Loading />
                    : <Outlet />
            }
        </>
    )

}

export default PersistRoute