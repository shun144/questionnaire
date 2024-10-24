import { memo } from 'react';
import { useDraggable } from "@dnd-kit/core";
type Props = {
  id: string;
  label: string;
  btnColor?: string;
};

const Draggable = ({ id, label, btnColor = "indigo" }: Props) => {
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
      }}
      className='w-[80%]'
    >
      <div
        className={`flex justify-center items-center bg-stone-200 h-16 text-${btnColor}-500 font-extrabold border-4 border-${btnColor}-500 rounded-lg shadow transition-all duration-300
        hover:bg-${btnColor}-600 hover:text-stone-300 hover:border-slate-200 hover:shadow-xl`}
        style={{
          cursor: isDragging ? "grabbing" : "grab",
          opacity: isDragging ? 0.5 : undefined,
        }}>
        <p className="text-center select-none">{label}</p>
      </div >
    </div>
  );
};

export default memo(Draggable);