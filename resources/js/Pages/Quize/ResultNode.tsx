import React, { useState, ChangeEventHandler, useCallback, ChangeEvent } from 'react'
import { Node, NodeProps, Handle, Position, useReactFlow, useNodes } from '@xyflow/react';
import { ResultNodeType } from './types';


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
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-amber-400">
        <Handle id={nodeId} position={Position.Left} type="target" />
        <div className="flex px-4 py-4">

          <input
            className="font-bold  bg-amber-400 text-white"
            value={nodeData.message}
            onChange={(evt) => onUpdateMessage(evt)}
          />

          <button
            className="rounded-md bg-slate-800 p-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={onDeleteResult}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}

export default ResultNode