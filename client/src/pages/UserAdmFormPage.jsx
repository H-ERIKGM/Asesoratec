import { useForm } from "react-hook-form";
import { useAuth } from "../context/auth.context"; 
import { UseUsers } from "../context/UserAdmContext";
import React, {  useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

function UserAdmFormPage() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { createUser, getUser, updateUser, } = UseUsers();
    const { errors: RegisterErrors } = useAuth();
    const params = useParams();
    const navigate= useNavigate();
  
    useEffect(()=> {
        async function loadUser(){
        if(params.id) {
            const user =await getUser(params.id)
            console.log(user)
            setValue('name', user.name)
            setValue('last_name', user.last_name)
            setValue('password', user.password)
            setValue('phone', user.phone)
            setValue('email', user.email)
            setValue('role', user.role)
        }
    }
    loadUser() 
    }, []);
  

    const onSubmit = handleSubmit(async (data) => {
        try {
            console.log(params._id, data)
            if (params._id) {
                await updateUser(params._id, data); // Espera a que se complete la actualización
            } else {
                await createUser(data); // Espera a que se complete la creación
            }
            navigate('/users'); // Navega a /users después de que la promesa se resuelva
        } catch (error) {
            console.error("Error in form submission:", error);
        }
    });
    

    return (
        <div className="flex h-[calc(100vh)] items-center justify-center">
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            {/* Mostrar errores de autenticación si los hay */}
            {RegisterErrors && RegisterErrors.map((error, i) => (
                <div className="bg-red-500 p-2 text-black" key={i}>
                    {error}
                </div>
            ))}
            <h1 className= "text-3xl text-white font-bold my-2">Añadir usuarios</h1>
            {/* Formulario */}
            <form onSubmit={onSubmit}>
                {/* Campo de título */}
                <label className="text-white" htmlFor="Name">Nombre</label>
                <input
                    type="text"
                    placeholder="Name"
                    {...register("name", { required: true })}
                    className="w-full text-black px-4 py-2 rounded-md my-2"
                    autoFocus
                />
                {errors.title && <p className="text-red-500">Se requiere el nombre</p>}

                
                <label className="text-white">Apellido</label>
                <input
                
                    type="text"
                    {...register("last_name", { required: true })}
                    className="w-full bg-white-700 text-black px-4 py-2 rounded-md my-2"
                    placeholder="Last Name"
                />
                {errors.lastName && (
                    <p className="text-red-500">Se requiere el apellido</p>
                )}

                    <label className="text-white">Correo</label>
                <input
                
                    type="email"
                    {...register("email", { required: true })}
                    className="w-full bg-white-700 text-black px-4 py-2 rounded-md my-2"
                    placeholder="Email"
                />
                {errors.email && (
                    <p className="text-red-500">Se requiere el correo</p>
                )}

                    <label className="text-white">Teléfono</label>
                <input
                
                    type="number"
                    {...register("phone", { required: true })}
                    className="w-full bg-white-700 text-black px-4 py-2 rounded-md my-2"
                    placeholder="Phone"
                />
                {errors.phone && (
                    <p className="text-red-500">Se requiere el teléfono</p>
                )}
                
                <label className="text-white">Rol</label>
                    <select
                        {...register("role", { required: true })}
                        className="w-full bg-white-700 text-black px-4 py-2 rounded-md my-2"
                    >
                        <option value="">Selecciona el Rol</option> {/* Opción por defecto */}
                        <option value="teacher">Docente</option>
                        <option value="user">Alumno</option>
                        <option value="admin">Administrador</option>
                    </select>
                    {errors.role && (
                        <p className="text-red-500">Se requiere el rol</p>
                    )}

                

                {/* Botón de envío */}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
                    Guardar
                </button>
            </form>
        </div>
        </div>
    );
}

export default UserAdmFormPage;
