// import React from 'react';
// import { ConnectionLineComponentProps, EdgeProps } from '@xyflow/react';


// const FlowEdge = ({
//   sourceX,
//   sourceY,
//   sourcePosition,
//   targetX,
//   targetY,
//   targetPosition,
//   connectionLineType,
//   connectionLineStyle,
// }: EdgeProps) => {
//   return (
//     <g>
//       <path
//         fill="none"
//         stroke="#222"
//         strokeWidth={1.5}
//         className="animated"
//         d={`M${sourceX},${sourceY} C ${sourceX} ${targetY} ${sourceX} ${targetY} ${targetX},${targetY}`}
//       />
//       <circle cx={targetX} cy={targetY} fill="#fff" r={3} stroke="#222" strokeWidth={1.5} />
//     </g>
//   );
// };

import React, { memo } from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath, useReactFlow, type EdgeProps } from '@xyflow/react';


const FlowEdge = ({
  id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd }: EdgeProps) => {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });

  const onEdgeClick = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 20,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <button className="edgebutton text-white" onClick={onEdgeClick}>
            x
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export default memo(FlowEdge);