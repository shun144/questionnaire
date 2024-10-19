import React, { useState, useCallback, ChangeEvent, MouseEvent, useEffect, memo, CSSProperties, useMemo } from 'react'
import { Node, NodeProps, Handle, Position, useReactFlow, useNodes, NodeTypes, } from '@xyflow/react';
import ChoiceSourceHandle from '../../handles/ChoiceSourceHandle';
import { getUniqueId } from '../../utils';
import { useOwnerStore } from '../../store';
import { ChoiceType, QuestionNodeType, SalsPointType } from '../../types';
import { FaRegTrashAlt, FaPlus } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import SalesPointSelect from './SalesPointSelect';
import { showDisplayMenu } from './FlowMenu';

const CityHeavenQuestionNode = ({ id: nodeId, data: nodeData }: NodeProps<Node<QuestionNodeType>>) => {

  const firstNodeId = useOwnerStore((state) => state.firstNodeId);
  const { setEdges, updateNodeData } = useReactFlow();

  // 質問内容の更新
  const handleUpdateTopic = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    updateNodeData(
      nodeId,
      { ...nodeData, topic: event.currentTarget.value }
    );
  }, [updateNodeData, nodeId, nodeData]);


  const handleAddChoice = useCallback(() => {
    const newChoiceNo = getUniqueId();
    updateNodeData(
      nodeId, {
      ...nodeData,
      choices: [...nodeData.choices, { id: newChoiceNo, content: "" }]
    });
  }, [updateNodeData, nodeId, nodeData]);


  // 選択肢の内容更新
  const handleUpdateChoice = useCallback((event: ChangeEvent<HTMLInputElement>, _choice: ChoiceType) => {
    if (nodeData.choices.length > 6) {
      return
    }
    const targetValue = event.currentTarget.value;
    updateNodeData(
      nodeId, {
      ...nodeData,
      choices: nodeData.choices.map(c => c.id === _choice.id ? { ...c, content: targetValue } : c)
    });
  }, [updateNodeData, nodeId, nodeData])


  // 選択肢削除
  const handleDeleteChoice = useCallback((_choice: ChoiceType) => {
    if (nodeData.choices.length <= 1) {
      return;
    }

    updateNodeData(
      nodeId,
      { ...nodeData, choices: nodeData.choices.filter(c => c.id != _choice.id) }
    );

    // 選択肢のコネクション削除
    setEdges((eds) => eds.filter(ed => ed.sourceHandle != _choice.id))
  }, [updateNodeData, nodeId, nodeData]);


  return (
    <div
      className={`rounded-md w-72 pb-7 bg-slate-100 shadow-lg
      ${firstNodeId === nodeId && "border-2 border-orange-300"}`}>
      <div
        className='custom-drag-handle rounded-t-md bg-slate-900 flex justify-end items-center h-8 pr-2'>
        <BsThreeDots
          className=' h-full text-slate-400 text-sm cursor-pointer transition-all hover:text-slate-300 hover:bg-slate-800 rounded'
          onClick={(event) => showDisplayMenu(event, nodeId)}
        />

      </div>
      <div className='flex flex-col justify-center items-center pt-2 px-4 '>

        <div className='w-full flex flex-col justify-center items-center relative'>
          <label htmlFor="message" className="self-start block text-sm font-medium text-slate-600">質問内容</label>
          <textarea
            id="message"
            rows={3}
            className="block resize-none p-2.5 w-full text-sm text-gray-900 placeholder-gray-300 bg-gray-50 rounded-sm border border-gray-300 focus:ring-slate-400 focus:border-slate-400"
            value={nodeData.topic}
            onChange={(event) => handleUpdateTopic(event)}
            placeholder="質問内容を入力してください">
          </textarea>
          <Handle id={nodeId} position={Position.Left} type="target" style={{ cursor: "pointer", top: 18, left: -25, }} />
        </div>


        <div className='w-full flex flex-col justify-center items-center pt-4'>
          <div className="self-start block text-sm font-medium text-slate-600">選択肢</div>

          {nodeData.choices.map((choice) => (
            <div key={choice.id} className='w-full relative'>
              <div className='w-full flex justify-between'>
                <input
                  className="w-full text-sm border-none hover:shadow focus:ring-0 bg-gray-50 text-gray-900 placeholder-gray-300"
                  value={choice.content}
                  placeholder="選択肢を入力してください"
                  onChange={(evt) => handleUpdateChoice(evt, choice)}
                />
                <button
                  className="text-center text-red-200 transition-all hover:text-red-500 px-1"
                  type="button"
                  onClick={() => handleDeleteChoice(choice)}
                >
                  <FaRegTrashAlt className='text-sm' />
                </button>
              </div>

              <SalesPointSelect nodeId={nodeId} choice={choice} />


              <ChoiceSourceHandle
                id={choice.id}
                type="source"
                position={Position.Right}
                connectionLimit={1}
                style={{ top: 18, right: -25, }}
              />
            </div>
          ))}
        </div>

        <div className='w-full mt-4'>
          {nodeData.choices.length < 6 && (
            <button
              className="text-gray-600 border border-gray-600 hover:text-gray-300 hover:border-gray-300 font-bold mt-1 w-full text-[0.8rem] py-1 flex justify-center items-center gap-1 transition-all"
              onClick={() => handleAddChoice()}
            >
              <FaPlus />
              <p>選択肢追加</p>
            </button>
          )}
        </div>
      </div>
    </div >
  )
}

export default memo(CityHeavenQuestionNode);

