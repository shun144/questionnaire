import { useCallback, useEffect, useMemo, useState } from "react";
import {
    Node,
    OnNodesChange,
    applyNodeChanges,
    useReactFlow,
} from "@xyflow/react";
import { useOwnerStore } from "@/Pages/Owner/store";
import { getNewId } from "@/Pages/Owner/utils";
import QuestionNode from "./QuestionNode";
import ResultNode from "./ResultNode";

const useNodeHook = (initialNodes: Node[]) => {
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const { addNodes, getNodes } = useReactFlow();
    const setIsDirty = useOwnerStore((state) => state.setIsDirty);
    const setFirstNodeId = useOwnerStore((state) => state.setFirstNodeId);
    const addQnodeNum = useOwnerStore((state) => state.addQnodeNum);
    const addRnodeNum = useOwnerStore((state) => state.addRnodeNum);

    const setQnodeNum = useOwnerStore((state) => state.setQnodeNum);
    const setRnodeNum = useOwnerStore((state) => state.setRnodeNum);

    useEffect(() => {
        setQnodeNum(initialNodes.filter((x) => x.type === "qNode").length);
        setRnodeNum(initialNodes.filter((x) => x.type === "rNode").length);
    }, []);

    const nodeTypes = useMemo(
        () => ({
            qNode: QuestionNode,
            rNode: ResultNode,
        }),
        []
    );

    const onNodesChange: OnNodesChange = useCallback(
        (changes) => {
            setNodes((nds) => applyNodeChanges(changes, nds));
            setIsDirty(true);
        },
        [setNodes, setIsDirty]
    );

    // 質問ノード追加
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

    return {
        nodes,
        nodeTypes,
        onNodesChange,
        onAddQuestion,
        onAddResult,
    };
};

export default useNodeHook;
