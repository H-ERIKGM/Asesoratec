import { useForm } from "react-hook-form"; 
import { useAuth } from "../context/auth.context";
import {Link, useNavigate} from "react-router-dom"
import { useEffect } from "react";
import logo from "./img/logo.png"
function LoginPage(){
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {signIn, errors: signInErrors, isAuthenticated, user} = useAuth();
    const navigate = useNavigate()
    const onSubmit = handleSubmit(data => {
        signIn(data)
    })

    useEffect(() => {
      if(isAuthenticated) {
        switch (user?.role) {
            case 'user':
                navigate('/user');
                break;
            case 'teacher':
                navigate('/teacher');
                break;
            case 'admin':
                navigate('/admin');
                break;
        }
      }
    }, [isAuthenticated, user, navigate])
    
    return (
        <div>
        <div className = "flex h-[calc(100vh)] items-center justify-center">
            <div className = "bg-yellow-75 max-w-md w-full p-10 rounded-md">
                <div className="flex flex-col items-center justify-center rounded-md">
                <img
                    src= {logo}
                    alt="Institution Logo"
                    className="w-32 h-36 mb-4"
                />
                </div>
                {
                    signInErrors.map((error, i) => (
                        <div className = 'bg-red-500 p-2 text-center' key= {i}>
                            {error}
                        </div>
                    ))
                }
                <h1 className = "text-3xl text-center text-black font-bold my-2">AsesoraTEC</h1>
                <form onSubmit = {onSubmit}>

                    <input type = "email" 
                    {... register("email",{required: true})}
                    className = "w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder = "Correo"/>
                    {errors.email && (
                    <p className='text-red-500'>Se requiere un correo</p>
                    )}
                
                    <input type = "password" 
                    {... register("password",{required: true})}
                    className = "w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder = "Contraseña"/>
                    {errors.password && (
                    <p className='text-red-500'>Se requiere una contraseña</p>
                    )}

                    <button type = "submit" className = " bg-red-950 text-white px-4 py-2 rounded-md my-2">
                        Iniciar sesión 
                    </button>
                </form>
                <p className="flex gap-x-2 justify-between text-black">
                    No tienes cuenta? <Link to = "/register"
                    className = "text-red-700">Registrate</Link>
                </p>
            </div>
            
        </div>
        <footer className="bg-gray-800 text-white py-8 rounded-md">
                <div className="text-center">
                    <p className="mb-2">Contáctanos:</p>
                    <p className="mb-2">Email: erikyeudiel@hotmail.com <br /> acostasosaeduardo@gmail.com </p>
                    <p className="mb-2">Teléfono: +52 844 463 9263 <br />844 392 4145</p>
                    <div className="flex justify-center space-x-4 mt-4">
                        <a href="https://www.facebook.com/its" target="_blank" rel="noopener noreferrer" className="text-blue-400">Facebook</a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-300">Twitter</a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-400">Instagram</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default LoginPage