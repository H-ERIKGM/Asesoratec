import React, { useEffect, useState } from "react";
import { UseCounselings } from "../context/counseling.context";
import DraggableItem from "../components/DraggableItem";
import DropZone from "../components/DropZone";
import { Link } from "react-router-dom";

const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
const hours = Array.from({ length: 12 }, (_, i) => 8 + i); // Horas de 8 AM a 7 PM

const dayMapping = {
    Lunes: 1,
    Martes: 2,
    Miercoles: 3,
    Jueves: 4,
    Viernes: 5,
};

function CounselingFormPage() {
    const { getTeachers, getSubjects, teachers, subjects, createCounseling } = UseCounselings();
    const [selectedTeacher, setSelectedTeacher] = useState("");
    const [teacherCards, setTeacherCards] = useState([]);
    const [schedule, setSchedule] = useState({});
    const [modalInfo, setModalInfo] = useState(null);
    const [selectedHours, setSelectedHours] = useState([]);
    const [previewRegistrations, setPreviewRegistrations] = useState([]);
    const [subjectRows, setSubjectRows] = useState({});

    useEffect(() => {
        getTeachers();
        getSubjects();
    }, []);

    const handleAddTeacher = () => {
        const teacher = teachers.find((t) => t._id === selectedTeacher);
        if (teacher && !teacherCards.some((t) => t._id === teacher._id)) {
            setTeacherCards((prev) => [...prev, { ...teacher, type: "teacher" }]);
        }
    };

    const handleDropTeacher = (teacher, subjectId, rowIndex) => {
        setSchedule((prev) => ({
            ...prev,
            [`${subjectId}-${rowIndex}`]: {
                ...(prev[`${subjectId}-${rowIndex}`] || {}),
                teacher,
            },
        }));
    };

    const handleOpenModal = (day, subjectId, rowIndex) => {
        if (!schedule[`${subjectId}-${rowIndex}`]?.teacher) {
            alert("Please assign a teacher to this subject row before selecting hours.");
            return;
        }
        setModalInfo({ day: dayMapping[day], subjectId, rowIndex });
    };
    

    const handleConfirmHours = () => {
        const newRegistrations = selectedHours.map((hour) => ({
            hour,
            day: modalInfo.day,
            user: schedule[`${modalInfo.subjectId}-${modalInfo.rowIndex}`]?.teacher?._id,
            subject: modalInfo.subjectId,
        }));

        setPreviewRegistrations((prev) => [...prev, ...newRegistrations]);
        setSelectedHours([]);
        setModalInfo(null);
    };

    const handleAddRow = (subjectId) => {
        setSubjectRows((prev) => ({
            ...prev,
            [subjectId]: (prev[subjectId] || 1) + 1,
        }));
    };

    const handleDeletePreview = (index) => {
        setPreviewRegistrations((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="p-4">
            {/* Combo box para filtrar y agregar tarjetas de maestros */}
            <div className="flex space-x-4 mb-4">
                <div>
                    <h2 className=" text-black font-bold mb-2">Docente</h2>
                    <select
                        className="text-gray-500 border p-2 rounded w-full"
                        value={selectedTeacher}
                        onChange={(e) => setSelectedTeacher(e.target.value)}
                    >
                        <option className="text-black font-bold mb-2" value="">Selecciona un docente</option>
                        {teachers.map((teacher) => (
                            <option className= "text-black font-bold mb-2" key={teacher._id} value={teacher._id}>
                                {teacher.name} {teacher.last_name}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleAddTeacher}
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                    >
                        Añadir
                    </button>
                </div>
                <div>
                    <Link to="/subjects">
                        <button className="bg-blue-500 px-4 py-2 rounded mt-2 ">
                            Materias
                        </button>
                    </Link>
                </div>
            </div>

            {/* Tarjetas de maestros seleccionados */}
            <div className="flex text-black flex-wrap gap-4 mb-8">
                {teacherCards.map((teacher) => (
                    <DraggableItem key={teacher._id} item={teacher} />
                ))}
            </div>

            {/* Tabla de Asesorías */}
            <div className="grid grid-cols-7 gap-4">
                <div className="text-center font-bold bg-zinc-800 p-2">Materias</div>
                <div className="text-center font-bold bg-zinc-800 p-2">Maestros</div>
                {days.map((day) => (
                    <div key={day} className="text-center font-bold bg-zinc-800 p-2">
                        {day}
                    </div>
                ))}

                {subjects.map((subject) => (
                    <React.Fragment key={subject._id}>
                        {Array.from({ length: (subjectRows[subject._id] || 1) }).map((_, rowIndex) => (
                            <React.Fragment key={`${subject._id}-${rowIndex}`}>
                                <div className="text-center border p-2 bg-zinc-500">
                                    {rowIndex === 0 ? (
                                        <div className="flex justify-between items-center">
                                            {subject.title}
                                            <button
                                                className="bg-green-500 text-white px-2 py-1 rounded"
                                                onClick={() => handleAddRow(subject._id)}
                                            >
                                                Añadir
                                            </button>
                                        </div>
                                    ) : (
                                        <span>{subject.title} ({rowIndex + 1})</span>
                                    )}
                                </div>

                                <DropZone
                                    key={`${subject._id}-${rowIndex}-teacher`}
                                    onDrop={(item) => handleDropTeacher(item, subject._id, rowIndex)}
                                    accept="teacher"
                                >
                                    {schedule[`${subject._id}-${rowIndex}`]?.teacher ? (
                                        <span className="text-white">{schedule[`${subject._id}-${rowIndex}`].teacher.name}</span>
                                    ) : (
                                        <span className="text-white">Insertar nombre aquí</span>
                                    )}
                                </DropZone>

                                                                        {days.map((day) => (
                                            <div
                                                key={`${subject._id}-${rowIndex}-${day}`}
                                                className="border p-2 bg-zinc-300 text-center"
                                            >
                                                <button
                                                    className={`text-blue-500 underline ${
                                                        !schedule[`${subject._id}-${rowIndex}`]?.teacher ? "opacity-50 cursor-not-allowed" : ""
                                                    }`}
                                                    onClick={() => handleOpenModal(day, subject._id, rowIndex)}
                                                    disabled={!schedule[`${subject._id}-${rowIndex}`]?.teacher}
                                                >
                                                    Seleccionar hora
                                                </button>
                                            </div>
                                        ))}

                            </React.Fragment>
                        ))}
                    </React.Fragment>
                ))}
            </div>

            {/* Modal para Seleccionar Horas */}
            {modalInfo && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded shadow-lg">
                        <h2 className="text-black font-bold mb-2">
                            Horas para {Object.keys(dayMapping).find(
                                (key) => dayMapping[key] === modalInfo.day
                            )}{" "}
                            - {subjects.find((s) => s._id === modalInfo.subjectId)?.title} (Linea {" "}
                            {modalInfo.rowIndex + 1})
                        </h2>
                        <div className="grid grid-cols-4 gap-2">
                            {hours.map((hour) => (
                                <label key={hour} className="text-black flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        value={hour}
                                        checked={selectedHours.includes(hour)}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value, 10);
                                            setSelectedHours((prev) =>
                                                prev.includes(value)
                                                    ? prev.filter((h) => h !== value)
                                                    : [...prev, value]
                                            );
                                        }}
                                    />
                                    <span>{hour}:00</span>
                                </label>
                            ))}
                        </div>
                        <div className="mt-4 flex space-x-2">
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded"
                                onClick={handleConfirmHours}
                            >
                                Confirm
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={() => setModalInfo(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Preview de Registros */}
            <div className="mt-8">
                <h2 className="text-black font-bold mb-2">Resultado</h2>
                {previewRegistrations.length > 0 ? (
                    <table className="table-auto w-full border">
                        <thead className="bg-zinc-800">
                            <tr>
                                <th className="text-white font-bold border px-4 py-2">Día</th>
                                <th className="text-white font-bold border px-4 py-2">Hora</th>
                                <th className="text-white font-bold border px-4 py-2">Docente</th>
                                <th className="text-white font-bold border px-4 py-2">Materia</th>
                                <th className="text-white font-bold border px-4 py-2"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-zinc-300">
                            {previewRegistrations.map((reg, index) => (
                                <tr key={index}>
                                    <td className="text-black border px-4 py-2">{days[reg.day - 1]}</td>
                                    <td className="text-black border px-4 py-2">{reg.hour}:00</td>
                                    <td className="text-black border px-4 py-2">
                                        {teachers.find((t) => t._id === reg.user)?.name || "N/A"}
                                    </td>
                                    <td className="text-black border px-4 py-2">
                                        {subjects.find((s) => s._id === reg.subject)?.title || "N/A"}
                                    </td>
                                    <td className="text-black border px-4 py-2 text-center">
                                        <button
                                            onClick={() => handleDeletePreview(index)}
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                        >
                                            Borrar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No registrations yet.</p>
                )}
            </div>

            <button
                className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                onClick={() => {
                    previewRegistrations.forEach((reg) => {
                        createCounseling(reg);
                    });
                    setPreviewRegistrations([]); // Limpia los registros en progreso después de enviar
                }}
            >
                Confirmar and guardar
            </button>
        </div>
    );
}

export default CounselingFormPage;
