import { useCallback, ChangeEvent, memo } from 'react'
import { Node, NodeProps, Handle, Position, useReactFlow } from '@xyflow/react';
import ChoiceSourceHandle from '../../components/handles/ChoiceSourceHandle';
import { getNewId } from '../../utils';
import { useOwnerStore } from '../../store';
import { ChoiceType, QuestionNodeType } from '../../types';
import { FaRegTrashAlt, FaPlus } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import SalesPointSelect from './SalesPointSelect';
import { showContextMenu } from '../../components/subMenu/QuestionSubMenu';

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


  // 選択肢の追加
  const handleAddChoice = () => {
    const newChoiceNo = getNewId();
    updateNodeData(
      nodeId, {
      ...nodeData,
      choices: [
        ...nodeData.choices,
        { id: newChoiceNo, content: "", salePoints: [] }
      ]
    });
  }


  // 選択肢の内容更新
  const handleUpdateChoice = useCallback((event: ChangeEvent<HTMLInputElement>, _choice: ChoiceType) => {
    if (nodeData.choices.length > 5) {
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
    <div className={`rounded-md w-96 bg-slate-900 shadow-cyan-100/50 relative  ${firstNodeId === nodeId ? " border-yellow-300 border-4" : " border-slate-300 border-2"}`}>

      {firstNodeId === nodeId && (<div className='absolute bg-amber-500 w-8 h-8 rounded-full -top-4 -left-4 flex justify-center items-center shadow-lg border-2 border-yellow-300'>
        <div className='text-white font-bold text-md'>1</div>
      </div>)}

      <div className='h-10 dhandle rounded-t-md bg-indigo-500 flex justify-end items-center px-2 transition-all hover:bg-indigo-600'>
        <BsThreeDots
          className='w-6 h-full text-slate-200 text-md cursor-pointer transition-all hover:text-slate-50 hover:bg-indigo-400'
          onClick={(event) => showContextMenu(event, nodeId)} />
      </div>


      <div className='flex flex-col justify-center items-center cursor-default pt-3 pb-6 px-3'>
        <div className='w-full flex flex-col justify-center items-center relative'>
          <label htmlFor="message" className="self-start block text-md font-semibold text-indigo-500">質 問</label>
          <textarea
            id="message"
            rows={3}
            className="block resize-none p-2.5 w-full text-md text-slate-200 placeholder-slate-500 bg-slate-800 rounded-sm border-1 ring-0 border-slate-400 focus:ring-0 focus:border-slate-200"
            value={nodeData.topic}
            maxLength={100}
            placeholder="質問内容を入力してください"
            onChange={(event) => handleUpdateTopic(event)}>
          </textarea>
          <Handle id={nodeId} position={Position.Left} type="target" style={{ cursor: "pointer", top: 18, left: -25, }} />
        </div>


        <div className='w-full flex flex-col justify-center items-center pt-6'>
          <div className="self-start block text-md font-semibold text-indigo-500">選 択 肢</div>

          {nodeData.choices.map((choice) => (
            <div key={choice.id} className='w-full relative'>
              <div className='w-full flex justify-between'>
                <input
                  className="w-full text-lg hover:shadow text-slate-200  placeholder-slate-500 bg-slate-800 rounded-sm border-1 ring-0 border-slate-400 focus:ring-0 focus:border-slate-200"
                  value={choice.content}
                  placeholder="選択肢を入力してください"
                  maxLength={50}
                  onChange={(evt) => handleUpdateChoice(evt, choice)}
                />
                <button
                  className="text-center text-slate-600 transition-all hover:text-red-300 px-1"
                  type="button"
                  onClick={() => handleDeleteChoice(choice)}
                >
                  <FaRegTrashAlt className='text-sm' />
                </button>
              </div>

              <SalesPointSelect nodeId={nodeId} choiceId={choice.id} salePoints={choice.salePoints} />

              <ChoiceSourceHandle
                id={choice.id}
                connectionLimit={1}
                style={{ top: 18, right: -25, }}
              />
            </div>
          ))}
        </div>

        <div className='w-full mt-4'>
          {nodeData.choices.length < 5 && (
            <button
              className="text-indigo-600 border border-indigo-600 hover:text-indigo-300 hover:border-indigo-300 font-bold mt-1 w-full text-[0.8rem] py-1 flex justify-center items-center gap-1 transition-all"
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


