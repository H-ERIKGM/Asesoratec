import { createContext, useContext, useState } from "react";
import { createCounselingsRequest, getCounselingsRequest, deleteCounselingsRequest, getCounselingRequest, updateCounselingsRequest, getTeachersRequest } from "../api/counseling";
import { getSubjectsRequest } from "../api/subjects"; // Importa el API de subjects

const CounselingContext = createContext();

export const UseCounselings = () => {
    const context = useContext(CounselingContext);
    if (!context) {
        throw new Error("UseCounselings must be used within a CounselingProvider");
    }
    return context;
};

export function CounselingProvider({ children }) {
    const [counselings, setCounselings] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const getCounselings = async () => {
        try {
            const res = await getCounselingsRequest();
            setCounselings(res.data);
            console.log("asesoriasss");
        } catch (error) {
            console.error(error);
        }
    };

    const getTeachers = async () => {
        try {
            const res = await getTeachersRequest(); // Llama al endpoint para obtener teachers
            setTeachers(res.data);
        } catch (error) {
            console.error("Error fetching teachers:", error);
        }
    };

    const getSubjects = async () => {
        try {
            const res = await getSubjectsRequest(); // Llama al endpoint para obtener subjects
            console.log("materias");
            setSubjects(res.data);
        } catch (error) {
            console.error("Error fetching subjects:", error);
        }
    };

    const createCounseling = async (counseling) => {
        try {
            const res = await createCounselingsRequest(counseling);
            
        } catch (error) {
            console.error("Error creating Counseling:", error.response?.data || error.message);
        }
    };

    const deleteCounseling = async (id) => {
        try {
            const res = await deleteCounselingsRequest(id);
            if (res.status === 204) setCounselings(counselings.filter((counseling) => counseling._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const getCounseling = async (id) => {
        try {
            const res = await getCounselingRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const updateCounseling = async (id, counseling) => {
        try {
            await updateCounselingsRequest(counseling, id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <CounselingContext.Provider
            value={{
                counselings,
                teachers,
                subjects,
                createCounseling,
                getCounselings,
                deleteCounseling,
                getCounseling,
                updateCounseling,
                getTeachers, // Exponer función de obtener teachers
                getSubjects, // Exponer función de obtener subjects
            }}
        >
            {children}
        </CounselingContext.Provider>
    );
}
