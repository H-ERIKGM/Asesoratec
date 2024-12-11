import { useEffect } from "react"
import { UseSubjects } from "../context/SubjectContext";
import SubjectCard from "../components/SubjectCard"
import { Link } from "react-router-dom"
function SubjectPage(){
    const {getSubjects, subjects} = UseSubjects();
    useEffect(() => {
        getSubjects()
    }, []);

    if(subjects.length == 0) return (<div className="flex justify-end space-x-4 mb-6">
        <Link to="/add-subject">
            <button className="bg-blue-500 px-4 py-2 rounded mt-2 ">
                Agregar materias
            </button>
        </Link>
        <Link to="/classrooms">
            <button className="bg-blue-500 px-4 py-2 rounded mt-2 ">
                Salones
            </button>
        </Link>
    </div>);

    return (
        <div>
            <h1 className="text-2xl text-center text-black font-bold py-7">Materías</h1>
            <div className="flex justify-end space-x-4 mb-6">
                <Link to="/add-subject">
                    <button className="bg-blue-500 px-4 py-2 rounded mt-2 ">
                        Agregar materias
                    </button>
                </Link>
                <Link to="/classrooms">
                    <button className="bg-blue-500 px-4 py-2 rounded mt-2 ">
                        Salones
                    </button>
                </Link>
            </div>
            <div className="grid grid-cols-3 gap-1 py-7">
                {subjects.map((subject) => (
                <SubjectCard subject = {subject} key= {subject._id}/>
                ))}
            </div>
            
        </div>
    )
}
export default SubjectPage