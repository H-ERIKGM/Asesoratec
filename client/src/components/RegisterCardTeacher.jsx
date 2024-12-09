import { useRegister } from "../context/register.context";

function formatDateTime(dateString) {
    const options = {
        weekday: "long", // Día de la semana completo
        hour: "numeric",
        minute: "numeric",
        hour12: true, // AM/PM
    };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-ES", options).format(date);
}

function formatHourFromNumber(hour) {
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = ((hour % 12) || 12);
    return `${formattedHour}:00 ${period}`;
}

function getWeekdayName(day) {
    const weekdaysES = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    return weekdaysES[day-1] || "Invalid Day"; // Maneja valores no válidos
}

function RegisterCardTeacher({ register }) {
    const { deleteRegister } = useRegister();

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold text-red-400">
                    {register.counseling?.subject?.title || "No Subject Title"}
                </h1>
                <div className="flex gap-x-2 items-center">
                    <button
                        className="text-red-50"
                        onClick={() => deleteRegister(register._id)}
                    >
                        Borrar
                    </button>
                </div>
            </header>
            <p className="text-slate-300">Estatus: {register.status ? "Activo" : "Inactivo"}</p>
            <p className="text-slate-300">
                Alumno: {register.user?.name || "No User Found"} ({register.user?.email || "No Email"})
            </p>
            <p className="text-slate-300">
                Asesor: {register.counseling?.user?.name || "No Counseling User"}
            </p>
            <p className="text-slate-300">
                Fecha del registro: {formatDateTime(register.registerDate) || "N/A"}
            </p>
            <p className="text-slate-300">
                Hora de la asesoría:{" "}
                {register.counseling?.hour ? formatHourFromNumber(register.counseling.hour) : "N/A"}
            </p>
            <p className="text-slate-300">
                Día de la asesoría:{" "}
                {register.counseling?.day !== undefined
                    ? getWeekdayName(register.counseling.day)
                    : "N/A"}
            </p>
            <p className="text-slate-300">
                Salón: {register.counseling?.subject?.classroom?.classroom || "N/A"}
            </p>
        </div>
    );
}

export default RegisterCardTeacher;
