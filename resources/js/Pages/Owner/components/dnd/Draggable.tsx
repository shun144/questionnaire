import { memo, useMemo, useState } from 'react';
import { useDraggable } from "@dnd-kit/core";
import classNames from 'classnames';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

type Props = {
  id: string;
  label: string;
  color: string;
  nodeNum: number;
  maxNodeNum: number;
};


const Draggable = ({ id, label, color, nodeNum, maxNodeNum }: Props) => {
  const { setNodeRef, listeners, attributes, transform, isDragging } = useDraggable({ id });

  const disabledBtnColor = "bg-gray-700 text-gray-500 border-gray-500";
  const activeBtnColor = useMemo(() => classNames(`hover:bg-${color}-600 text-${color}-500 border-${color}-500 hover:text-stone-300 hover:border-slate-200 hover:shadow-xl`), [color]);

  const disabledNumColor = "bg-gray-500";
  const activeNumColor = useMemo(() => classNames(`bg-${color}-500`), [color]);


  const transformStyle = transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined;

  const disabled = useMemo(() => nodeNum >= maxNodeNum, [nodeNum]);

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...(disabled ? {} : listeners)}
      style={{
        transform: transformStyle,
        height: "fit-content",
      }}
      className={`w-[80%]`}
    // data-tooltip-id="tooltip"
    >
      <div
        className={`flex justify-center items-center bg-stone-200 h-16  font-extrabold border-4  rounded-lg shadow transition-all duration-300
          relative 
          ${disabled ? disabledBtnColor : activeBtnColor}`}

        style={{
          cursor: isDragging ? "grabbing" : "grab",
          opacity: isDragging ? 0.5 : undefined,
        }}

      >
        <p className="text-center select-none">{label}</p>
        <div className={`absolute -top-3 -right-3 w-5 h-5 text-[14px] p-3 text-white font-thin rounded-full flex justify-center items-center select-none 
          ${disabled ? disabledNumColor : activeNumColor}`}>
          {nodeNum}
        </div>
      </div >

      {/* <Tooltip
        id="tooltip"
        place="top"         // 常に上に表示
        offset={10} // 必要に応じて微調整
        style={{ background: "#6366f1", fontSize: "12px", padding: "4px 8px" }}
      >
        固定された位置のツールチップ
      </Tooltip> */}
    </div>
  );
};

export default memo(Draggable);