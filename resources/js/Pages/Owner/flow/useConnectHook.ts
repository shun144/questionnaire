import { Dispatch, SetStateAction, useCallback, useRef } from "react";
import { Edge, Connection, addEdge, reconnectEdge } from "@xyflow/react";

const useConnectHook = (setEdges: Dispatch<SetStateAction<Edge[]>>) => {
    const edgeReconnSuccess = useRef(true);
    // edgeの再接続時イベント
    const onReconnect = useCallback((oldEdge: Edge, newConn: Connection) => {
        const isConnectSelf =
            oldEdge.source === newConn.target ||
            newConn.source === oldEdge.target;

        // 自分自身に接続できないようにする
        if (isConnectSelf) return;

        edgeReconnSuccess.current = true;
        setEdges((eds) => reconnectEdge(oldEdge, newConn, eds));
    }, []);

    // edgeの再接続開始時イベント
    const onReconnectStart = useCallback(() => {
        edgeReconnSuccess.current = false;
    }, []);

    const onReconnectEnd = useCallback((edge: Edge) => {
        if (!edgeReconnSuccess.current) {
            setEdges((eds) => eds.filter((ed) => ed.id !== edge.id));
        }
        edgeReconnSuccess.current = true;
    }, []);

    const onConnect = useCallback(
        (params: Connection | Edge) => {
            // 自分自身に接続できないようにする
            if (params.source === params.target) {
                return;
            }

            setEdges((eds) => addEdge({ ...params, type: "smoothstep" }, eds));
        },
        [setEdges]
    );

    return {
        onReconnect,
        onReconnectStart,
        onReconnectEnd,
        onConnect,
    };
};

export default useConnectHook;
