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
  useNodesState, useEdgesState,
  OnNodesChange, OnEdgesChange,
  applyNodeChanges, applyEdgeChanges,
  SelectionMode,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import '../../../../../css/owner/flow.css'
import "react-contexify/dist/ReactContexify.css";
import CommitFlowButton from '../../components/button/CommitFlowButton'
import { router } from '@inertiajs/react';


type Props = {
  initialNodes: Node[];
  initialEdges: Edge[];
}

const CityHeavenFlow = ({ initialNodes, initialEdges }: Props) => {

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const edgeReconnSuccess = useRef(true);

  const isDirty = useOwnerStore((state) => state.isDirty);
  const setIsDirty = useOwnerStore((state) => state.setIsDirty);
  const setFirstNodeId = useOwnerStore((state) => state.setFirstNodeId);
  const { screenToFlowPosition, addNodes, setViewport, getNodes } = useReactFlow();

  const nodeTypes = useMemo(() => (
    {
      cityHeavenQuestionNode: CityHeavenQuestionNode,
      cityHeavenResultNode: CityHeavenResultNode
    }
  ), []);

  useEffect(() => {
    const beforeUnloadConfirm = router.on('before', (event) => {
      console.log(isDirty)
      if (isDirty) {
        return confirm('変更が保存されていませんがページを離れてもよろしいですか？');
      } else {
        return true;
      }
    });
    return () => {
      beforeUnloadConfirm();
    }
  }, [isDirty])


  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
      setIsDirty(true);
    },
    [setNodes, setIsDirty],
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      setEdges((oldEdges) => applyEdgeChanges(changes, oldEdges));
      setIsDirty(true);
    },
    [setEdges, setIsDirty],
  );

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
    if (over == null || over.id != 'droppableArea') {
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
    setEdges((eds) => addEdge({ ...params, type: 'smoothstep' }, eds))
  }, [setEdges]);

  const handleEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    setEdges(eds => eds.map(e => {
      if (e.id === edge.id) {
        return {
          ...e,
          animated: true,
          style: { stroke: "gold", strokeWidth: 3, zIndex: 1000 }
        }
      } else {
        return {
          ...e,
          animated: false,
          style: { zIndex: 0 }
        }
      }
    }))
  }, [setEdges])

  const handleEdgeContextMenu = useCallback((event: React.MouseEvent, edge: Edge) => {
    event.preventDefault();
    setEdges(eds => eds.filter(e => e.id !== edge.id))
  }, [setEdges])


  return (
    <div className='grow w-full flex'>
      <DndContext onDragEnd={(event) => handleDragEnd(event)}>
        <div className='h-full w-[10%] flex items-center flex-col gap-y-3 py-3 bg-slate-800'>
          <Draggable id="draggable-question" label="質問" />
          <Draggable id="draggable-result" label="アンケート終了" />
          {/* <CommitFlowButton flowId={flowId} /> */}
        </div>

        <Droppable id="droppableArea">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
            fitViewOptions={{ padding: 0.4 }}
            snapToGrid
            connectionLineType={ConnectionLineType.SmoothStep}
            onReconnect={onReconnect}
            onReconnectStart={onReconnectStart}
            onReconnectEnd={(_, edge) => onReconnectEnd(edge)}
            onConnect={onConnect}
            onEdgeClick={handleEdgeClick}
            onEdgeContextMenu={handleEdgeContextMenu}
            elevateEdgesOnSelect={true}

            panOnScroll
            selectionOnDrag
            panOnDrag={[1, 2]}
            selectionMode={SelectionMode.Partial}
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
// import { getUniqueId, commitCityHeavenFlow } from '../../utils';
// import { useOwnerStore } from '../../store';
// import CityHeavenQuestionNode from './CityHeavenQuestionNode';
// import CityHeavenResultNode from './CityHeavenResultNode';
// import { DndContext, DragEndEvent } from "@dnd-kit/core";
// import Draggable from '../../components/dnd/Draggable';
// import Droppable from '../../components/dnd/Droppable';
// import {
//   ReactFlow, Node, Edge, Connection, addEdge, reconnectEdge, useReactFlow, Panel, ReactFlowInstance, Controls, Background, SmoothStepEdge, BackgroundVariant,
//   ConnectionLineType, MarkerType,
//   useNodesState, useEdgesState,
//   OnNodesChange, OnEdgesChange,
//   applyNodeChanges, applyEdgeChanges,
//   SelectionMode,
// } from '@xyflow/react';
// import '@xyflow/react/dist/style.css';
// import '../../../../../css/owner/flow.css'
// import "react-contexify/dist/ReactContexify.css";
// import CommitFlowButton from '../../components/button/CommitFlowButton'
// import { router } from '@inertiajs/react';


// const CityHeavenFlow = ({ flowId, initialNodes, initialEdges }: { flowId: number, initialNodes: Node[], initialEdges: Edge[] }) => {

//   const [nodes, setNodes] = useState<Node[]>(initialNodes);
//   const [edges, setEdges] = useState<Edge[]>(initialEdges);
//   // const [isDirty, setIsDirty] = useState(false);

//   const isDirty = useOwnerStore((state) => state.isDirty);
//   const setIsDirty = useOwnerStore((state) => state.setIsDirty);
//   const setFirstNodeId = useOwnerStore((state) => state.setFirstNodeId);

//   useEffect(() => {
//     const beforeConfirm = router.on('before', (event) => {

//       if (isDirty) {
//         return confirm('変更が保存されていませんがページを離れてもよろしいですか？');
//       } else {
//         return true;
//       }
//     });
//     return () => {
//       beforeConfirm();
//     }
//   }, [isDirty])



//   const edgeReconnSuccess = useRef(true);

//   const { screenToFlowPosition, addNodes, setViewport, getNodes } = useReactFlow();


//   const nodeTypes = useMemo(() => (
//     {
//       cityHeavenQuestionNode: CityHeavenQuestionNode,
//       cityHeavenResultNode: CityHeavenResultNode
//     }
//   ), []);


//   const onNodesChange: OnNodesChange = useCallback(
//     (changes) => {
//       // console.log('ノード変更')
//       setNodes((nds) => applyNodeChanges(changes, nds));
//       setIsDirty(true);
//     },
//     [setNodes, setIsDirty],
//   );

//   const onEdgesChange: OnEdgesChange = useCallback(
//     (changes) => {
//       setEdges((oldEdges) => applyEdgeChanges(changes, oldEdges));
//       setIsDirty(true);
//     },
//     [setEdges, setIsDirty],
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
//         choices: [{ id: newChoiceNo, content: "", salePoints: [] }]
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
//     if (over == null || over.id != 'droppableArea') {
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

//   const onConnect = useCallback((params: Connection | Edge) => {
//     setEdges((eds) => addEdge({ ...params, type: 'smoothstep' }, eds))
//   }, [setEdges]);

//   const handleEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
//     setEdges(eds => eds.map(e => {
//       if (e.id === edge.id) {
//         return {
//           ...e,
//           animated: true,
//           style: { stroke: "gold", strokeWidth: 3, zIndex: 1000 }
//         }
//       } else {
//         return {
//           ...e,
//           animated: false,
//           style: { zIndex: 0 }
//         }
//       }
//     }))
//   }, [setEdges])

//   const handleEdgeContextMenu = useCallback((event: React.MouseEvent, edge: Edge) => {
//     event.preventDefault();
//     setEdges(eds => eds.filter(e => e.id !== edge.id))
//   }, [setEdges])



//   return (
//     <div className='h-full flex' >

//       <DndContext onDragEnd={(event) => handleDragEnd(event)}>
//         <div className='w-[10%] flex items-center flex-col gap-y-3 py-3 bg-slate-800'>
//           <Draggable id="draggable-question" label="質問" />
//           <Draggable id="draggable-result" label="アンケート終了" />
//           <CommitFlowButton flowId={flowId} />
//         </div>

//         <Droppable id="droppableArea">
//           <ReactFlow
//             nodes={nodes}
//             edges={edges}
//             nodeTypes={nodeTypes}
//             onNodesChange={onNodesChange}
//             onEdgesChange={onEdgesChange}
//             fitView
//             fitViewOptions={{ padding: 0.4 }}
//             snapToGrid
//             connectionLineType={ConnectionLineType.SmoothStep}
//             onReconnect={onReconnect}
//             onReconnectStart={onReconnectStart}
//             onReconnectEnd={(_, edge) => onReconnectEnd(edge)}
//             onConnect={onConnect}
//             onEdgeClick={handleEdgeClick}
//             onEdgeContextMenu={handleEdgeContextMenu}
//             elevateEdgesOnSelect={true}

//             panOnScroll
//             selectionOnDrag
//             panOnDrag={[1, 2]}
//             selectionMode={SelectionMode.Partial}
//           >
//             <Background
//               color='#222'
//               variant={BackgroundVariant.Lines}
//               gap={20} />
//             <Controls />
//           </ReactFlow>
//         </Droppable>
//       </DndContext>
//     </div>
//   )
// };

// export default memo(CityHeavenFlow);


