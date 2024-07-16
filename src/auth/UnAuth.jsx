import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const UnAuth = ({ children }) => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    console.log(isLoggedIn);
    if (!isLoggedIn) {
        return <> {children} </>
    } else {
        return <Navigate to="/" replace />
    }
}
export default UnAuth