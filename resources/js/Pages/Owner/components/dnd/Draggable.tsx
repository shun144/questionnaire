import { useDraggable } from "@dnd-kit/core";
import { DraggableBlockSource } from "./DraggableBlockSource";

type Props = {
  id: string;
  label: string;
};

export const Draggable = ({ id, label }: Props) => {
  const {
    setNodeRef,
    listeners,
    attributes,
    transform,
    isDragging
  } = useDraggable({
    id
  });

  const transformStyle = transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: transformStyle,
        height: "fit-content",
        width: "130px"
      }}

    >
      <div
        className="flex justify-center items-center bg-slate-500 h-20 text-white rounded shadow transition-all hover:bg-slate-600 hover:shadow-xl"
        style={{
          cursor: isDragging ? "grabbing" : "grab",
          opacity: isDragging ? 0.5 : undefined,
        }}>
        <p className="text-center select-none">{label}</p>
      </div >
      {/* <DraggableBlockSource isDragging={isDragging} label={label} /> */}
    </div>
  );
};
