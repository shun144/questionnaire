import { useDroppable } from "@dnd-kit/core";
import { FC, ReactNode } from "react";

type DroppableProp = {
  id: string;
  children: ReactNode;
};

export const Droppable: FC<DroppableProp> = ({ children, id }) => {
  const { setNodeRef, isOver } = useDroppable({
    id
  });
  return (
    <div
      ref={setNodeRef}
      className='bg-slate-950 w-[90%]'
    >
      {children}
    </div>
  );
};
