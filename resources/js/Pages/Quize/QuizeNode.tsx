import React, { useState, ChangeEventHandler, useCallback, ChangeEvent, MouseEvent } from 'react'
import { Node, NodeProps, Handle, Position, useReactFlow, useNodes, } from '@xyflow/react';
import { QuizeNodeType } from './types';
import ChoiceSourceHandle from './ChoiceSourceHandleProps';
import { getNewChoiceNo, getNewId } from './utils';

const QuizeNode = ({ id: nodeId, data: nodeData, selected }: NodeProps<Node<QuizeNodeType>>) => {

  const { setNodes, setEdges, getEdges } = useReactFlow();
  // const nodes = useNodes();

  /**
   * 質問内容の更新
   * @param evt 
   */
  const onUpdateTopic = (evt: ChangeEvent<HTMLInputElement>) => {
    const inputValue = evt.currentTarget.value;
    setNodes((nds) =>
      nds.map((nd) => {
        if (nd.id === nodeId) {
          return {
            ...nd,
            data: {
              ...nd.data,
              topic: inputValue
            }
          };
        }
        return nd;
      })
    );
  }

  const onAddChoice = () => {
    const newChoiceNo = getNewChoiceNo(nodeData.choices, `${nodeId}-`);
    setNodes((nds) =>
      nds.map((nd) => {
        if (nd.id === nodeId) {
          return {
            ...nd,
            data: {
              ...nd.data,
              choices: [
                ...(nd.data as QuizeNodeType).choices,
                {
                  choiceNo: newChoiceNo,
                  content: ""
                }
              ]
            }
          };
        }
        return nd;
      })
    );
  }

  /**
   * 選択肢の内容更新
   * @param evt 
   * @param choiceId 
   */
  const onUpdateChoice = (evt: ChangeEvent<HTMLInputElement>, choiceNo: string) => {
    const inputValue = evt.currentTarget.value;

    setNodes((nds) =>
      nds.map((nd) => {
        if (nd.id === nodeId) {
          return {
            ...nd,
            data: {
              ...nd.data,
              choices: (nd.data as QuizeNodeType).choices.map(c => {
                if (c.choiceNo === choiceNo) {
                  return {
                    ...c,
                    content: inputValue
                  }
                }
                return c;
              })
            }
          };
        }
        return nd;
      })
    );
  }

  const onDeleteChoice = (choiceNo: string) => {
    if (nodeData.choices.length <= 1) return

    // setNodes((nds) =>
    //   nds.map((nd) => {
    //     if (nd.id === nodeId) {
    //       return {
    //         ...nd,
    //         data: {
    //           ...nd.data,
    //           choices: (nd.data as QuizeNodeType).choices.filter(c => c.choiceNo != choiceNo)
    //         }
    //       };
    //     }
    //     return nd;
    //   })
    // );

    setNodes((nds) => {
      return [
        ...nds,
        {
          id: nodeData.quizeNo,
          position: {
            x: nodeData.x,
            y: nodeData.y,
          },
          data: {
            ...nodeData,
            choices: nodeData.choices.filter(c => c.choiceNo != choiceNo)
          },
          type: "quizeNode"
        }
        // {
        //   id: nodeData.quizeNo,
        //   position: {
        //     x: nodeData.x,
        //     y: nodeData.y,
        //   },
        //   data: {
        //     x: nodeData.x,
        //     y: nodeData.y,
        //     topic: nodeData.topic,
        //     choices: []
        //   }
        // }
      ];
    });

    // const aaa = getEdges();
    // console.log(aaa)

    // setEdges((eds) => {

    // })
  }



  // const onDeleteChoice = (choiceNo: string) => {
  //   if (nodeData.choices.length <= 1) return
  //   setNodes((nds) =>
  //     nds.map((nd) => {
  //       if (nd.id === nodeId) {
  //         return {
  //           ...nd,
  //           data: {
  //             ...nd.data,
  //             choices: (nd.data as QuizeNodeType).choices.filter(c => c.choiceNo != choiceNo)
  //           }
  //         };
  //       }
  //       return nd;
  //     })
  //   );
  // }



  const onDeleteQuize = () => {

  }

  return (
    <>
      <div className="rounded-t-md min-w-64">
        <Handle id={nodeId} position={Position.Left} type="target" />
        {/* 質問内容 */}
        <div className='flex'>
          <input
            className="rounded-t-md p-1 text-center bg-slate-500 text-white w-full"
            value={nodeData.topic}
            onChange={(evt) => onUpdateTopic(evt)}
          />
          <button
            className="rounded-md bg-slate-800 p-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={onDeleteQuize}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
          </button>
        </div>
        {/* 選択肢 */}
        {nodeData.choices.map(({ choiceNo, content }, index) => (
          <div
            key={choiceNo}
            className='flex justify-between p-1 text-white bg-slate-800'>

            <input
              className="bg-transparent text-white w-full"
              value={content}
              onChange={(evt) => onUpdateChoice(evt, choiceNo)}
            />
            <button
              className="rounded-md bg-slate-800 p-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={() => onDeleteChoice(choiceNo)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            </button>
            <ChoiceSourceHandle
              id={choiceNo}
              type="source"
              position={Position.Right}
              connectionLimit={1}
              style={{ top: 56 + 51 * index }}
            />
          </div>
        ))}

        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={onAddChoice}
        >追加
        </button>
      </div>

    </>
  )
}

export default QuizeNode;