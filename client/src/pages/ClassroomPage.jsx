import { useEffect } from "react";
import { useClassrooms } from "../context/classroom.context";
import ClassroomCard from "../components/ClassroomCard";
import { Link } from "react-router-dom"
function ClassroomPage(){
    const { getClassrooms, classrooms } = useClassrooms();

    useEffect(() => {
        getClassrooms()
    }, [])

    if(classrooms === 0) return (<div className="flex justify-end space-x-4 mb-6">
        <Link to="/add-classroom">
                        <button className="bg-blue-500 px-4 py-2 rounded mt-2 ">
                            Agregar salones
                        </button>
                    </Link>
    </div>)
    
    return (
        <div>
            <h1 className="text-2xl text-center text-black font-bold py-7">Salones</h1>
                <div className="flex justify-end space-x-4 mb-6">
                    <Link to="/add-classroom">
                        <button className="bg-blue-500 px-4 py-2 rounded mt-2 ">
                            Agregar salones
                        </button>
                    </Link>
                </div>
            <div className = "grid sm:grid-cols-2 grid-cols-3 gap-2">
            {
                classrooms.map((classroomM) => (
                    <ClassroomCard classroomM = {classroomM} key = {classroomM._id}/> 
                ))
            }
            </div>
        </div>
        );
}

export default ClassroomPage;