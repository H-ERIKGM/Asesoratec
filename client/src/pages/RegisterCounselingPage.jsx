import { useEffect } from "react";
import { UseCounselings } from "../context/counseling.context";
import CounselingCard from "../components/CounselingCard";
function RegisterCounselingPage(){
    const { getCounselings, counselings } = UseCounselings();

    useEffect(() => {
        getCounselings()
    }, [])

    if(counselings === 0) return (<h1>Sin Asesorías :(</h1>)
    return (
        <div>
            <h1 className="text-2xl text-center text-black font-bold py-7">Asesorías disponibles</h1>
            <div className = "grid sm:grid-cols-2 grid-cols-3 gap-2">
            {
                counselings.map((counselingsM) => (
                    <CounselingCard counselingsM = {counselingsM} key = {counselingsM._id}/> 
                ))
            }
            </div>
        </div>
        );
}

export default RegisterCounselingPage;