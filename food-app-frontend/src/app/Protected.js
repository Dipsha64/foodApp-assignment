import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../features/auth/authSlice";


function Protected({children}) {
    const user = useSelector(isAuthenticated);
    if(Object.keys(user).length <= 0){
        return <Navigate to={"/login"} replace={true}></Navigate>
    }
    if(Object.keys(user).length > 0){
        return children;
        // {return <Navigate to={"/"} replace={true}></Navigate>}
    }
    return ( children );
}

export default Protected;