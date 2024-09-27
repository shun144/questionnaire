
import React, { useCallback, useRef, useMemo, useState, useEffect } from 'react';
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
  const { screenToFlowPosition, getNodes, addNodes } = useReactFlow();

  // カスタムノードを参照できるようにする
  const nodeTypes = useMemo(() => (
    {
      quizeNode: QuizeNode,
      resultNode: ResultNode
    }
  ), []);



  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await axios.get('http://127.0.0.1:8000/quize');
  //       console.log(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, [])



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


  /**
   * 質問ノード追加
   * @param position 
   */
  const onAddQuize = (position: { x: number; y: number }) => {
    const newId = getNewId(getNodes(), 'quize-');
    addNodes({
      id: newId,
      data: {
        quizeNo: newId,
        topic: "",
        choices: [
          {
            choiceNo: `${newId}-1`,
            content: "",
          }
        ]
      },
      position,
      type: "quizeNode"
    });
  };

  /**
   * 結果ノード追加
   * @param position 
   */
  const onAddResult = (position: { x: number; y: number }) => {
    const newId = getNewId(getNodes(), 'result-');
    addNodes({
      id: newId,
      data: {
        resultNo: newId,
        message: "",
      },
      position,
      type: "resultNode"
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

      if (active.id === 'draggable-quize') {
        onAddQuize(position);
      }

      if (active.id === 'draggable-result') {
        onAddResult(position);
      }
    }
  }, [])

  return (
    <div className='flex h-full'>
      <DndContext onDragEnd={handleDragEnd}>
        {/* サイドバー */}
        <div className='w-[10%] flex items-center flex-col gap-y-3 pt-3 bg-slate-800'>
          <Draggable id="draggable-quize" label="質問追加" />
          <Draggable id="draggable-result" label="結果追加" />
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
            fitViewOptions={{ padding: 0.2 }}
            snapToGrid
            onReconnect={onReconnect}
            onReconnectStart={onReconnectStart}
            onReconnectEnd={onReconnectEnd}
            onConnect={onConnect}
          >
            <Background color='#222' variant={BackgroundVariant.Lines}
              gap={20} />
            {/* <Background color='#222' variant={BackgroundVariant.Lines}></Background> */}
            <Controls />
          </ReactFlow>
        </Droppable>
      </DndContext>
    </div>
  )
}
export default Board;


