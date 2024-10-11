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
      <DraggableBlockSource isDragging={isDragging} label={label} />
    </div>
  );
};
