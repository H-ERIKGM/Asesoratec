import { createContext, useContext } from "react";
//import {createTaskRequest} from '../api/classroom'
const classroomContext = createContext();

export const useClassroom = () => {
    const context = useContext(classroomContext);
    if(!context){
        throw new Error("useClassroom must be used within a classroomProvider");
    }
}

export function classroomProvider({children}){
    const [classroom, setClassroom] = useState([]);

    const createClassroom = (classroom) => {

    }
    return(
        <classroomContext.Provider 
        value = {{
            classroom,
            createClassroom
            }}
            >
            {children}
        </classroomContext.Provider>
    )
}