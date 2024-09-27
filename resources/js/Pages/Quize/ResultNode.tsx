import React, { useState, ChangeEventHandler, useCallback, ChangeEvent, memo } from 'react'
import { Node, NodeProps, Handle, Position, useReactFlow, useNodes } from '@xyflow/react';
import { ResultNodeType } from './types';
import { FaRegTrashAlt, FaPlus } from "react-icons/fa";



const ResultNode = ({ id: nodeId, data: nodeData }: NodeProps<Node<ResultNodeType>>) => {

  const { updateNodeData, deleteElements } = useReactFlow();

  /**
   * 結果メッセージ変更
   * @param evt 
   */
  const onUpdateMessage = (evt: ChangeEvent<HTMLInputElement>) => {
    updateNodeData(
      nodeId, {
      ...nodeData,
      message: evt.currentTarget.value
    });
  }

  /**
  * 結果ノード削除
  */
  const onDeleteResult = () => {
    deleteElements({ nodes: [{ id: nodeId }] })
  }

  return (
    <>
      <div className="rounded-t-md min-w-64 px-2">
        <Handle id={nodeId} position={Position.Left} type="target" style={{ cursor: "pointer" }} />
        {/* 質問内容 */}
        <div className='flex flex-col custom-drag-handle'>
          <button
            className="text-white hover:text-red-300 font-bold mb-1 rounded w-fit self-end text-sm"
            type="button"
            onClick={onDeleteResult}>
            <FaRegTrashAlt />
          </button>
          <div className=" rounded-t-md p-1 text-center bg-orange-500 text-white w-full">
            判定結果
          </div>
        </div>

        <div className='flex justify-between p-1 text-white bg-slate-800'>
          <input
            className=" border-blue-100 focus:border-blue-400 focus:ring-0 bg-transparent text-white w-full"
            value={nodeData.message}
            placeholder="判定結果を入力してください"
            onChange={(evt) => onUpdateMessage(evt)}
          />
        </div>

      </div>
    </>
  )

}

export default memo(ResultNode);