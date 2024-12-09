import { useForm } from "react-hook-form";
import { useAuth } from "../context/auth.context"; 
import { UseSubjects } from "../context/SubjectContext";
import axios from '../api/axios'; // Asegúrate de que `axios` esté correctamente configurado con `baseURL`
import Select from 'react-select';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

function SubjectFormPage() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { createSubject, getSubject, updateSubject } = UseSubjects();
    const { errors: RegisterErrors } = useAuth();
    const [classrooms, setClassrooms] = useState([]);
    const navigate= useNavigate();
    const params = useParams();
  
    useEffect(()=> {
        async function loadSubject(){
        if(params.id) {
            const subject =await getSubject(params.id)
            console.log(subject)
            setValue('title', subject.title)
            setValue('hourStart', subject.hourStart)
            setValue('hourFinish', subject.hourFinish)
            setValue('classroom', subject.classroom)

        }
    }
    loadSubject() 
    }, []);
  
    useEffect(() => {
        // Función para obtener los classrooms del backend
        async function fetchClassrooms() {
            try {
                const response = await axios.get('/classrooms'); // Asegúrate de que esta ruta sea correcta en el backend
                console.log('Classrooms data:', response.data); // Verifica los datos obtenidos
                setClassrooms(response.data); // Almacena la lista de classrooms en el estado
            } catch (error) {
                console.error("Error fetching classrooms:", error);
            }
        }
        fetchClassrooms();
    }, []);

    // Genera las opciones del combo box de classrooms usando forEach
    const classroomOptions = [];
    classrooms.forEach((classroom) => {
        classroomOptions.push({
            value: classroom._id, // El ID del classroom se usará como valor
            label: classroom.classroom // Nombre del classroom que se muestra en el combo box
        });
    });

    const onSubmit = handleSubmit((data) => {
        if(params.id) {
            updateSubject(params.id, data)
        }else{
            createSubject(data);
     
        }
        navigate('/subjects')
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
            <h1 className= "text-3xl text-white font-bold my-2">Registro de materias</h1>
            {/* Formulario */}
            <form onSubmit={onSubmit}>
                {/* Campo de título */}
                <label className="text-white" htmlFor="title">Materia</label>
                <input
                    type="text"
                    placeholder="Materia"
                    {...register("title", { required: true })}
                    className="w-full bg-white-700 text-black px-4 py-2 rounded-md my-2"
                    autoFocus
                />
                {errors.title && <p className="text-red-500">Se requiere la materia</p>}

                {/* Campo de hora de inicio */}
                <label className="text-white">Hora de inicio</label>
                <input
                
                    type="time"
                    {...register("hourStart", { required: true })}
                    className="w-full bg-white-700 text-black px-4 py-2 rounded-md my-2"
                    placeholder="Hora de inicio"
                />
                {errors.hourStart && (
                    <p className="text-red-500">Se requiere la hora de inicio</p>
                )}

                {/* Campo de hora de finalización */}
                <label className="text-white">Hora de finalización</label>
                <input
                    type="time"
                    {...register("hourFinish", { required: true })}
                    className="w-full bg-white-700 text-black px-4 py-2 rounded-md my-2"
                    placeholder="Hora de finalización"
                />
                {errors.hourFinish && (
                    <p className="text-red-500">Se requiere la hora de finalización</p>
                )}

                {/* Combo box para seleccionar el classroom */}
                <div className="my-2">
                    <label className="text-white">Salón</label>
                    <Select
                        options={classroomOptions} // Opciones generadas con forEach
                        onChange={(selectedOption) => setValue("classroom", selectedOption.value)} // Guarda el ID seleccionado en el campo `classroom`
                        placeholder="Selecciona un aula"
                        className="text-black w-full"
                    />
                    {errors.classroom && <p className="text-red-500">Se requiere el salón</p>}
                </div>
                

                {/* Botón de envío */}
                <button type="submit" className=" bg-green-500 text-white px-4 py-2 rounded-md mt-4">
                    Guardar
                </button>
            </form>
        </div>
        </div>
    );
}

export default SubjectFormPage;
