import { useDrag } from "react-dnd";

const DraggableItem = ({ item }) => {
    if (!item.type) {
        console.error("DraggableItem requires a type:", { item });
        return <div className="bg-red-100 text-red-500 p-2">Invalid Item</div>;
    }

    const [{ isDragging }, drag] = useDrag(() => ({
        type: item.type, // Este campo debe estar definido
        item,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={`p-2 border rounded ${isDragging ? "opacity-50" : "opacity-100"}`}
        >
            {item.title || item.name || "Untitled"}
        </div>
    );
};

export default DraggableItem;
