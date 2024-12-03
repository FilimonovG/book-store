import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCurrentUser } from "../../store/reducers/AuthSlice";

function ProtectedRoute({allowedRoles}){
    const user = useSelector(selectCurrentUser)
    const location = useLocation();
    
    return (
        allowedRoles.includes(user?.role)
            ? <Outlet />
            : user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}
export default ProtectedRoute;