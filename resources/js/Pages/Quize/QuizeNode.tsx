import React, { useState, ChangeEventHandler, useCallback, ChangeEvent, MouseEvent, useEffect, memo } from 'react'
import { Node, NodeProps, Handle, Position, useReactFlow, useNodes, NodeTypes, } from '@xyflow/react';
import { QuizeNodeType } from './types';
import ChoiceSourceHandle from './ChoiceSourceHandleProps';
import { getNewChoiceNo, getNewId } from './utils';
import { FaRegTrashAlt, FaPlus } from "react-icons/fa";

const QuizeNode = ({ id: nodeId, data: nodeData }: NodeProps<Node<QuizeNodeType>>) => {

  const { setEdges, updateNodeData, deleteElements } = useReactFlow();
  /**
   * 質問内容の更新
   * @param evt 
   */
  const onUpdateTopic = (evt: ChangeEvent<HTMLInputElement>) => {
    updateNodeData(
      nodeId, {
      ...nodeData,
      topic: evt.currentTarget.value
    });
  }

  /**
   * 選択肢追加
   */

  const onAddChoice = () => {
    const newChoiceNo = getNewChoiceNo(nodeData.choices, `${nodeId}-`);
    updateNodeData(
      nodeId, {
      ...nodeData,
      choices: [
        ...nodeData.choices,
        {
          choiceNo: newChoiceNo,
          content: ""
        }
      ]
    });
  }

  /**
   * 選択肢の内容更新
   * @param evt 
   * @param choiceId 
   */
  const onUpdateChoice = (evt: ChangeEvent<HTMLInputElement>, choiceNo: string) => {

    // 選択肢は最低6つ
    if (nodeData.choices.length >= 6) return

    updateNodeData(
      nodeId, {
      ...nodeData,
      choices: nodeData.choices.map(choice => {
        if (choice.choiceNo === choiceNo) {
          return {
            choiceNo,
            content: evt.currentTarget.value
          }
        } else {
          return choice;
        }
      })
    });
  };


  /**
   * 選択肢削除
   * @param choiceNo 選択肢No 
   * @returns 
   */
  const onDeleteChoice = (choiceNo: string) => {

    // 選択肢は最低1つ
    if (nodeData.choices.length <= 1) return

    updateNodeData(
      nodeId, {
      ...nodeData,
      choices: nodeData.choices.filter(c => c.choiceNo != choiceNo)
    });

    // 選択肢のコネクション削除
    setEdges((eds) => eds.filter(ed => ed.sourceHandle != choiceNo))
  }

  /**
 * 質問ノード削除
 */
  const onDeleteQuize = () => {
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
            onClick={onDeleteQuize}>
            <FaRegTrashAlt />
          </button>
          <input
            className="placeholder-gray-400 rounded-t-md p-1 text-center bg-slate-500 text-white w-full border-none focus:ring-0"
            value={nodeData.topic}
            placeholder="質問を入力してください"
            onChange={(evt) => onUpdateTopic(evt)}
          />
        </div>

        {/* 選択肢 */}
        <div className="bg-slate-800">

          {nodeData.choices.map(({ choiceNo, content }, index) => (
            <div
              key={choiceNo}
              className='flex justify-between p-1 text-white bg-slate-800'>
              <input
                className="placeholder-gray-600 border-blue-100 focus:border-blue-400 focus:ring-0 bg-transparent text-white w-full"
                value={content}
                placeholder="選択肢を入力してください"
                onChange={(evt) => onUpdateChoice(evt, choiceNo)}
              />
              <button
                className="rounded-md bg-slate-800 p-1 border border-transparent text-center text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => onDeleteChoice(choiceNo)}>
                <FaRegTrashAlt className='text-[10px]' />
              </button>
              <ChoiceSourceHandle
                id={choiceNo}
                type="source"
                position={Position.Right}
                connectionLimit={1}
                style={{ top: 75 + 51 * index }}
              />
            </div>
          ))}

          <div className='p-1'>
            {/* 選択肢追加ボタン */}
            <button
              className="text-gray-600 border border-gray-600 hover:text-gray-300 hover:border-gray-300 font-bold mt-1 w-full text-[10px] py-1 flex justify-center items-center gap-1"
              onClick={onAddChoice}
            >
              <FaPlus />
              <p>選択肢追加</p>
            </button>
          </div>


        </div>





      </div>

    </>
  )
}

export default memo(QuizeNode);