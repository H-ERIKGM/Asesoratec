import { useEffect } from "react";
import { useClassrooms } from "../context/classroom.context";
import ClassroomCard from "../components/ClassroomCard";
function ClassroomPage(){
    const { getClassrooms, classrooms } = useClassrooms();

    useEffect(() => {
        getClassrooms()
    }, [])

    if(classrooms === 0) return (<h1>Sin salones</h1>)
    
    return (
        <div className = "grid sm:grid-cols-2 md:grid-cols-3 gap-2">
        {
            classrooms.map((classroomM) => (
                <ClassroomCard classroomM = {classroomM} key = {classroomM._id}/> 
            ))
        }
        </div>
        );
}

export default ClassroomPage;