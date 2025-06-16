import { useEffect, useState } from "react";
import { useRegister } from "../context/register.context";
import { Link } from 'react-router-dom';
import  plsImg from './imgComponents/32339.png'


function RegisterTable() {
    const { getRegisters, registers } = useRegister();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRegisters = async () => {
            await getRegisters();
            setLoading(false);
        };
        fetchRegisters();
    }, []);

    if (loading) {
        return <h2>Cargando registros...</h2>;
    }

    if (registers.length === 0) {
        return <h1 className="text-black text-bold">Sin registros :(</h1>;
    }

    return (
        
        <div>
            <div className="flex py-11 justify-between ">
                <h1 className= "text-3xl text-black font-bold my-2">Asesoría</h1>
                    <Link to="/registersCounseling">
                        <div className="transition-transform duration-300 ease-in-out hover:scale-110">
                            <img src={plsImg} alt="Plus" className="transition-transform duration-300 ease-in-out hover:scale-110" style={{ width: '20px', height: 'auto' }} />
                        </div>
                    </Link>
            </div>
            <table className="table-auto w-full border-collapse">
                <thead>
                    <tr className="text-black">
                        <th className="border-b px-4 py-2">Hora</th>
                        <th className="border-b px-4 py-2">Día</th>
                        <th className="border-b px-4 py-2">Materia</th>
                        <th className="border-b px-4 py-2">Profesor</th>
                        <th className="border-b px-4 py-2">Salón</th>
                        <th className="border-b px-4 py-2">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {registers.map((register, index) => {

                         return(
                            <tr key={register._id || `register-${index}`} // Usa _id o un índice como último recurso
                            className="text-black">
                            <td className="border-b px-4 py-2">{`${new Date(register.date).getHours()}:${new Date(register.date).getMinutes().toString().padStart(2, '0')}`}</td>
                            <td className="border-b px-4 py-2">{register.counseling?.subject?.title || "Sin usuario"}</td>
                            <td className="border-b px-4 py-2">{register.counseling?.user?.name + " " + register.counseling?.user?.last_name || "Sin profesor"}</td>
                            <td className="border-b px-4 py-2">{new Date(register.date).toLocaleString("es-MX", { weekday: "long", day: "numeric", month: "long" })}</td>
                            <td className="border-b px-4 py-2">{register.counseling?.subject?.classroom.classroom || "Sin usuario"}</td>
                            <td className="border-b px-4 py-2">{register.status ? "Activo" : "Inactivo"}</td>
                        </tr>
)})}
                </tbody>
            </table>
        </div>
    );
}

export default RegisterTable;