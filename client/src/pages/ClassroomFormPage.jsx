import {useForm} from 'react-hook-form'
import { useClassrooms } from '../context/classroom.context';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function ClassroomFormPage(){
    const {register, handleSubmit, setValue} = useForm();
    const {createClassroom, getClassroom, updateClassroom} = useClassrooms();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const loadClassroom = async () => {
          if (params.id) {
            const classroom = await getClassroom(params.id);
            setValue("classroom", classroom.classroom);
          }
        };
        loadClassroom();
    }, []);
    
    const onSubmit = handleSubmit((data) =>{
        if (params.id) {
            updateClassroom(params.id, data)
        } else {
            createClassroom(data);
        }
        navigate('/classrooms')
    })
    
    return (
        <div className = "flex h-[calc(100vh)] items-center justify-center">
        <div className = "bg-yellow-75 max-w-md w-full p10 rounded-md">
            <form onSubmit = {onSubmit}>
                <label htmlFor = "classroom" className='text-black'>Salón</label>
                <input type = "text" placeholder = "Salón"
                {...register("classroom")}
                className = 'border-red-950 w-full bg-zinc-50 text-black px-4 py-2 rounded-md my-2' 
                autoFocus
                />
                <button className = "bg-red-950 px-3 py-2 rounded-md">
                    Guardar
                </button>
            </form>
        </div>
        </div>
    )
}

export default ClassroomFormPage;