import React, { useState, ChangeEventHandler, useCallback, ChangeEvent } from 'react'
import { Node, NodeProps, Handle, Position, useReactFlow, useNodes } from '@xyflow/react';
import { ResultNodeType } from './types';


const ResultNode = ({ id: nodeId, data: nodeData }: NodeProps<Node<ResultNodeType>>) => {
  return (
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-amber-400">
        <Handle id={nodeId} position={Position.Left} type="target" />
        {/* <img className="w-full" src="card-top.jpg" alt="Sunset in the mountains" /> */}
        <div className="px-6 py-4">
          <div className="font-bold text-white text-xl mb-2">{nodeData.message}</div>
          {/* <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
          </p> */}
        </div>
        {/* <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
        </div> */}
      </div>
    </>
  )
}

export default ResultNode