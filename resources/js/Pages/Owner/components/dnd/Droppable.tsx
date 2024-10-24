import { useDroppable } from "@dnd-kit/core";
import { FC, ReactNode, memo } from "react";

type DroppableProp = {
  id: string;
  children: ReactNode;
};

const Droppable: FC<DroppableProp> = ({ children, id }) => {
  const { setNodeRef, isOver } = useDroppable({
    id
  });
  return (
    <div ref={setNodeRef} className='bg-slate-950 w-[95%]' >
      {children}
    </div>
  );
};

export default memo(Droppable);
