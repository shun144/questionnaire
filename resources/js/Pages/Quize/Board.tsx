
import React, { useCallback, useRef, useMemo, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  addEdge,
  BackgroundVariant,
  Edge,
  reconnectEdge,
  Connection,
  useReactFlow,
  SmoothStepEdge,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import QuizeNode from './QuizeNode';
import ResultNode from './ResultNode';
import { DndContext, DragOverlay, DragEndEvent } from "@dnd-kit/core";
import { Draggable } from './Draggable';
import { Droppable } from './Droppable';
import { getNewId, getInitialNodes, getInitialEdges } from './utils';

const initialNodes = getInitialNodes();
const initialEdges = getInitialEdges();

const Board = () => {

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);


  const { screenToFlowPosition, getNodes, getEdges } = useReactFlow();

  // カスタムノードを参照できるようにする
  const nodeTypes = useMemo(() => (
    {
      quizeNode: QuizeNode,
      resultNode: ResultNode
    }
  ), []);


  const edgeReconnSuccess = useRef(true);


  const onConnect = useCallback((params: Connection | Edge) => {
    setEdges(eds => addEdge({ ...params, type: "smoothstep" }, eds));
  }, []);

  const onReconnectStart = useCallback(() => {
    edgeReconnSuccess.current = false;
  }, []);

  const onReconnect = useCallback((oldEdge: Edge, newConn: Connection) => {
    edgeReconnSuccess.current = true;
    setEdges((eds) => reconnectEdge(oldEdge, newConn, eds));
  }, []);

  const onReconnectEnd = useCallback((_: MouseEvent | TouchEvent, edge: Edge) => {
    if (!edgeReconnSuccess.current) {
      setEdges(eds => eds.filter((ed) => ed.id !== edge.id));
    }
    edgeReconnSuccess.current = true;
  }, []);


  const onAddQuize = useCallback((newX: number, newY: number) => {
    const newId = getNewId(getNodes(), 'quize-');
    const newChoiceNo = `${newId}-1`

    const newQuizeNode = {
      id: newId,
      data: {
        quizeNo: newId,
        x: newX,
        y: newY,
        topic: "",
        choices: [
          {
            choiceNo: newChoiceNo,
            content: "",
          }
        ]
      },
      position: {
        x: newX,
        y: newY
      },
      type: "quizeNode"
    };
    setNodes((prev) => prev.concat(newQuizeNode));
  }, []);

  const handleDragEnd = useCallback(({ active, over, delta, activatorEvent }: DragEndEvent) => {
    if (over == null || over.id != 'droppableA') {
      return;
    }
    // activatorEventがMouseEventの場合に処理を進める
    // イベントが他の入力デバイス（例えばタッチデバイス）でも安全に動作すする
    if (activatorEvent instanceof MouseEvent) {
      const absoluteX = activatorEvent.pageX + delta.x;
      const absoluteY = activatorEvent.pageY + delta.y;

      // ブラウザ上の絶対座標をreactFlow上の座標に変換する
      const pos = screenToFlowPosition({
        x: absoluteX,
        y: absoluteY,
      });

      onAddQuize(pos.x, pos.y);
    }
  }, [])

  return (
    <div className='flex h-full'>
      <DndContext onDragEnd={handleDragEnd}>
        <div className='bg-green-200 w-[10%] min-w-40'>
          <Draggable id="draggableA" label="質問追加" />
        </div>
        <Droppable id="droppableA">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={{ smoothstep: SmoothStepEdge }}
            onEdgesChange={onEdgesChange}       // エッジの変更を自動でsetEdgesしてくれる
            onNodesChange={onNodesChange}       // ノードの変更を自動でsetNodesしてくれる
            fitView
            fitViewOptions={{ padding: 0.4 }}
            snapToGrid
            onReconnect={onReconnect}
            onReconnectStart={onReconnectStart}
            onReconnectEnd={onReconnectEnd}
            onConnect={onConnect}
          >
            <Background color='#222' variant={BackgroundVariant.Lines}></Background>
            <Controls />
          </ReactFlow>
        </Droppable>
      </DndContext>
    </div>
  )
}
export default Board;




// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Head } from '@inertiajs/react';
// import React, { useCallback, useRef, useMemo, useState } from 'react';
// import {
//   ReactFlow,
//   MiniMap,
//   Controls,
//   Background,
//   addEdge,
//   BackgroundVariant,
//   Node,
//   Edge,
//   reconnectEdge,
//   Connection,
//   useReactFlow,
//   // OnNodesChange,
//   // OnEdgesChange,
//   SmoothStepEdge,
//   useNodes,
//   useEdges,
//   applyNodeChanges,
//   applyEdgeChanges,
//   NodeChange,
//   EdgeChange,
// } from '@xyflow/react';
// import '@xyflow/react/dist/style.css';
// import QuizeNode from './QuizeNode';
// import ResultNode from './ResultNode';
// import { DndContext, DragOverlay, DragEndEvent } from "@dnd-kit/core";
// import { Draggable } from './Draggable';
// import { Droppable } from './Droppable';
// import { getNewId } from './utils';


// const Board = () => {

//   const { screenToFlowPosition, getNodes, getEdges } = useReactFlow();

//   const [nodes, setNodes] = useState<Node[]>(getNodes());
//   const [edges, setEdges] = useState<Edge[]>(getEdges());


//   // カスタムノードを参照できるようにする
//   const nodeTypes = useMemo(() => (
//     {
//       quizeNode: QuizeNode,
//       resultNode: ResultNode
//     }
//   ), []);

//   const onNodesChange = useCallback(
//     (changes: NodeChange<Node>[]) => {
//       setNodes((nds) => applyNodeChanges(changes, nds))
//     },
//     [setNodes]
//   );

//   const onEdgesChange = useCallback(
//     (changes: EdgeChange<Edge>[]) => {
//       setEdges((eds) => applyEdgeChanges(changes, eds))
//     },
//     [setEdges]
//   );


//   // const onNodesChange: OnNodesChange = useCallback(
//   //   (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
//   //   [setNodes],
//   // );

//   // const onEdgesChange: OnEdgesChange = useCallback(
//   //   (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
//   //   [setEdges],
//   // );

//   const edgeReconnSuccess = useRef(true);


//   const onConnect = useCallback((params: Connection | Edge) => {
//     setEdges(eds => addEdge({ ...params, type: "smoothstep" }, eds));
//   }, []);

//   const onReconnectStart = useCallback(() => {
//     edgeReconnSuccess.current = false;
//   }, []);

//   const onReconnect = useCallback((oldEdge: Edge, newConn: Connection) => {
//     edgeReconnSuccess.current = true;
//     setEdges((eds) => reconnectEdge(oldEdge, newConn, eds));
//   }, []);

//   const onReconnectEnd = useCallback((_: MouseEvent | TouchEvent, edge: Edge) => {
//     if (!edgeReconnSuccess.current) {
//       setEdges(eds => eds.filter((ed) => ed.id !== edge.id));
//     }
//     edgeReconnSuccess.current = true;
//   }, []);


//   const getNewQuizeId = useCallback((): string => {
//     return getNewId(getNodes(), 'quize-');
//   }, []);

//   const onAddQuize = useCallback((newX: number, newY: number) => {
//     const newId = getNewQuizeId();

//     const newQuizeNode = {
//       id: newId,
//       data: {
//         quizeNo: newId,
//         x: newX,
//         y: newY,
//         topic: "",
//         choices: [
//           {
//             choiceNo: `${newId}-1`,
//             content: "",
//           }
//         ]
//       },
//       position: {
//         x: newX,
//         y: newY
//       },
//       type: "quizeNode"
//     };
//     setNodes((prev) => prev.concat(newQuizeNode));
//   }, []);

//   const handleDragEnd = useCallback(({ active, over, delta, activatorEvent }: DragEndEvent) => {
//     if (over == null || over.id != 'droppableA') {
//       return;
//     }
//     // activatorEventがMouseEventの場合に処理を進める
//     // イベントが他の入力デバイス（例えばタッチデバイス）でも安全に動作すする
//     if (activatorEvent instanceof MouseEvent) {
//       const absoluteX = activatorEvent.pageX + delta.x;
//       const absoluteY = activatorEvent.pageY + delta.y;

//       // ブラウザ上の絶対座標をreactFlow上の座標に変換する
//       const pos = screenToFlowPosition({
//         x: absoluteX,
//         y: absoluteY,
//       });

//       onAddQuize(pos.x, pos.y);
//     }
//   }, [])

//   return (
//     <div className='flex h-full'>
//       <DndContext onDragEnd={handleDragEnd}>
//         <div className='bg-green-200 w-[10%] min-w-40'>
//           <Draggable id="draggableA" label="質問追加" />
//         </div>
//         <Droppable id="droppableA">
//           <ReactFlow
//             nodes={nodes}
//             edges={edges}
//             nodeTypes={nodeTypes}
//             edgeTypes={{ smoothstep: SmoothStepEdge }}
//             onEdgesChange={onEdgesChange}       // エッジの変更を自動でsetEdgesしてくれる
//             onNodesChange={onNodesChange}       // ノードの変更を自動でsetNodesしてくれる
//             fitView
//             fitViewOptions={{ padding: 0.4 }}
//             snapToGrid
//             onReconnect={onReconnect}
//             onReconnectStart={onReconnectStart}
//             onReconnectEnd={onReconnectEnd}
//             onConnect={onConnect}
//           >
//             <Background color='#222' variant={BackgroundVariant.Lines}></Background>
//             <Controls />
//           </ReactFlow>
//         </Droppable>
//       </DndContext>
//     </div>
//   )
// }

// export default Board;

















// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Head } from '@inertiajs/react';
// import React, { useCallback, useRef, useMemo, useState } from 'react';
// import {
//   ReactFlow,
//   MiniMap,
//   Controls,
//   Background,
//   addEdge,
//   type OnConnect,
//   BackgroundVariant,
//   Node,
//   Edge,
//   reconnectEdge,
//   Connection,
//   useReactFlow,
//   OnNodesChange,
//   OnEdgesChange,
//   SmoothStepEdge,

//   // Panel
// } from '@xyflow/react';
// import '@xyflow/react/dist/style.css';
// import { getInitialNode, getInitialEdge } from './utils';
// import QuizeNode from './QuizeNode';
// import ResultNode from './ResultNode';
// import { DndContext, DragOverlay, DragEndEvent } from "@dnd-kit/core";
// import { Draggable } from './Draggable';
// import { Droppable } from './Droppable';
// import { getNewId } from './utils';


// type Props = {
//   nodes: Node[];
//   setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
//   onNodesChange: OnNodesChange<Node>;
//   edges: Edge[];
//   setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
//   onEdgesChange: OnEdgesChange<Edge>;
// }

// const Board = ({
//   nodes,
//   edges,
//   setNodes,
//   onNodesChange,
//   setEdges,
//   onEdgesChange
// }: Props) => {

//   const { screenToFlowPosition, getNodes } = useReactFlow();

//   // カスタムノードを参照できるようにする
//   const nodeTypes = useMemo(() => (
//     {
//       quizeNode: QuizeNode,
//       resultNode: ResultNode
//     }
//   ), []);


//   // const onNodesChange: OnNodesChange = useCallback(
//   //   (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
//   //   [setNodes],
//   // );

//   // const onEdgesChange: OnEdgesChange = useCallback(
//   //   (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
//   //   [setEdges],
//   // );

//   const edgeReconnSuccess = useRef(true);


//   const onConnect = useCallback((params: Connection | Edge) => {
//     setEdges(eds => addEdge({ ...params, type: "smoothstep" }, eds));
//   }, []);

//   const onReconnectStart = useCallback(() => {
//     edgeReconnSuccess.current = false;
//   }, []);

//   const onReconnect = useCallback((oldEdge: Edge, newConn: Connection) => {
//     edgeReconnSuccess.current = true;
//     setEdges((eds) => reconnectEdge(oldEdge, newConn, eds));
//   }, []);

//   const onReconnectEnd = useCallback((_: MouseEvent | TouchEvent, edge: Edge) => {
//     if (!edgeReconnSuccess.current) {
//       setEdges(eds => eds.filter((ed) => ed.id !== edge.id));
//     }
//     edgeReconnSuccess.current = true;
//   }, []);


//   const getNewQuizeId = useCallback((): string => {
//     return getNewId(getNodes(), 'quize-');
//   }, []);

//   const onAddQuize = useCallback((newX: number, newY: number) => {
//     const newId = getNewQuizeId();

//     const newQuizeNode = {
//       id: newId,
//       data: {
//         quizeNo: newId,
//         x: newX,
//         y: newY,
//         topic: "",
//         choices: [
//           {
//             choiceNo: `${newId}-1`,
//             content: "",
//           }
//         ]
//       },
//       position: {
//         x: newX,
//         y: newY
//       },
//       type: "quizeNode"
//     };
//     setNodes((prev) => prev.concat(newQuizeNode));
//   }, []);

//   const handleDragEnd = useCallback(({ active, over, delta, activatorEvent }: DragEndEvent) => {
//     if (over == null || over.id != 'droppableA') {
//       return;
//     }
//     // activatorEventがMouseEventの場合に処理を進める
//     // イベントが他の入力デバイス（例えばタッチデバイス）でも安全に動作すする
//     if (activatorEvent instanceof MouseEvent) {
//       const absoluteX = activatorEvent.pageX + delta.x;
//       const absoluteY = activatorEvent.pageY + delta.y;

//       // ブラウザ上の絶対座標をreactFlow上の座標に変換する
//       const pos = screenToFlowPosition({
//         x: absoluteX,
//         y: absoluteY,
//       });

//       onAddQuize(pos.x, pos.y);
//     }
//   }, [])

//   return (
//     <DndContext
//       onDragEnd={handleDragEnd}
//     >
//       <div className='flex h-full'>
//         <div className='bg-green-200 w-[10%] min-w-40'>
//           <Draggable id="draggableA" label="質問追加" />
//         </div>
//         <Droppable id="droppableA">
//           <ReactFlow
//             nodes={nodes}
//             edges={edges}
//             nodeTypes={nodeTypes}
//             edgeTypes={{ smoothstep: SmoothStepEdge }}
//             onEdgesChange={onEdgesChange}       // エッジの変更を自動でsetEdgesしてくれる
//             onNodesChange={onNodesChange}       // ノードの変更を自動でsetNodesしてくれる
//             fitView
//             fitViewOptions={{ padding: 0.4 }}
//             snapToGrid
//             onReconnect={onReconnect}
//             onReconnectStart={onReconnectStart}
//             onReconnectEnd={onReconnectEnd}
//             onConnect={onConnect}
//           >
//             <Background color='#222' variant={BackgroundVariant.Lines}></Background>
//             <Controls />
//           </ReactFlow>
//         </Droppable>
//       </div>
//     </DndContext>
//   )
// }

// export default Board