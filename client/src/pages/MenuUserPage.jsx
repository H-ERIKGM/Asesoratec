import { useEffect, useState } from "react";
import { useRegister } from "../context/register.context";
import RegisterCardUser from "../components/RegisterCardUser";
import { Link } from "react-router-dom";
import plsImg from "./img/32339.png";

function MenuUserPage() {
    const { getRegisters, registers } = useRegister();
    const [filter, setFilter] = useState("all"); // '48hours', '7days', 'all'
    const [filteredRegisters, setFilteredRegisters] = useState([]);

    useEffect(() => {
        getRegisters();
    }, []);

    useEffect(() => {
        const now = new Date();

        let filtered = registers;

        if (filter === "48hours") {
            const in48Hours = new Date(now.getTime() + 48 * 60 * 60 * 1000);
            filtered = registers.filter(
                (reg) => new Date(reg.registerDate) >= now && new Date(reg.registerDate) <= in48Hours
            );
        } else if (filter === "7days") {
            const in7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
            filtered = registers.filter(
                (reg) => new Date(reg.registerDate) >= now && new Date(reg.registerDate) <= in7Days
            );
        }

        setFilteredRegisters(filtered);
    }, [filter, registers]);

    return (
        <div className="p-4">
            {/* Línea del Tiempo */}
            <div className="border rounded-lg shadow-md p-4 bg-red-75">
                <div className="flex justify-end space-x-4 mb-6">   
                    <Link to="/registersCounseling">
                        <button className="flex justify-between items-center p-2 bg-gray-200 rounded-lg">
                            <img
                            src={plsImg}
                            alt="Plus"
                            className="transition-transform duration-300 ease-in-out hover:scale-90"
                            style={{ width: '20px', height: 'auto', maxWidth: '100%' }} // Asegura que la imagen no se desborde
                            />
                        </button>
                    </Link>
                </div>
                <h2 className="text-3xl text-black font-bold mb-4 text-center">Asesorías</h2>
                {/* Botones de Filtro */}
                <div className="flex justify-center space-x-4 mb-6">
                    <button
                        onClick={() => setFilter("all")}
                        className={`px-4 py-2 rounded ${
                            filter === "all" ? "bg-blue-500 font-bold text-white" : "bg-gray-300"
                        }`}
                    >
                        Todas
                    </button>
                    <button
                        onClick={() => setFilter("48hours")}
                        className={`px-4 py-2 rounded ${
                            filter === "48hours" ? "bg-blue-500 font-bold text-white" : "bg-gray-300"
                        }`}
                    >
                        En 48 horas
                    </button>
                    <button
                        onClick={() => setFilter("7days")}
                        className={`px-4 py-2 rounded ${
                            filter === "7days" ? "bg-blue-500 font-bold text-white" : "bg-gray-300"
                        }`}
                    >
                        En 7 días
                    </button>
                </div>

                {/* Registros en Línea del Tiempo */}
                <div className="grid grid-cols-3 gap-4">
                    {filteredRegisters.length > 0 ? (
                        filteredRegisters.map((registerM) => (
                            <RegisterCardUser registerM = {registerM} key = {registerM.id} />
                        ))
                    ) : (
                        <div className="col-span-3 text-center text-gray-500">
                            No registers found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MenuUserPage;
