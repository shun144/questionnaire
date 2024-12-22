import { applyEdgeChanges, Edge, OnEdgesChange } from "@xyflow/react";
import { useCallback, useState, MouseEvent } from "react";
import { useOwnerStore } from "@/Pages/Owner/store";

const useEdgeHook = (initialEdges: Edge[]) => {
    const [edges, setEdges] = useState<Edge[]>(initialEdges);
    const setIsDirty = useOwnerStore((state) => state.setIsDirty);

    const handleEdgeClick = useCallback(
        (_: MouseEvent, edge: Edge) => {
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
        (event: MouseEvent, edge: Edge) => {
            event.preventDefault();
            setEdges((eds) => eds.filter((ed) => ed.id !== edge.id));
        },
        [setEdges]
    );

    const onEdgesChange: OnEdgesChange = useCallback(
        (changes) => {
            setEdges((oldEdges) => applyEdgeChanges(changes, oldEdges));
            setIsDirty(true);
        },
        [setEdges, setIsDirty]
    );

    return {
        edges,
        setEdges,
        handleEdgeClick,
        handleEdgeContextMenu,
        onEdgesChange,
    };
};

export default useEdgeHook;
