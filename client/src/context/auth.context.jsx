import {createContext, useState, useContext, useEffect} from "react";
import {loginRequest, registerRequest, getUsersRequest, verifyTokenRequest, deleteUserRequest} from '../api/auth';
import Cookies from 'js-cookie';
 const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true)
    const signUp = async (user) =>{
        try{
            const res = await registerRequest(user);
            console.log(res);
            setUser(res.data);
            setIsAuthenticated(true);
        }catch(error){
            setErrors(error.response?.data || ["An unexpected error occurred during signup."])
        }
    };

    const signIn = async (user) => {
       try{
            const res = await loginRequest(user)
            setIsAuthenticated(true)
            setUser(res.data)
       }catch(error){
        if(Array.isArray(error.response.data)){
            return setErrors(error.response.data);
        }
        setErrors([error.response?.data?.message || "An unexpected error occurred during signin."])
       }
    }

    const logout = () => {
        Cookies.remove('token');
        setIsAuthenticated(false);
        setUser(null);
    }
    useEffect(() => {
        if(errors.length > 0){
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(() => {
        async function checkLogin (){
            const cookies = Cookies.get();
            if(!cookies.token){
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }
            try{
                const res = await  verifyTokenRequest(cookies.token);
            
                if(!res.data){
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            }catch(error){
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
            }
            
        
        }
        checkLogin();
    }, [])

    const getUsers = async () => {
        try{
            const res = await getUsersRequest();
            console.log("usuarios");
            setUser(res.data)
        }catch(error){
            console.error(error);
        }
    };

    const deleteUser = async (id) => {
        try {
          const res = await deleteUserRequest(id);
          if (res.status === 204) setUser(user.filter((userM) => userM._id !== id));
        } catch (error) {
          console.log(error);
        }
    };

    return (
        <AuthContext.Provider value = {{signUp, 
        signIn, 
        loading, 
        logout,
        user, 
        isAuthenticated, 
        errors,
        getUsers,
        deleteUser
    }}
        >
        {children}
        </AuthContext.Provider>
    )
}