import { UseSubjects } from "../context/SubjectContext";
import {Link} from "react-router-dom"
function SubjectCard({subject}){

    const {deleteSubject} = UseSubjects()

    return(
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
                <header className="flex justify-between">
                <h1 className="text-2xl font-bold text-red-400">{subject.title}</h1> 
                <div className="flex gap-x-2 items-center">
                    <button className="text-red-50" onClick={()=>
                        {deleteSubject(subject._id)}
                    }>delete</button>
                   
                      <Link to= {`/subjects/${subject._id}`}>  edit</Link> 
                </div>
                </header>
                <p className="text-slate-300">Hora de inicio: {" "}{subject.hourStart}</p>
                <p className="text-slate-300">Hora de finalización: {" "}{subject.hourFinish}</p>
                <p className="text-slate-300">Salón: {" "} {subject.classroom.classroom}</p>
                </div>
    );
}
export default SubjectCard;