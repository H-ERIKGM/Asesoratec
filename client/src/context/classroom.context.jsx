import { createContext, useContext, useState } from "react";
import {createClassroomRequest, 
    getClassroomsRequest, 
    deleteClassroomRequest, 
    getClassroomRequest, 
    updateClassroomRequest} from '../api/classroom'
const classroomContext = createContext();

export const useClassrooms = () => {
    const context = useContext(classroomContext);
    if(!context){
        throw new Error("useClassroom must be used within a classroomProvider");
    }
    return context;
}

export function ClassroomProvider({children}){
    const [classrooms, setClassrooms] = useState([]);

    const getClassrooms = async () => {
        try{
            const res = await getClassroomsRequest();
            setClassrooms(res.data)
        }catch(error){
            console.error(error);
        }
    };

    const deleteClassroom = async (id) => {
        try {
          const res = await deleteClassroomRequest(id);
          if (res.status === 204) setClassrooms(classrooms.filter((classroom) => classroom._id !== id));
        } catch (error) {
          console.log(error);
        }
    };

    const createClassroom = async (classroom) => {
        const res = await createClassroomRequest(classroom);
    };

    const getClassroom = async (id) => {
        try {
          const res = await getClassroomRequest(id);
          return res.data;
        } catch (error) {
          console.error(error);
        }
    };

    const updateClassroom = async (id, classroom) => {
        try {
          await updateClassroomRequest(id, classroom);
        } catch (error) {
          console.error(error);
        }
    };

    return(
        <classroomContext.Provider 
        value = {{
            classrooms,
            createClassroom,
            getClassrooms,
            deleteClassroom,
            getClassroom,
            updateClassroom
            }}
            >
            {children}
        </classroomContext.Provider>
    )
}