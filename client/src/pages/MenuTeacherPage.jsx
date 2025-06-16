import { useEffect, useState } from "react";
import { useRegister } from "../context/register.context";
import RegisterCardTeacher from "../components/RegisterCardTeacher";

function MenuTeacherPage() {
    const { getRegisters, registers } = useRegister();
    const [filter, setFilter] = useState("all"); 
    const [filteredRegisters, setFilteredRegisters] = useState([]);

    useEffect(() => {
        getRegisters();
    }, []);

    useEffect(() => {
        const now = new Date();
    
        let filtered = registers;
    
        if (filter === "48hours") {
            const in48Hours = new Date(now.getTime() + 48 * 60 * 60 * 1000);
            filtered = registers.filter((reg) => {
                const counselingDateTime = createDateTime(reg.counseling?.day, reg.counseling?.hour);
                return counselingDateTime && counselingDateTime >= now && counselingDateTime <= in48Hours;
            });
        } else if (filter === "7days") {
            const in7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
            filtered = registers.filter((reg) => {
                const counselingDateTime = createDateTime(reg.counseling?.day, reg.counseling?.hour);
                return counselingDateTime && counselingDateTime >= now && counselingDateTime <= in7Days;
            });
        }
    
        setFilteredRegisters(filtered);
    }, [filter, registers]);
    
    const createDateTime = (day, hour) => {
        if (!day || !hour) return null;
    
        const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayIndex = weekDays.indexOf(day);
    
        if (dayIndex === -1) return null; 
    
        const now = new Date();
        const currentDayIndex = now.getDay();
    
        const daysUntilTarget = (dayIndex >= currentDayIndex)
            ? dayIndex - currentDayIndex
            : 7 - (currentDayIndex - dayIndex);
    
        const targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysUntilTarget);
    
        const timeMatch = hour.match(/(\d+):(\d+)\s?(am|pm)/i);
        if (!timeMatch) return null;
    
        let [_, hours, minutes, period] = timeMatch;
        hours = parseInt(hours, 10);
        minutes = parseInt(minutes, 10);
    
        if (period.toLowerCase() === "pm" && hours !== 12) hours += 12;
        if (period.toLowerCase() === "am" && hours === 12) hours = 0;
    
        targetDate.setHours(hours, minutes, 0, 0); 
    
        return targetDate;
    };

    return (
        <div className="p-4">
            {/* Línea del Tiempo */}
            <div className="border rounded-lg shadow-md p-4 bg-red-75">
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
                        En 7 Días
                    </button>
                </div>

                {/* Registros en Línea del Tiempo */}
                <div className="grid grid-cols-3 gap-4">
                    {filteredRegisters.length > 0 ? (
                        filteredRegisters.map((register) => (
                            <RegisterCardTeacher register={register} key={register._id} />
                        ))
                    ) : (
                        <div className="col-span-3 text-center text-gray-500">
                            Sin asesorías :(.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MenuTeacherPage;
