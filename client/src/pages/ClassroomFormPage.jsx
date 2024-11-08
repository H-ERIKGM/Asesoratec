import {useForm} from 'react-hook-form'
import { useClassroom } from '../context/classroom.context';

function ClassroomFormPage(){
    const {register, handleSubmit} = useForm();
    const {createClassroom} = useClassroom();

    const onSubmit = handleSubmit((data) =>{

    })
    
    return (
        <div className = "bg-yellow-75 max-w-md w-full p10 rounded-md">
            <form>
                <input type = "text" placeholder = "Salón"
                {...register("classroom")}
                className = 'w-full bg-zinc-50 text-black px-4 py-2 rounded-md my-2' 
                autoFocus
                />
                <button>
                    Guardar
                </button>
            </form>
        </div>
    )
}

export default ClassroomFormPage;