import { useEffect } from "react";
import { useRegister } from "../context/register.context";

function formatDate(date) {
    const options = {
        weekday: 'long', // Día de la semana completo (e.g., "Monday")
        year: 'numeric', // Año con 4 dígitos
        month: 'long', // Nombre del mes completo (e.g., "December")
        day: 'numeric', // Día del mes
    };
    return new Date(date).toLocaleDateString('es-ES', options);
}
function formatHourFromNumber(hour) {
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = ((hour % 12) || 12);
    return `${formattedHour}:00 ${period}`;
}

function getWeekdayName(day) {
    const weekdaysES = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    return weekdaysES[day-1] || "Invalid Day"; // Maneja valores no válidos
}
function HistoricalPage() {
    const { getRegisters, registers } = useRegister();

    useEffect(() => {
        getRegisters()
    }, [])

    if(registers.length === 0) return (<h1 className="text-black text-bold">Sin registros :(</h1>)
  return (
    <div className="container mx-auto p-4">
    <table className="min-w-full border-collapse border border-red-75">
        <thead>
            <tr className="bg-red-950">
                <th className="text-white text-bold border border-red-950 px-4 py-2">Usuario</th>
                <th className="text-white text-bold border border-red-950 px-4 py-2">Asesoria</th>
                <th className="text-white text-bold border border-red-950 px-4 py-2">Docente</th>
                <th className="text-white text-bold border border-red-950 px-4 py-2">Fecha de registro</th>
                <th className="text-white text-bold border border-red-950 px-4 py-2">Hora de la asesoria</th>
                <th className="text-white text-bold border border-red-950 px-4 py-2">Día de la asesoria</th>
                <th className="text-white text-bold border border-red-950 px-4 py-2">Estatus</th>
            </tr>
        </thead>
        <tbody>
            {registers.map((item) => (
                <tr item = {item} key = {item._id} className="text-center odd:bg-white even:bg-gray-300">
                    <td className="text-black border border-red-950 px-4 py-2">{item.user.name}</td>
                    <td className="text-black border border-red-950 px-4 py-2">{item.counseling?.subject?.title}</td>
                    <td className="text-black border border-red-950 px-4 py-2">{item.counseling?.user?.name} {item.counseling?.user?.last_name}</td>
                    <td className="text-black border border-red-950 px-4 py-2">{formatDate(item.registerDate)}</td>
                    <td className="text-black border border-red-950 px-4 py-2">{item.counseling?.hour ? formatHourFromNumber(item.counseling.hour) : "N/A"}</td>
                    <td className="text-black border border-red-950 px-4 py-2"> {item.counseling.day !== undefined
                    ? getWeekdayName(item.counseling.day)
                    : "N/A"}</td>
                    <td className="text-black border border-red-950 px-4 py-2">{item.status ? "Activo" : "Inactivo"}</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
  )
}

export default HistoricalPage