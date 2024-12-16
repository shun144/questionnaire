import { useDroppable } from "@dnd-kit/core";
import { FC, ReactNode, memo, PropsWithChildren } from "react";

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

// import { useDroppable } from "@dnd-kit/core";
// import { FC, ReactNode, memo, PropsWithChildren } from "react";

// type Props = {
//     id: string;
// };

// // type DroppableProp = {
// //     id: string;
// //     children: ReactNode;
// // };

// const Droppable: FC<DroppableProp> = ({ children, id }) => {
//     const { setNodeRef, isOver } = useDroppable({
//         id,
//     });
//     return (
//         <div ref={setNodeRef} className="bg-slate-950">
//             {children}
//         </div>
//     );
// };

// export default memo(Droppable);
