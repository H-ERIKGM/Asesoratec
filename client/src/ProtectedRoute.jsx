import {Navigate, Outlet} from 'react-router-dom'
import { useAuth } from "./context/auth.context"

function ProtectedRoute({allowedRoles}){
    const {loading, isAuthenticated, user} = useAuth();

    if(loading) return <h1>
        Loading...
    </h1>
    if(!loading && !isAuthenticated) return <Navigate to = '/login' replace />
    if (!allowedRoles.includes(user?.role)) {
        return <Navigate to="/" replace />;
    }
    return <Outlet/>

    
}

export default ProtectedRoute