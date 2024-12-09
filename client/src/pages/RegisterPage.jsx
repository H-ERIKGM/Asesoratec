import {useForm} from 'react-hook-form'
import {useAuth} from '../context/auth.context';
import {useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';

function RegisterPage(){

    const {register, handleSubmit, formState: {errors}} = useForm();
    const {signUp, isAuthenticated, errors: registerErrors} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if(isAuthenticated) navigate("/user");
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (values) => {
        signUp(values)
    });

    return (
        <div className = "flex h-[calc(100vh)] items-center justify-center">
        <div className = "bg-yellow-75 max-w-md p-10 rounded-md">
            {
                registerErrors.map((error, i) => (
                    <div className = 'bg-red-500 p-2 text-center' key= {i}>
                        {error}
                    </div>
                ))
            }
            <h1 className= "text-3xl text-black font-bold my-2">Registro</h1>
            <form onSubmit = {onSubmit}>
            
                <input type = "text" 
                {... register("name",{required: true})}
                className = "w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder = "Nombre"/>
                {errors.name && (
                    <p className='text-red-500'>Se requiere un nombre</p>
                )}

                <input type = "text" 
                {... register("last_name",{required: true})}
                className = "w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder = "Apellido"/>
                {errors.last_name && (
                    <p className='text-red-500'>Se requiere un apellido</p>
                )}

                <input type = "email" 
                {... register("email",{required: true})}
                className = "w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder = "Correo"/>
                {errors.email && (
                    <p className='text-red-500'>Se requiere un correo</p>
                )}
                
                <input type = "phone" 
                {... register("phone",{required: true})}
                className = "w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder = "Teléfono"/>
                {errors.phone && (
                    <p className='text-red-500'>Se requiere un teléfono</p>
                )}
                
                <input type = "password" 
                {... register("password",{required: true})}
                className = "w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder = "Contraseña"/>
                {errors.password && (
                    <p className='text-red-500'>Se requiere una contraseña</p>
                )}

                <button type = "submit" className = " bg-red-950 text-white px-4 py-2 rounded-md my-2">
                    Register
                </button>
            </form>
            <p className="flex gap-x-2 justify-between text-black">
                    Tienes cuenta? {" "}<Link to = "/login"
                    className = "text-red-700">Iniciar sesión</Link>
            </p>
        </div>
        </div>
    );
}

export default RegisterPage