import { useDrop } from "react-dnd";
const DropZone = ({ day, hour, onDrop, content }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ["teacher", "subject"], // Asegúrate de que estos tipos coincidan
        drop: (item) => onDrop(item, day, hour),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            className={`border p-2 h-16 ${isOver ? "bg-green-400" : "bg-zinc-300 text-black"}`}
        >
            {content ? `${content.teacher?.name || content.subject?.title}` : "Insertar nombre"}
        </div>
    );
};

export default DropZone;
