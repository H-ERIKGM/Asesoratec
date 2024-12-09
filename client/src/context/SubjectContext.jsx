import { createContext, useContext, useState } from "react";
import { createSubjectsRequest, getSubjectsRequest, deleteSubjectsRequest , getSubjectRequest, updateSubjectsRequest} from "../api/subjects";

const SubjectContext = createContext();

export const UseSubjects = () => {
    const context = useContext(SubjectContext);
    if (!context) {
        throw new Error("UseSubjects must be used within a SubjectProvider");
    }
    return context;
}

export function SubjectProvider({ children }) {
    const [subjects, setSubjects] = useState([]);

    const getSubjects=async()=>{
        try{
        const res =await getSubjectsRequest()
        setSubjects(res.data);
        }catch(error){
            console.error(error);
        }

    }

    const createSubject = async (subject) => {
        try {
            const res = await createSubjectsRequest(subject);
            console.log(res);
           
        } catch (error) {
            console.error("Error creating subject:", error.response?.data || error.message);
        }
    };

    const deleteSubject=async (id) => {
        
       try{
        const res =await deleteSubjectsRequest(id);
        if(res.status == 204) setSubjects (subjects.filter((subject)=> subject._id !== id))
       }catch(error){
        console.log(error)
        }
    };

    const getSubject = async (id) => {
        try {
            const res = await getSubjectRequest(id);
            return res.data
        }
     catch(error) {
        console.error(error);
     }
    }

    const updateSubject = async (id, subject) => {
        try {
           await updateSubjectsRequest(id,subject)
        }
        catch(error){
            console.error(error);
        }
    }

    return (
        <SubjectContext.Provider value={{
            subjects,
            createSubject,
            getSubjects,
            deleteSubject,
            getSubject,
            updateSubject
        }}>
            {children}
        </SubjectContext.Provider>
    );
}
