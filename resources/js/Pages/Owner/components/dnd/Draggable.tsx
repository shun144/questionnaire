import { memo, useMemo, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
    base: "flex justify-center items-center bg-stone-200 h-16 font-extrabold border-4 rounded-lg shadow transition-all duration-300 relative hover:text-stone-300 hover:border-slate-200 hover:shadow-xl",
    variants: {
        color: {
            indigo: "hover:bg-indigo-600 text-indigo-500 border-indigo-700",
            orange: "hover:bg-orange-600 text-orange-500 border-orange-700",
            rose: "hover:bg-rose-600 text-rose-500 border-rose-700",
        },
        disable: {
            true: "bg-gray-700 text-gray-500 border-gray-500 hover:bg-gray-700 hover:text-gray-500 hover:border-gray-500",
        },
    },
});

type buttonVariants = VariantProps<typeof button>;
type buttonColorVariants = Pick<buttonVariants, "color">;

interface Props extends buttonColorVariants {
    id: string;
    label: string;
    nodeNum: number;
    maxNodeNum: number;
}

const Draggable = ({ id, label, color, nodeNum, maxNodeNum }: Props) => {
    const { setNodeRef, listeners, attributes, transform, isDragging } =
        useDraggable({ id });

    const transformStyle = transform
        ? `translate(${transform.x}px, ${transform.y}px)`
        : undefined;
    const isDisabled = useMemo(() => nodeNum >= maxNodeNum, [nodeNum]);

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...(isDisabled ? {} : listeners)}
            style={{
                transform: transformStyle,
                height: "fit-content",
            }}
            className="w-16"
        >
            <div
                className={button({ color, disable: isDisabled })}
                style={{
                    cursor: isDragging ? "grabbing" : "grab",
                    opacity: isDragging ? 0.5 : undefined,
                }}
            >
                <p className="text-center select-none">{label}</p>
            </div>

            <div className="w-full flex justify-center items-center pt-1">
                <div className="text-slate-500 text-sm select-none">
                    ({nodeNum}/{maxNodeNum})
                </div>
            </div>
        </div>
    );
};

export default memo(Draggable);
