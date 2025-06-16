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

function RegisterCardUser({ registerM }) {
    const { deleteRegisters } = useRegister();
    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold text-red-400">
                    {registerM.counseling?.subject?.title || "No Subject Title"}
                </h1>
                <div className="flex gap-x-2 items-center">
                    <button
                        className="text-red-50"
                        onClick={() => deleteRegisters(registerM.id)}
                    >
                        Borrar
                    </button>
                </div>
            </header>
            <p className="text-slate-300">Estatus: {registerM.status ? "Active" : "Inactive"}</p>
            <p className="text-slate-300">
                Asesor: {registerM.counseling?.user?.name || "No Counseling User"}
            </p>
            <p className="text-slate-300">
                Fecha del registro: {formatDateTime(registerM.registerDate) || "N/A"}
            </p>
            <p className="text-slate-300">
                Hora de la asesoría:{" "}
                {registerM.counseling?.hour ? formatHourFromNumber(registerM.counseling.hour) : "N/A"}
            </p>
            <p className="text-slate-300">
                Día de la asesoría:{" "}
                {registerM.counseling?.day !== undefined
                    ? getWeekdayName(registerM.counseling.day)
                    : "N/A"}
            </p>
            <p className="text-slate-300">
                Salón: {registerM.counseling?.subject?.classroom?.classroom || "N/A"}
            </p>
        </div>
    );
}

export default RegisterCardUser;