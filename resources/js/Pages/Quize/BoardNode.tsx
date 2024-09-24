// import React, { useState, ChangeEventHandler, useCallback, ChangeEvent } from 'react'
// import { Node, NodeProps, Handle, Position, useReactFlow, useNodes } from '@xyflow/react';
// import { NodeType, NodeCategory } from './types';

// const BoardNode = ({ id: nodeId, data: nodeData }: NodeProps<Node<NodeType>>) => {

//   const { setNodes } = useReactFlow();
//   const nodes = useNodes();

//   /**
//    * 質問内容の更新
//    * @param evt 
//    */
//   const updateTopic = (evt: ChangeEvent<HTMLInputElement>) => {
//     const inputValue = evt.currentTarget.value;
//     setNodes((nds) =>
//       nds.map((nd) => {
//         if (nd.id === nodeId) {
//           return {
//             ...nd,
//             data: {
//               ...nd.data,
//               topic: inputValue
//             }
//           };
//         }
//         return nd;
//       })
//     );
//   }

//   /**
//    * 選択肢の内容更新
//    * @param evt 
//    * @param choiceId 
//    */
//   const updateChoice = (evt: ChangeEvent<HTMLInputElement>, choiceId: string) => {
//     const inputValue = evt.currentTarget.value;

//     setNodes((nds) =>
//       nds.map((nd) => {
//         if (nd.id === nodeId) {
//           return {
//             ...nd,
//             data: {
//               ...nd.data,
//               choices: (nd.data as NodeType).choices?.map(c => {
//                 if (c.id === choiceId) {
//                   return {
//                     ...c,
//                     content: inputValue
//                   }
//                 }
//                 return c;
//               })
//             }
//           };
//         }
//         return nd;
//       })
//     );
//   }

//   const addChoice = () => {

//     // ノード
//     if (nodeData.category === NodeCategory.ANSWER) return;

//     const newChoiceId = 'choice-' + (Number((nodeData.choices.slice(-1)[0].id).replace('choice-', '')) + 1);

//     setNodes((nds) =>
//       nds.map((nd) => {
//         if (nd.id === nodeId) {
//           return {
//             ...nd,
//             data: {
//               ...nd.data,
//               choices: [
//                 ...(nd.data as NodeType).choices,
//                 {
//                   id: newChoiceId,
//                   content: ""
//                 }
//               ]
//             }
//           };
//         }
//         return nd;
//       })
//     );
//   }


//   return (
//     <>
//       {nodeData.category === NodeCategory.QUIZE ? (
//         <div className="rounded-t-md min-w-64">
//           <Handle id={nodeData.topic} position={Position.Left} type="target" />
//           <input
//             className="rounded-t-md p-1 text-center bg-slate-500 text-white w-full"
//             value={nodeData.topic}
//             onChange={(evt) => updateTopic(evt)}
//           />
//           {nodeData.choices?.map(({ id: choiceId, content }, index) => (
//             <div key={choiceId} className='flex justify-between p-1 text-white bg-slate-800'>
//               <Handle
//                 id={choiceId}
//                 position={Position.Right}
//                 type="source"
//                 style={{ top: 56 + 51 * index }}
//               />
//               <input
//                 className="bg-transparent text-white w-full"
//                 value={content}
//                 onChange={(evt) => updateChoice(evt, choiceId)}
//               />
//             </div>
//           ))}

//           <button
//             className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
//             onClick={addChoice}
//           >追加
//           </button>
//         </div>
//       ) : (
//         <div>結果</div>
//       )}
//     </>
//   )
// }

// export { BoardNode };