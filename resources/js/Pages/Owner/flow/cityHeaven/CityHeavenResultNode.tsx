import React, { useState, ChangeEventHandler, useCallback, ChangeEvent, memo } from 'react'
import { Node, NodeProps, Handle, Position, useReactFlow, useNodes } from '@xyflow/react';
import { RecommendNodeType } from '../../types';
import { FaRegTrashAlt, FaPlus } from "react-icons/fa";


const CityHeavenResultNode = ({ id: nodeId, data: nodeData }: NodeProps<Node<RecommendNodeType>>) => {

  const { updateNodeData, deleteElements } = useReactFlow();

  const handleUpdateMessage = (evt: ChangeEvent<HTMLInputElement>) => {
    updateNodeData(
      nodeId, {
      ...nodeData,
      message: evt.currentTarget.value
    });
  }

  const onDeleteResult = () => {
    deleteElements({ nodes: [{ id: nodeId }] })
  }

  return (
    <>
      <div className="rounded-t-md min-w-64 px-2">
        <Handle id={nodeId} position={Position.Left} type="target" style={{ cursor: "pointer" }} />


        <div className='flex flex-col custom-drag-handle'>
          <button
            className="text-white hover:text-red-300 font-bold mb-1 rounded w-fit self-end text-sm"
            type="button"
            onClick={onDeleteResult}>
            <FaRegTrashAlt />
          </button>

          <div className="rounded-t-md p-1 text-center bg-orange-500 text-white w-full">
            API結果判定
          </div>
        </div>

        <div className='flex flex-col justify-around items-center p-1 text-white bg-slate-800'>

          {/* メッセージ入力 */}
          <div className='w-full'>
            <input
              className=" border-blue-100 focus:border-blue-400 focus:ring-0 bg-transparent text-white w-full"
              value={nodeData.message}
              placeholder="メッセージを入力してください"
              onChange={(evt) => handleUpdateMessage(evt)}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(CityHeavenResultNode);