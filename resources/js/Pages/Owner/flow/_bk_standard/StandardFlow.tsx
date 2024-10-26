import { useState, useCallback, useEffect, useMemo, useRef, memo } from 'react';
import { getNewId, getInitialNodes, getInitialEdges, } from '../../utils';
import { useOwnerStore } from '../../store';
import QuestionNode from './QuestionNode';
import ResultNode from './ResultNode';
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Draggable from '../../components/dnd/Draggable';
import Droppable from '../../components/dnd/Droppable';
import { ReactFlow, Node, Edge, Connection, useNodesState, useEdgesState, addEdge, reconnectEdge, useReactFlow, Panel, ReactFlowInstance, Controls, Background, SmoothStepEdge, BackgroundVariant } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import '../../../../../css/owner/flow.css'
import { GiConsoleController } from 'react-icons/gi';
import toast, { Toaster } from 'react-hot-toast';


type Props = {
  flowId: number;
}

const StandardFlow = ({ flowId }: Props) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { screenToFlowPosition, addNodes, setViewport } = useReactFlow();
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance>();

  const setFirstNodeId = useOwnerStore((state) => state.setFirstNodeId);
  const firstNodeId = useOwnerStore((state) => state.firstNodeId);
  const flowTitle = useOwnerStore((state) => state.flowTitle);
  const flowUrl = useOwnerStore((state) => state.flowUrl);

  const nodeTypes = useMemo(() => (
    {
      questionNode: QuestionNode,
      resultNode: ResultNode
    }
  ), []);

  useEffect(() => {
    (async () => {
      const initialNodes = await getInitialNodes(flowId);
      const initialEdges = await getInitialEdges(flowId);
      setNodes(initialNodes);
      setEdges(initialEdges);
    })();
  }, [])

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // 質問ノード追加
  const onAddQuestion = (position: { x: number; y: number }) => {
    const newQuestionNo = getNewId();
    const newChoiceNo = getNewId();
    addNodes({
      id: newQuestionNo,
      data: {
        topic: "",
        choices: [
          {
            id: newChoiceNo,
            content: "",
          }
        ]
      },
      position,
      type: "questionNode",
      dragHandle: '.custom-drag-handle',
    });
  };

  // 結果ノード追加
  const onAddResult = (position: { x: number; y: number }) => {
    const newId = getNewId();
    addNodes({
      id: newId,
      data: {
        result: ""
      },
      position,
      type: "resultNode",
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
      // (async () => {
      //   try {
      //     const res = await commitStandardFlow(
      //       flowId, flow.nodes, flow.edges, firstNodeId,
      //       flowTitle, flowUrl
      //     );
      //     toast.success('Successfully toasted!', { duration: 3000 });
      //   } catch (error) {
      //     toast.error('失敗!')
      //   }
      // })();
    }
  }, [rfInstance, firstNodeId, flowTitle, flowUrl]);

  const edgeReconnSuccess = useRef(true);

  // edgeの再接続時イベント
  const onReconnect = useCallback((oldEdge: Edge, newConn: Connection) => {
    edgeReconnSuccess.current = true;
    setEdges((eds) => reconnectEdge(oldEdge, newConn, eds));
  }, []);

  // edgeの再接続開始時イベント
  const onReconnectStart = useCallback(() => {
    edgeReconnSuccess.current = false;
  }, []);


  const onReconnectEnd = useCallback((_: MouseEvent | TouchEvent, edge: Edge) => {
    if (!edgeReconnSuccess.current) {
      setEdges(eds => eds.filter((ed) => ed.id !== edge.id));
    }
    edgeReconnSuccess.current = true;
  }, []);

  return (
    <div className='flex h-full'>
      <DndContext onDragEnd={handleDragEnd}>

        <div className='w-[10%] flex items-center flex-col gap-y-3 pt-3 bg-slate-800'>
          <Draggable id="draggable-question" label="質問追加" />
          <Draggable id="draggable-result" label="結果追加" />

          <button
            className='bg-purple-700 border rounded w-[120px] h-[80px] text-white'
            onClick={handleCommit}>保存
          </button>

        </div>

        {/* ボード */}
        <Droppable id="droppableA">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={{ smoothstep: SmoothStepEdge }}
            onEdgesChange={onEdgesChange}
            onNodesChange={onNodesChange}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            snapToGrid
            onReconnect={onReconnect}
            onReconnectStart={onReconnectStart}
            onReconnectEnd={onReconnectEnd}
            onConnect={onConnect}
            onInit={setRfInstance}
          >
            <Background
              color='#222'
              variant={BackgroundVariant.Lines}
              gap={20} />
            <Controls />
          </ReactFlow>
        </Droppable>
      </DndContext>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  )
};


export default memo(StandardFlow);


