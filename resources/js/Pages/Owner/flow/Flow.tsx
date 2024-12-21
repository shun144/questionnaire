import { useCallback, useEffect, memo } from "react";
import { useOwnerStore } from "@/Pages/Owner/store";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Droppable from "@/Pages/Owner/components/dnd/Droppable";
import {
    ReactFlow,
    Node,
    Edge,
    useReactFlow,
    Controls,
    Background,
    BackgroundVariant,
    ConnectionLineType,
    SelectionMode,
    type Viewport,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./flow.scss";
import "react-contexify/dist/ReactContexify.css";
import useNodeHook from "./useNodeHook";
import useEdgeHook from "./useEdgeHook";
import useConnectHook from "./useConnectHook";
import { router, usePage } from "@inertiajs/react";
import FlowPanel from "@/Pages/Owner/flow/panels/FlowPanel";

type Props = {
    initialNodes: Node[];
    initialEdges: Edge[];
    defaultViewport: Viewport;
};

const Flow = ({ initialNodes, initialEdges, defaultViewport }: Props) => {
    const { url: currentUrl } = usePage();
    const isDirty = useOwnerStore((state) => state.isDirty);

    const { screenToFlowPosition } = useReactFlow();

    const { nodes, nodeTypes, onNodesChange, onAddQuestion, onAddResult } =
        useNodeHook(initialNodes);

    const {
        edges,
        setEdges,
        handleEdgeClick,
        handleEdgeContextMenu,
        onEdgesChange,
    } = useEdgeHook(initialEdges);

    const { onReconnect, onReconnectStart, onReconnectEnd, onConnect } =
        useConnectHook(setEdges);

    useEffect(() => {
        const beforeUnloadConfirm = router.on("before", (event) => {
            const vist = event.detail.visit;

            // 保存のリクエストは現在のクエリパラメータでpost送信する
            // 保存を行う際に確認メッセージを出さないようにする
            if (vist.url.pathname === currentUrl && vist.method === "post") {
                return true;
            }

            // 保存されていない変更がある場合に確認メッセージを出す
            if (isDirty) {
                return confirm(
                    "変更が保存されていませんがページを離れてもよろしいですか？"
                );
            }
            return true;
        });
        return () => beforeUnloadConfirm();
    }, [isDirty]);

    const handleDragEnd = useCallback(
        ({ active, over, delta, activatorEvent }: DragEndEvent) => {
            // フロー作成エリア以外にドロップしたら何もしない
            if (over == null || over.id != "droppableArea") return;

            // activatorEventがMouseEventの場合に処理を進める
            // イベントが他の入力デバイス（例えばタッチデバイス）でも安全に動作すする
            if (activatorEvent instanceof MouseEvent) {
                const absoluteX = activatorEvent.pageX + delta.x;
                const absoluteY = activatorEvent.pageY + delta.y;

                // デフォルトだとノードが作成される位置が、
                // ドロップした位置のやや右下になるため微調整
                const offset = {
                    x: 30,
                    y: 20,
                };

                // ブラウザ上の絶対座標をreactFlow上の座標に変換する
                const position = screenToFlowPosition({
                    x: absoluteX - offset.x,
                    y: absoluteY - offset.y,
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

                        <FlowPanel />
                        <Controls />
                    </ReactFlow>
                </Droppable>
            </DndContext>
        </div>
    );
};

export default memo(Flow);
