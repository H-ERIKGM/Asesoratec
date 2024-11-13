import { Link } from "react-router-dom";
import { useClassrooms } from "../context/classroom.context";
function ClassroomCard({classroomM}) {
    const {deleteClassroom} = useClassrooms() 
  return (
        <div className = "bg-zinc-50 max-w-md w-full p-10 rounded-md">
            <header className = "flex justify-between">
                <h1 className = "text 2xl font-bold text-black">{classroomM.classroom}</h1>
                <div className = "flex gap-x-2 items-center">
                    <button className = "bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md" onClick = {() =>{
                        deleteClassroom(classroomM._id)
                    }}>Eliminar</button>
                    <Link to = {`/classrooms/${classroomM._id}`}
                    className = "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    >Editar</Link>
                </div>
            </header>
        </div>
  );
}

export default ClassroomCard