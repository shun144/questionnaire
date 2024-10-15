import React, { useState, ChangeEventHandler, useCallback, ChangeEvent, MouseEvent, useEffect, memo, CSSProperties, useMemo } from 'react'
import { Node, NodeProps, Handle, Position, useReactFlow, useNodes, NodeTypes, } from '@xyflow/react';
import ChoiceSourceHandle from '../../handles/ChoiceSourceHandle';
import { getUniqueId } from '../../utils';
import { useOwnerStore } from '../../store';
import { ChoiceType, QuestionNodeType, SalsPointType } from '../../types';
import { FaRegTrashAlt, FaPlus } from "react-icons/fa";
import Select, { StylesConfig, components, MenuProps, GroupBase } from "react-select";
import { salesPoints } from '../../salesPoints';



const CityHeavenQuestionNode = (
  { id: nodeId,
    data: nodeData
  }: NodeProps<Node<QuestionNodeType>>) => {

  const { firstNodeId, setFirstNodeId } = useOwnerStore();


  // const [selectedValue, setSelectedValue] = useState<SalsPointType[]>([]);
  const { setEdges, updateNodeData, deleteElements } = useReactFlow();

  // 質問内容の更新
  const handleUpdateTopic = (event: ChangeEvent<HTMLInputElement>) => {
    updateNodeData(
      nodeId, {
      ...nodeData,
      topic: event.currentTarget.value,
    });
  }

  // 選択肢追加
  const handleAddChoice = () => {
    const newChoiceNo = getUniqueId();
    updateNodeData(
      nodeId, {
      ...nodeData,
      choices: [
        ...nodeData.choices,
        {
          id: newChoiceNo,
          content: ""
        }
      ]
    });
  };


  // 選択肢の内容更新
  const handleUpdateChoice = (event: ChangeEvent<HTMLInputElement>, _choice: ChoiceType) => {
    // 選択肢は最大6つ
    if (nodeData.choices.length > 6) return

    updateNodeData(
      nodeId, {
      ...nodeData,
      choices: nodeData.choices.map(choice => {
        if (choice.id === _choice.id) {
          return {
            ...choice,
            content: event.currentTarget.value
          }
        } else {
          return choice;
        }
      })
    });
  };

  // 選択肢削除
  const handleDeleteChoice = (_choice: ChoiceType) => {
    // 選択肢は最低1つ
    if (nodeData.choices.length <= 1) return
    updateNodeData(
      nodeId, {
      ...nodeData,
      choices: nodeData.choices.filter(c => c.id != _choice.id)
    });

    // 選択肢のコネクション削除
    setEdges((eds) => eds.filter(ed => ed.sourceHandle != _choice.id))
  };

  // 質問ノード削除
  const handleDeleteQuize = () => {
    deleteElements({ nodes: [{ id: nodeId }] });
  };

  const customStyles: StylesConfig<SalsPointType, true> = useMemo(() => (
    {
      control: (provided) => ({
        ...provided,
        width: '100%',
        borderRadius: 'none',
        border: 'none',
        backgroundColor: 'pink',
        textAlign: 'center',
        '&:hover': {
          border: 'none',
          cursor: 'pointer',
        },
        borderColor: 'orange',
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? 'pink' : 'red',
        color: state.isSelected ? 'white' : 'black',
        zIndex: 1000,
        '&:hover': {
          backgroundColor: 'blue',
          cursor: 'pointer',
        },
      }),
      menu: (provided) => ({
        ...provided,
        backgroundColor: 'green',
      }),
      input: (provided) => ({
        ...provided,
        "input:focus": {
          boxShadow: "none",
          outline: "none"
        },
      }),
    }), []);


  const handleSelectChange = (_choiceId: string, options: SalsPointType[] | null) => {
    if (options) {

      updateNodeData(
        nodeId, {
        ...nodeData,
        choices: nodeData.choices.map(choice => {
          if (choice.id === _choiceId) {
            return {
              ...choice,
              salePoints: options
            }
          } else {
            return choice;
          }
        })
      });
    }
  };



  return (
    <>
      <div className="rounded-t-md min-w-64 px-2">

        {
          firstNodeId === nodeId ? (
            <div className='text-orange-200'>
              始まりのノードです！
            </div>
          ) : (
            <button
              className='text-orange-300'
              onClick={() => setFirstNodeId(nodeId)}>ON</button>
          )
        }

        <div className='flex items-center gap-x-4'>
          <div className='custom-drag-handle w-5 h-5 bg-slate-50 rounded-full'></div>
          <div className='text-white text-sm'>チェックフロー用のノードです</div>
        </div>


        <Handle id={nodeId} position={Position.Left} type="target" style={{ cursor: "pointer" }} />

        {/* 質問内容 */}
        <div className='flex flex-col'>
          <button
            className="text-white hover:text-red-300 font-bold mb-1 rounded w-fit self-end text-sm"
            type="button"
            onClick={handleDeleteQuize}>
            <FaRegTrashAlt />
          </button>
          <input
            className="placeholder-gray-400 rounded-t-md p-1 text-center bg-slate-500 text-white w-full border-none focus:ring-0"
            value={nodeData.topic}
            placeholder="質問を入力してください"
            onChange={(evt) => handleUpdateTopic(evt)}
          />
        </div>


        {/* 選択肢 */}
        <div className="bg-slate-800">

          {nodeData.choices.map((choice, index) => (
            <div
              key={choice.id}
            >
              <div className='flex justify-between p-1 text-white bg-slate-800'>
                <input
                  className="placeholder-gray-600 border-blue-100 focus:border-blue-400 focus:ring-0 bg-transparent text-white w-full"
                  value={choice.content}
                  placeholder="選択肢を入力してください"
                  onChange={(evt) => handleUpdateChoice(evt, choice)}
                />
                <button
                  className="rounded-md bg-slate-800 p-1 border border-transparent text-center text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  onClick={() => handleDeleteChoice(choice)}>
                  <FaRegTrashAlt className='text-[10px]' />
                </button>
              </div>


              <Select
                instanceId={`${choice.id}-s`}
                defaultValue={choice.salePoints}
                options={salesPoints}
                onChange={(options) => (options ? handleSelectChange(choice.id, [...options]) : null)}
                noOptionsMessage={() => "セールスポイントが見つかりません"}
                placeholder="セールスポイントを選んでください"
                isSearchable={true}
                isMulti
                components={{
                  IndicatorSeparator: () => null,
                  Menu: (props: MenuProps<SalsPointType, true, GroupBase<SalsPointType>>) => (<components.Menu {...props} className="nowheel" />)
                }}
                styles={customStyles}
              />

              <ChoiceSourceHandle
                id={choice.id}
                type="source"
                position={Position.Right}
                connectionLimit={1}
                style={{ top: 75 + 51 * index }}
              />
            </div>
          ))}

          <div className='p-1'>
            {nodeData.choices.length < 6 && (
              <button
                className="text-gray-600 border border-gray-600 hover:text-gray-300 hover:border-gray-300 font-bold mt-1 w-full text-[10px] py-1 flex justify-center items-center gap-1"
                onClick={handleAddChoice}
              >
                <FaPlus />
                <p>選択肢追加</p>
              </button>
            )}
          </div>
        </div>
      </div >
    </>
  )
}

export default memo(CityHeavenQuestionNode);