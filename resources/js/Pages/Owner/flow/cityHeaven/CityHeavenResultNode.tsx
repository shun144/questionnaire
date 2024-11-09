import React, { useState, ChangeEventHandler, useCallback, ChangeEvent, memo } from 'react'
import { Node, NodeProps, Handle, Position, useReactFlow } from '@xyflow/react';
import { RecommendNodeType } from '../../types';
import { showContextMenu } from '../../components/subMenu/ResultSubMenu';
import { BsThreeDots } from "react-icons/bs";

const messageMaxLength = 150;

const CityHeavenResultNode = ({ id: nodeId, data: nodeData }: NodeProps<Node<RecommendNodeType>>) => {

  const { updateNodeData } = useReactFlow();

  const handleUpdateMessage = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    updateNodeData(
      nodeId, {
      ...nodeData,
      message: evt.currentTarget.value
    });
  }

  return (
    <div className="rounded-md w-80 bg-slate-900 shadow-lg border-slate-300 border-2">
      <div className='h-10 dhandle rounded-t-md bg-rose-500 flex justify-end items-center px-2 transition-all hover:bg-rose-600'>
        <BsThreeDots
          className='w-6 h-full text-slate-200 text-md cursor-pointer transition-all hover:text-slate-50 hover:bg-rose-400'
          onClick={(event) => showContextMenu(event, nodeId)} />
      </div>

      <div className='flex flex-col justify-center items-center cursor-default pt-3 pb-6 px-3'>
        <div className='w-full flex flex-col justify-center items-center relative'>
          <label htmlFor="message" className="self-start block text-md font-semibold text-rose-400">{`メッセージ（${messageMaxLength}文字）`}</label>
          <textarea
            id="message"
            rows={5}
            className="block resize-none p-2.5 w-full text-md text-slate-200 placeholder-slate-500 bg-slate-800 rounded-sm border-1 ring-0 border-slate-400 focus:ring-0 focus:border-slate-200"
            value={nodeData.message}
            onChange={(event) => handleUpdateMessage(event)}
            placeholder="メッセージを入力してください"
            maxLength={messageMaxLength}
          >
          </textarea>
          <Handle id={nodeId} position={Position.Left} type="target" style={{ cursor: "pointer", top: 18, left: -25, }} />
        </div>
      </div>
    </div >
  )

}

export default memo(CityHeavenResultNode);
