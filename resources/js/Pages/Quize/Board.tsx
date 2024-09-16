import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useCallback, useRef } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  type OnConnect,
  BackgroundVariant,
  Node,
  Edge,
  applyNodeChanges,
  reconnectEdge,
  Connection,
  // Panel
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { BoardNode } from './Nodes';
import { getQuizeNode } from './utils';
import { NodeType, NodeCategory } from './types';
// const initialNodes: Node[] = [
//   { id: '1', position: { x: 0, y: 0 }, data: { label: '1' }, type: 'model' }
// ];

// const initialNodes: Node[] = [
//   { id: '1', position: { x: 0, y: 0 }, data: { label: '1' }, type: 'model' }
// ];

const initialNodes: Node[] = getQuizeNode().map(quize => {
  return {
    id: quize.title,
    position: { x: 0, y: 0 },
    data: quize,
    type: "model"
  }
})

const initialEdges: Edge[] = [];

const Board = () => {

  const [Nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const edgeReconnectSuccessful = useRef(true);

  const onConnect: OnConnect = useCallback(conn => {
    setEdges(prev => addEdge(conn, prev));
  }, []);

  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);

  const onReconnect = useCallback((oldEdge: Edge, newConn: Connection) => {
    edgeReconnectSuccessful.current = true;
    setEdges((els) => reconnectEdge(oldEdge, newConn, els));
  }, []);

  const onReconnectEnd = useCallback((_: MouseEvent | TouchEvent, edge: Edge) => {
    if (!edgeReconnectSuccessful.current) {
      setEdges(prev => prev.filter((e) => e.id !== edge.id));
    }
    edgeReconnectSuccessful.current = true;
  }, []);


  const onAddQuize = () => {
    const newQuizeNode = {
      id: "2",
      data: {
        category: NodeCategory.QUIZE,
        // isQuize: true,
        title: '好きな季節は？',
        choices: [
          {
            id: "1",
            content: "春"
          },
          {
            id: "2",
            content: "夏"
          },
          {
            id: "3",
            content: "秋"
          },
          {
            id: "4",
            content: "冬"
          },
        ]
      },
      position: {
        x: 0,
        y: 0 + (Nodes.length + 1) * 40
      },
      type: "model"
    };
    setNodes((prev) => prev.concat(newQuizeNode));
  };

  return (
    <div className="w-screen h-screen bg-slate-950">
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={onAddQuize}>質問追加</button>
      <ReactFlow
        defaultNodes={Nodes}
        nodes={Nodes}
        defaultEdges={edges}
        edges={edges}
        nodeTypes={{ model: BoardNode }}
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
    </div >
  )
}

export default Board