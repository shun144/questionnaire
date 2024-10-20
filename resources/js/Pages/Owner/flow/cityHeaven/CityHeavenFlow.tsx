import { useState, useCallback, useEffect, useMemo, useRef, memo } from 'react';
import { getUniqueId, commitCityHeavenFlow } from '../../utils';
import { useOwnerStore } from '../../store';
import CityHeavenQuestionNode from './CityHeavenQuestionNode';
import CityHeavenResultNode from './CityHeavenResultNode';
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Draggable from '../../components/dnd/Draggable';
import Droppable from '../../components/dnd/Droppable';
import {
  ReactFlow, Node, Edge, Connection, addEdge, reconnectEdge, useReactFlow, Panel, ReactFlowInstance, Controls, Background, SmoothStepEdge, BackgroundVariant,
  ConnectionLineType, MarkerType,
  useNodesState, useEdgesState
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import '../../../../../css/owner/flow.css'
import { GiConsoleController } from 'react-icons/gi';
import toast from 'react-hot-toast';
import "react-contexify/dist/ReactContexify.css";

const CityHeavenFlow = ({ flowId, initialNodes, initialEdges }: { flowId: number, initialNodes: Node[], initialEdges: Edge[] }) => {

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [rfInstance, setRfInstance] = useState<ReactFlowInstance>();

  const setFirstNodeId = useOwnerStore((state) => state.setFirstNodeId);
  const firstNodeId = useOwnerStore((state) => state.firstNodeId);
  const flowTitle = useOwnerStore((state) => state.flowTitle);
  const flowUrl = useOwnerStore((state) => state.flowUrl);

  const edgeReconnSuccess = useRef(true);

  const { screenToFlowPosition, addNodes, setViewport, getNodes, deleteElements } = useReactFlow();

  const nodeTypes = useMemo(() => (
    {
      cityHeavenQuestionNode: CityHeavenQuestionNode,
      cityHeavenResultNode: CityHeavenResultNode
    }
  ), []);

  const defaultEdgeOptions = useMemo(() => (
    {
      type: 'smoothstep',
    }
  ), []);


  const onAddQuestion = (position: { x: number; y: number }) => {
    const newQuestionNo = getUniqueId();
    const newChoiceNo = getUniqueId();

    // 既存の質問ノードが0個の場合、追加した質問ノードをアンケートの最初の質問にする
    if (getNodes().length === 0) {
      setFirstNodeId(newQuestionNo);
    }

    addNodes({
      id: newQuestionNo,
      data: {
        topic: "",
        choices: [{ id: newChoiceNo, content: "", salePoints: [] }]
      },
      position,
      type: "cityHeavenQuestionNode",
      dragHandle: '.custom-drag-handle',
    });
  };

  // 結果ノード追加
  const onAddResult = (position: { x: number; y: number }) => {
    const newId = getUniqueId();
    addNodes({
      id: newId,
      data: { result: "" },
      position,
      type: "cityHeavenResultNode",
      dragHandle: '.custom-drag-handle',
    });
  };

  const handleDragEnd = useCallback(({ active, over, delta, activatorEvent }: DragEndEvent) => {

    // フロー作成エリア以外にドロップしたら何もしない
    if (over == null || over.id != 'droppableA') {
      return;
    }

    // activatorEventがMouseEventの場合に処理を進める
    // イベントが他の入力デバイス（例えばタッチデバイス）でも安全に動作すする
    if (activatorEvent instanceof MouseEvent) {
      const absoluteX = activatorEvent.pageX + delta.x;
      const absoluteY = activatorEvent.pageY + delta.y;

      // ブラウザ上の絶対座標をreactFlow上の座標に変換する
      const position = screenToFlowPosition({
        x: absoluteX,
        y: absoluteY,
      });

      if (active.id === 'draggable-question') {
        onAddQuestion(position);
      }

      if (active.id === 'draggable-result') {
        onAddResult(position);
      }
    }
  }, [])


  // コミット
  const handleCommit = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      (async () => {
        try {
          const res = await commitCityHeavenFlow(
            flowId, flow.nodes, flow.edges, firstNodeId,
            flowTitle, flowUrl
          );
          toast.success('保存しました', { duration: 4000 });
        } catch (error) {
          toast.error('失敗!')
        }
      })();
    }
  }, [rfInstance, firstNodeId, flowTitle, flowUrl]);



  // edgeの再接続時イベント
  const onReconnect = useCallback((oldEdge: Edge, newConn: Connection) => {
    edgeReconnSuccess.current = true;
    setEdges((eds) => reconnectEdge(oldEdge, newConn, eds));
  }, []);

  // edgeの再接続開始時イベント
  const onReconnectStart = useCallback(() => {
    edgeReconnSuccess.current = false;
  }, []);


  const onReconnectEnd = useCallback((edge: Edge) => {
    if (!edgeReconnSuccess.current) {
      setEdges(eds => eds.filter((ed) => ed.id !== edge.id));
    }
    edgeReconnSuccess.current = true;
  }, []);

  const onConnect = useCallback((params: Connection | Edge) => {
    setEdges((eds) => addEdge(params, eds))
  }, [setEdges]);

  return (
    <div className='h-full flex' >

      <DndContext onDragEnd={(event) => handleDragEnd(event)}>
        <div className='w-[10%] flex items-center flex-col gap-y-3 py-3 bg-slate-800'>
          <Draggable id="draggable-question" label="質問" />
          <Draggable id="draggable-result" label="アンケート終了" />
          <button
            className='bg-purple-700 border rounded w-[120px] h-[80px] text-white'
            onClick={() => handleCommit()}
          >
            保存
          </button>

        </div>
        <Droppable id="droppableA">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            snapToGrid
            edgeTypes={{ smoothstep: SmoothStepEdge }}
            connectionLineType={ConnectionLineType.SmoothStep}
            onReconnect={(oldEdge, newConn) => onReconnect(oldEdge, newConn)}
            onReconnectStart={() => onReconnectStart()}
            onReconnectEnd={(_, edge) => onReconnectEnd(edge)}
            onConnect={(params) => onConnect(params)}
            onInit={setRfInstance}
            defaultEdgeOptions={defaultEdgeOptions}
          >
            <Background
              color='#222'
              variant={BackgroundVariant.Lines}
              gap={20} />
            <Controls />
          </ReactFlow>
        </Droppable>
      </DndContext>
    </div>
  )
};

export default memo(CityHeavenFlow);





// import { useState, useCallback, useEffect, useMemo, useRef, memo } from 'react';
// import { getUniqueId, getInitialNodes, getInitialEdges, commitCityHeavenFlow, getFirstQuestionId } from '../../utils';
// import { useOwnerStore } from '../../store';
// import CityHeavenQuestionNode from './CityHeavenQuestionNode';
// import CityHeavenResultNode from './CityHeavenResultNode';
// import { DndContext, DragEndEvent } from "@dnd-kit/core";
// import Draggable from '../../components/dnd/Draggable';
// import Droppable from '../../components/dnd/Droppable';
// import {
//   ReactFlow, Node, Edge, Connection, useNodes, useEdges, addEdge, reconnectEdge, useReactFlow, Panel, ReactFlowInstance, Controls, Background, SmoothStepEdge, BackgroundVariant,
//   OnNodesChange, applyNodeChanges,
//   OnEdgesChange, applyEdgeChanges,
//   ConnectionLineType, MarkerType
// } from '@xyflow/react';
// import '@xyflow/react/dist/style.css';
// import '../../../../../css/owner/flow.css'
// import { GiConsoleController } from 'react-icons/gi';
// import toast, { Toaster } from 'react-hot-toast';
// import { Menu, Item, TriggerEvent, Separator, Submenu, ItemParams, useContextMenu } from "react-contexify";
// import "react-contexify/dist/ReactContexify.css";

// const QUESTION_MENU_ID = "cityheaven-qestion-menu-id";

// const CityHeavenFlow = ({ flowId }: { flowId: number }) => {
//   const [nodes, setNodes] = useState<Node[]>(useNodes());
//   const [edges, setEdges] = useState<Edge[]>(useEdges());
//   const [rfInstance, setRfInstance] = useState<ReactFlowInstance>();

//   const setFirstNodeId = useOwnerStore((state) => state.setFirstNodeId);
//   const firstNodeId = useOwnerStore((state) => state.firstNodeId);
//   const flowTitle = useOwnerStore((state) => state.flowTitle);
//   const flowUrl = useOwnerStore((state) => state.flowUrl);

//   const edgeReconnSuccess = useRef(true);

//   const { screenToFlowPosition, addNodes, setViewport, getNodes, deleteElements } = useReactFlow();

//   const nodeTypes = useMemo(() => (
//     {
//       cityHeavenQuestionNode: CityHeavenQuestionNode,
//       cityHeavenResultNode: CityHeavenResultNode
//     }
//   ), []);

//   const defaultEdgeOptions = useMemo(() => (
//     {
//       type: 'smoothstep',
//     }
//   ), []);


//   const onNodesChange: OnNodesChange = useCallback(
//     (changes) => {
//       // console.log(('呼ばれた'))
//       setNodes((oldNodes) => applyNodeChanges(changes, oldNodes));
//     }, [setNodes]);

//   const onEdgesChange: OnEdgesChange = useCallback(
//     (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
//     [setEdges],
//   );



//   const onAddQuestion = (position: { x: number; y: number }) => {
//     const newQuestionNo = getUniqueId();
//     const newChoiceNo = getUniqueId();

//     // 既存の質問ノードが0個の場合、追加した質問ノードをアンケートの最初の質問にする
//     if (getNodes().length === 0) {
//       setFirstNodeId(newQuestionNo);
//     }

//     addNodes({
//       id: newQuestionNo,
//       data: {
//         topic: "",
//         choices: [{ id: newChoiceNo, content: "", }]
//       },
//       position,
//       type: "cityHeavenQuestionNode",
//       dragHandle: '.custom-drag-handle',
//     });
//   };

//   // 結果ノード追加
//   const onAddResult = (position: { x: number; y: number }) => {
//     const newId = getUniqueId();
//     addNodes({
//       id: newId,
//       data: { result: "" },
//       position,
//       type: "cityHeavenResultNode",
//       dragHandle: '.custom-drag-handle',
//     });
//   };


//   const handleDragEnd = useCallback(({ active, over, delta, activatorEvent }: DragEndEvent) => {

//     // フロー作成エリア以外にドロップしたら何もしない
//     if (over == null || over.id != 'droppableA') {
//       return;
//     }

//     // activatorEventがMouseEventの場合に処理を進める
//     // イベントが他の入力デバイス（例えばタッチデバイス）でも安全に動作すする
//     if (activatorEvent instanceof MouseEvent) {
//       const absoluteX = activatorEvent.pageX + delta.x;
//       const absoluteY = activatorEvent.pageY + delta.y;

//       // ブラウザ上の絶対座標をreactFlow上の座標に変換する
//       const position = screenToFlowPosition({
//         x: absoluteX,
//         y: absoluteY,
//       });

//       if (active.id === 'draggable-question') {
//         onAddQuestion(position);
//       }

//       if (active.id === 'draggable-result') {
//         onAddResult(position);
//       }
//     }
//   }, [])


//   // コミット
//   const handleCommit = useCallback(() => {
//     if (rfInstance) {
//       const flow = rfInstance.toObject();
//       (async () => {
//         try {
//           const res = await commitCityHeavenFlow(
//             flowId, flow.nodes, flow.edges, firstNodeId,
//             flowTitle, flowUrl
//           );
//           toast.success('Successfully toasted!', { duration: 3000 });
//         } catch (error) {
//           toast.error('失敗!')
//         }
//       })();
//     }
//   }, [rfInstance, firstNodeId, flowTitle, flowUrl]);



//   // edgeの再接続時イベント
//   const onReconnect = useCallback((oldEdge: Edge, newConn: Connection) => {
//     edgeReconnSuccess.current = true;
//     setEdges((eds) => reconnectEdge(oldEdge, newConn, eds));
//   }, []);

//   // edgeの再接続開始時イベント
//   const onReconnectStart = useCallback(() => {
//     edgeReconnSuccess.current = false;
//   }, []);


//   const onReconnectEnd = useCallback((edge: Edge) => {
//     if (!edgeReconnSuccess.current) {
//       setEdges(eds => eds.filter((ed) => ed.id !== edge.id));
//     }
//     edgeReconnSuccess.current = true;
//   }, []);

//   // const onReconnectEnd = useCallback((_: MouseEvent | TouchEvent, edge: Edge) => {
//   //   if (!edgeReconnSuccess.current) {
//   //     setEdges(eds => eds.filter((ed) => ed.id !== edge.id));
//   //   }
//   //   edgeReconnSuccess.current = true;
//   // }, []);

//   const onConnect = useCallback((params: Connection | Edge) => {
//     setEdges((eds) => addEdge(params, eds))
//   }, [setEdges]);

//   const deleteNode = useCallback(() => {
//     const selectedNode = getNodes().filter(x => x.selected === true);
//     deleteElements({ nodes: [{ id: selectedNode[0].id }] });
//   }, [getNodes]);


//   const handleUpdateFirstQuestion = useCallback(() => {
//     const selectedNode = getNodes().filter(x => x.selected === true);
//     setFirstNodeId(selectedNode[0].id)
//   }, [getNodes]);

//   return (
//     <div className='h-full flex' >
//       <DndContext onDragEnd={(event) => handleDragEnd(event)}>

//         <div className='w-[10%] flex items-center flex-col gap-y-3 py-3 bg-slate-800'>
//           <Draggable id="draggable-question" label="質問" />
//           <Draggable id="draggable-result" label="アンケート終了" />
//           <button
//             className='bg-purple-700 border rounded w-[120px] h-[80px] text-white'
//             onClick={() => handleCommit()}
//           >
//             保存
//           </button>

//         </div>

//         <Droppable id="droppableA">
//           <ReactFlow
//             nodes={nodes}
//             edges={edges}
//             nodeTypes={nodeTypes}
//             // edgeTypes={{ smoothstep: SmoothStepEdge }}
//             onEdgesChange={(changes) => onEdgesChange(changes)}
//             onNodesChange={(changes) => onNodesChange(changes)}
//             fitView
//             fitViewOptions={{ padding: 0.4 }}
//             snapToGrid
//             edgeTypes={{ smoothstep: SmoothStepEdge }}
//             connectionLineType={ConnectionLineType.SmoothStep}
//             onReconnect={(oldEdge, newConn) => onReconnect(oldEdge, newConn)}
//             onReconnectStart={() => onReconnectStart()}
//             onReconnectEnd={(_, edge) => onReconnectEnd(edge)}
//             onConnect={(params) => onConnect(params)}
//             onInit={setRfInstance}
//             defaultEdgeOptions={defaultEdgeOptions}
//           >
//             <Background
//               color='#222'
//               variant={BackgroundVariant.Lines}
//               gap={20} />
//             <Controls />
//           </ReactFlow>
//         </Droppable>
//       </DndContext>


//       <Toaster position="bottom-right" reverseOrder={false} />

//       <Menu id={QUESTION_MENU_ID}>
//         <Item onClick={() => handleUpdateFirstQuestion()}>
//           1問目に設定
//         </Item>
//         <Item onClick={() => deleteNode()}>
//           削除
//         </Item>
//       </Menu>
//     </div>
//   )
// };

// export default memo(CityHeavenFlow);

