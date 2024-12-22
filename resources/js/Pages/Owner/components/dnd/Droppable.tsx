import { useDroppable } from "@dnd-kit/core";
import { memo, PropsWithChildren } from "react";

type Props = {
    id: string;
};

const Droppable = ({ children, id }: PropsWithChildren<Props>) => {
    const { setNodeRef } = useDroppable({
        id,
    });
    return (
        <div ref={setNodeRef} className="bg-slate-950 w-full">
            {children}
        </div>
    );
};

export default memo(Droppable);
