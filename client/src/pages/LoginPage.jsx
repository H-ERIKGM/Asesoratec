import { useForm } from "react-hook-form"; 
import { useAuth } from "../context/auth.context";
import {Link, useNavigate} from "react-router-dom"
import { useEffect } from "react";
function LoginPage(){
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {signIn, errors: signInErrors, isAuthenticated} = useAuth();
    const navigate = useNavigate()
    const onSubmit = handleSubmit(data => {
        signIn(data)
    })

    useEffect(() => {
      if(isAuthenticated) navigate('/classrooms')
    }, [isAuthenticated])
    
    return (
        <div className = "flex h-[calc(100vh)] items-center justify-center">
            <div className = "bg-yellow-75 max-w-md w-full p-10 rounded-md">
                {
                    signInErrors.map((error, i) => (
                        <div className = 'bg-red-500 p-2 text-center' key= {i}>
                            {error}
                        </div>
                    ))
                }
                <h1 className = "text-3xl text-black font-bold my-2">AsesoraTEC</h1>
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
    );
}

export default LoginPage