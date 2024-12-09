import { useRegister } from "../context/register.context";
import { useState } from "react";

function formatHourFromNumber(hour) {
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = ((hour % 12) || 12);
    return `${formattedHour}:00 ${period}`;
}

function getWeekdayName(day) {
    const weekdaysES = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    return weekdaysES[day-1] || "Invalid Day"; // Maneja valores no válidos
}

function CounselingCard({ counselingsM }) {
    const { createRegister } = useRegister();
    const [successMessage, setSuccessMessage] = useState("");

    const handleSelect = async () => {
        const newRegister = {
            counseling: counselingsM._id,    
            status: true,                  
        };

        try {
            await createRegister(newRegister); 
            setSuccessMessage("¡Registro exitoso!"); 
        } catch (error) {
            console.error("Error al guardar el registro:", error);
            setSuccessMessage("Hubo un error al guardar el registro. Inténtalo de nuevo.");
        }
    };

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold text-red-400">{counselingsM.subject?.title || "Sin título"}</h1>
            </header>
            <p className="text-2xl font-bold text-slate-300">{counselingsM.user.name || "Sin nombre"} {counselingsM.user.last_name || "Sin apellidos"}
            </p>
            <p className="text-slate-300">
                Hora de la asesoría:{" "}
                {counselingsM.hour ? formatHourFromNumber(counselingsM.hour) : "N/A"}
            </p>
            <p className="text-slate-300">
                Día de la asesoría:{" "}
                {counselingsM.day !== undefined
                    ? getWeekdayName(counselingsM.day)
                    : "N/A"}
            </p>
            <p className="text-slate-300">Salón: {counselingsM.subject?.classroom?.classroom || "Sin salón"}</p>
            
            <button
                onClick={handleSelect}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                Seleccionar
            </button>
            {successMessage && (
                <p className="mt-4 text-green-500 font-semibold">{successMessage}</p> // Muestra el mensaje de éxito o error
            )}
        </div>
    );
}

export default CounselingCard;