import { useState, useCallback, useEffect, useMemo, useRef, memo } from "react";
import { getNewId } from "@/Pages/Owner/utils";
import { useOwnerStore } from "@/Pages/Owner/store";
import QuestionNode from "./QuestionNode";
import ResultNode from "./ResultNode";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Draggable from "@/Pages/Owner/components/dnd/Draggable";
import Droppable from "@/Pages/Owner/components/dnd/Droppable";
import {
    ReactFlow,
    Panel,
    Node,
    Edge,
    useReactFlow,
    Controls,
    Background,
    BackgroundVariant,
    ConnectionLineType,
    OnNodesChange,
    OnEdgesChange,
    applyNodeChanges,
    applyEdgeChanges,
    SelectionMode,
    type Viewport,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./flow.css";
import "react-contexify/dist/ReactContexify.css";
import useConnectHook from "./useConnectHook";
import { router, usePage } from "@inertiajs/react";

type Props = {
    initialNodes: Node[];
    initialEdges: Edge[];
    defaultViewport: Viewport;
};

const Flow = ({ initialNodes, initialEdges, defaultViewport }: Props) => {
    const { url: currentUrl } = usePage();
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);

    const isDirty = useOwnerStore((state) => state.isDirty);
    const setIsDirty = useOwnerStore((state) => state.setIsDirty);
    const setFirstNodeId = useOwnerStore((state) => state.setFirstNodeId);

    const qNodeNum = useOwnerStore((state) => state.qNodeNum);
    const setQnodeNum = useOwnerStore((state) => state.setQnodeNum);
    const addQnodeNum = useOwnerStore((state) => state.addQnodeNum);

    const rNodeNum = useOwnerStore((state) => state.rNodeNum);
    const setRnodeNum = useOwnerStore((state) => state.setRnodeNum);
    const addRnodeNum = useOwnerStore((state) => state.addRnodeNum);

    const { screenToFlowPosition, addNodes, getNodes } = useReactFlow();

    const { onReconnect, onReconnectStart, onReconnectEnd, onConnect } =
        useConnectHook(setEdges);

    const nodeTypes = useMemo(
        () => ({
            qNode: QuestionNode,
            rNode: ResultNode,
        }),
        []
    );

    useEffect(() => {
        setQnodeNum(initialNodes.filter((x) => x.type === "qNode").length);
        setRnodeNum(initialNodes.filter((x) => x.type === "rNode").length);
    }, []);

    useEffect(() => {
        const beforeUnloadConfirm = router.on("before", (event) => {
            const vist = event.detail.visit;

            // 保存のリクエストは現在のクエリパラメータでpost送信する
            // 保存を行う際に確認メッセージを出さないようにする
            if (vist.url.pathname === currentUrl && vist.method === "post") {
                return true;
            }

            if (isDirty) {
                return confirm(
                    "変更が保存されていませんがページを離れてもよろしいですか？"
                );
            }
            return true;
        });
        return () => beforeUnloadConfirm();
    }, [isDirty]);

    const onNodesChange: OnNodesChange = useCallback(
        (changes) => {
            setNodes((nds) => applyNodeChanges(changes, nds));
            setIsDirty(true);
        },
        [setNodes, setIsDirty]
    );

    const onEdgesChange: OnEdgesChange = useCallback(
        (changes) => {
            setEdges((oldEdges) => applyEdgeChanges(changes, oldEdges));
            setIsDirty(true);
        },
        [setEdges, setIsDirty]
    );

    const onAddQuestion = (position: { x: number; y: number }) => {
        const newQuestionNo = getNewId();
        const newChoiceNo = getNewId();

        // 既存の質問ノードが0個の場合、追加した質問ノードをアンケートの最初の質問にする
        if (getNodes().filter((x) => x.type === "qNode").length === 0) {
            setFirstNodeId(newQuestionNo);
        }

        addNodes({
            id: newQuestionNo,
            data: {
                topic: "",
                choices: [{ id: newChoiceNo, content: "" }],
            },
            position,
            type: "qNode",
            dragHandle: ".dhandle",
        });

        addQnodeNum(1);
    };

    // 結果ノード追加
    const onAddResult = (position: { x: number; y: number }) => {
        const newId = getNewId();
        addNodes({
            id: newId,
            data: { result: "" },
            position,
            type: "rNode",
            dragHandle: ".dhandle",
        });
        addRnodeNum(1);
    };

    const handleDragEnd = useCallback(
        ({ active, over, delta, activatorEvent }: DragEndEvent) => {
            // フロー作成エリア以外にドロップしたら何もしない
            if (over == null || over.id != "droppableArea") return;

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

                switch (active.id) {
                    case "draggable-question":
                        onAddQuestion(position);
                        break;
                    case "draggable-result":
                        onAddResult(position);
                        break;
                    default:
                        break;
                }
            }
        },
        []
    );

    const handleEdgeClick = useCallback(
        (_: React.MouseEvent, edge: Edge) => {
            setEdges((eds) =>
                eds.map((ed) => {
                    if (ed.id === edge.id) {
                        return {
                            ...ed,
                            animated: !ed.animated,
                            style: ed.animated
                                ? { stroke: "gray", strokeWidth: 2 }
                                : { stroke: "gold", strokeWidth: 3 },
                        };
                    } else {
                        return {
                            ...ed,
                            animated: false,
                            style: {},
                        };
                    }
                })
            );
        },
        [setEdges]
    );

    const handleEdgeContextMenu = useCallback(
        (event: React.MouseEvent, edge: Edge) => {
            event.preventDefault();
            setEdges((eds) => eds.filter((ed) => ed.id !== edge.id));
        },
        [setEdges]
    );

    return (
        <div className="grow w-full flex">
            <DndContext onDragEnd={handleDragEnd}>
                <Droppable id="droppableArea">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        snapToGrid
                        connectionLineType={ConnectionLineType.SmoothStep}
                        onReconnect={onReconnect}
                        onReconnectStart={onReconnectStart}
                        onReconnectEnd={(_, edge) => onReconnectEnd(edge)}
                        onConnect={onConnect}
                        onEdgeClick={handleEdgeClick}
                        onEdgeContextMenu={handleEdgeContextMenu}
                        elevateEdgesOnSelect={true}
                        defaultViewport={defaultViewport}
                        panOnScroll
                        elementsSelectable
                        selectionMode={SelectionMode.Partial}
                    >
                        <Background
                            color="#222"
                            variant={BackgroundVariant.Lines}
                            gap={20}
                        />
                        <Panel position="top-right">
                            <Droppable id="panel-area">
                                <div className="w-24 h-60 py-3 bg-slate-800 rounded-md shadow flex flex-col justify-around items-center">
                                    <Draggable
                                        id="draggable-question"
                                        label="質問"
                                        color="indigo"
                                        nodeNum={qNodeNum}
                                        maxNodeNum={15}
                                    />
                                    <Draggable
                                        id="draggable-result"
                                        label="結果"
                                        color="orange"
                                        nodeNum={rNodeNum}
                                        maxNodeNum={10}
                                    />
                                </div>
                            </Droppable>
                        </Panel>
                        <Controls />
                    </ReactFlow>
                </Droppable>
            </DndContext>
        </div>
    );
};

export default memo(Flow);

// import { useState, useCallback, useEffect, useMemo, useRef, memo } from "react";
// import { getNewId } from "@/Pages/Owner/utils";
// import { useOwnerStore } from "@/Pages/Owner/store";
// import QuestionNode from "./QuestionNode";
// import ResultNode from "./ResultNode";
// import { DndContext, DragEndEvent } from "@dnd-kit/core";
// import Draggable from "@/Pages/Owner/components/dnd/Draggable";
// import Droppable from "@/Pages/Owner/components/dnd/Droppable";
// import {
//     ReactFlow,
//     Panel,
//     Node,
//     Edge,
//     useReactFlow,
//     Controls,
//     Background,
//     BackgroundVariant,
//     ConnectionLineType,
//     OnNodesChange,
//     OnEdgesChange,
//     applyNodeChanges,
//     applyEdgeChanges,
//     SelectionMode,
//     type Viewport,
// } from "@xyflow/react";
// import "@xyflow/react/dist/style.css";
// import "./flow.css";
// import "react-contexify/dist/ReactContexify.css";
// import useConnectHook from "./useConnectHook";
// import { router, usePage } from "@inertiajs/react";

// type Props = {
//     initialNodes: Node[];
//     initialEdges: Edge[];
//     defaultViewport: Viewport;
// };

// const Flow = ({ initialNodes, initialEdges, defaultViewport }: Props) => {
//     const { url: currentUrl } = usePage();
//     const [nodes, setNodes] = useState<Node[]>(initialNodes);
//     const [edges, setEdges] = useState<Edge[]>(initialEdges);

//     const isDirty = useOwnerStore((state) => state.isDirty);
//     const setIsDirty = useOwnerStore((state) => state.setIsDirty);
//     const setFirstNodeId = useOwnerStore((state) => state.setFirstNodeId);

//     const qNodeNum = useOwnerStore((state) => state.qNodeNum);
//     const setQnodeNum = useOwnerStore((state) => state.setQnodeNum);
//     const addQnodeNum = useOwnerStore((state) => state.addQnodeNum);

//     const rNodeNum = useOwnerStore((state) => state.rNodeNum);
//     const setRnodeNum = useOwnerStore((state) => state.setRnodeNum);
//     const addRnodeNum = useOwnerStore((state) => state.addRnodeNum);

//     const { screenToFlowPosition, addNodes, getNodes } = useReactFlow();

//     const { onReconnect, onReconnectStart, onReconnectEnd, onConnect } =
//         useConnectHook(setEdges);

//     const nodeTypes = useMemo(
//         () => ({
//             qNode: QuestionNode,
//             rNode: ResultNode,
//         }),
//         []
//     );

//     useEffect(() => {
//         setQnodeNum(initialNodes.filter((x) => x.type === "qNode").length);
//         setRnodeNum(initialNodes.filter((x) => x.type === "rNode").length);
//     }, []);

//     useEffect(() => {
//         const beforeUnloadConfirm = router.on("before", (event) => {
//             const vist = event.detail.visit;

//             // 保存のリクエストは現在のクエリパラメータでpost送信する
//             // 保存を行う際に確認メッセージを出さないようにする
//             if (vist.url.pathname === currentUrl && vist.method === "post") {
//                 return true;
//             }

//             if (isDirty) {
//                 return confirm(
//                     "変更が保存されていませんがページを離れてもよろしいですか？"
//                 );
//             }
//             return true;
//         });
//         return () => beforeUnloadConfirm();
//     }, [isDirty]);

//     const onNodesChange: OnNodesChange = useCallback(
//         (changes) => {
//             setNodes((nds) => applyNodeChanges(changes, nds));
//             setIsDirty(true);
//         },
//         [setNodes, setIsDirty]
//     );

//     const onEdgesChange: OnEdgesChange = useCallback(
//         (changes) => {
//             setEdges((oldEdges) => applyEdgeChanges(changes, oldEdges));
//             setIsDirty(true);
//         },
//         [setEdges, setIsDirty]
//     );

//     const onAddQuestion = (position: { x: number; y: number }) => {
//         const newQuestionNo = getNewId();
//         const newChoiceNo = getNewId();

//         // 既存の質問ノードが0個の場合、追加した質問ノードをアンケートの最初の質問にする
//         if (getNodes().filter((x) => x.type === "qNode").length === 0) {
//             setFirstNodeId(newQuestionNo);
//         }

//         addNodes({
//             id: newQuestionNo,
//             data: {
//                 topic: "",
//                 choices: [{ id: newChoiceNo, content: "" }],
//             },
//             position,
//             type: "qNode",
//             dragHandle: ".dhandle",
//         });

//         addQnodeNum(1);
//     };

//     // 結果ノード追加
//     const onAddResult = (position: { x: number; y: number }) => {
//         const newId = getNewId();
//         addNodes({
//             id: newId,
//             data: { result: "" },
//             position,
//             type: "rNode",
//             dragHandle: ".dhandle",
//         });
//         addRnodeNum(1);
//     };

//     const handleDragEnd = useCallback(
//         ({ active, over, delta, activatorEvent }: DragEndEvent) => {
//             // フロー作成エリア以外にドロップしたら何もしない
//             if (over == null || over.id != "droppableArea") {
//                 return;
//             }
//             // activatorEventがMouseEventの場合に処理を進める
//             // イベントが他の入力デバイス（例えばタッチデバイス）でも安全に動作すする
//             if (activatorEvent instanceof MouseEvent) {
//                 const absoluteX = activatorEvent.pageX + delta.x;
//                 const absoluteY = activatorEvent.pageY + delta.y;

//                 // ブラウザ上の絶対座標をreactFlow上の座標に変換する
//                 const position = screenToFlowPosition({
//                     x: absoluteX,
//                     y: absoluteY,
//                 });

//                 if (active.id === "draggable-question") onAddQuestion(position);
//                 if (active.id === "draggable-result") onAddResult(position);
//             }
//         },
//         []
//     );

//     const handleEdgeClick = useCallback(
//         (_: React.MouseEvent, edge: Edge) => {
//             setEdges((eds) =>
//                 eds.map((ed) => {
//                     if (ed.id === edge.id) {
//                         return {
//                             ...ed,
//                             animated: !ed.animated,
//                             style: ed.animated
//                                 ? { stroke: "gray", strokeWidth: 2 }
//                                 : { stroke: "gold", strokeWidth: 3 },
//                         };
//                     } else {
//                         return {
//                             ...ed,
//                             animated: false,
//                             style: {},
//                         };
//                     }
//                 })
//             );
//         },
//         [setEdges]
//     );

//     const handleEdgeContextMenu = useCallback(
//         (event: React.MouseEvent, edge: Edge) => {
//             event.preventDefault();
//             setEdges((eds) => eds.filter((ed) => ed.id !== edge.id));
//         },
//         [setEdges]
//     );

//     return (
//         <div className="grow w-full flex">
//             <DndContext onDragEnd={handleDragEnd}>
//                 <div className="h-full w-[5%] flex items-center flex-col gap-y-10 pt-12 bg-slate-800">
//                     <Draggable
//                         id="draggable-question"
//                         label="質問"
//                         color="indigo"
//                         nodeNum={qNodeNum}
//                         maxNodeNum={15}
//                     />
//                     <Draggable
//                         id="draggable-result"
//                         label="結果"
//                         color="orange"
//                         nodeNum={rNodeNum}
//                         maxNodeNum={10}
//                     />
//                 </div>

//                 <Droppable id="droppableArea">
//                     <ReactFlow
//                         nodes={nodes}
//                         edges={edges}
//                         nodeTypes={nodeTypes}
//                         onNodesChange={onNodesChange}
//                         onEdgesChange={onEdgesChange}
//                         snapToGrid
//                         connectionLineType={ConnectionLineType.SmoothStep}
//                         onReconnect={onReconnect}
//                         onReconnectStart={onReconnectStart}
//                         onReconnectEnd={(_, edge) => onReconnectEnd(edge)}
//                         onConnect={onConnect}
//                         onEdgeClick={handleEdgeClick}
//                         onEdgeContextMenu={handleEdgeContextMenu}
//                         elevateEdgesOnSelect={true}
//                         defaultViewport={defaultViewport}
//                         panOnScroll
//                         elementsSelectable
//                         selectionMode={SelectionMode.Partial}
//                     >
//                         <Background
//                             color="#222"
//                             variant={BackgroundVariant.Lines}
//                             gap={20}
//                         />
//                         <Panel position="top-right">
//                             <div className="w-60 h-16 bg-red-300"></div>
//                         </Panel>
//                         <Controls />
//                     </ReactFlow>
//                 </Droppable>
//             </DndContext>
//         </div>
//     );
// };

// export default memo(Flow);
