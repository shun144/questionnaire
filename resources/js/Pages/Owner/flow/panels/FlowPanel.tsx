import { Panel } from "@xyflow/react";
import { memo } from "react";
import FlowSubmit from "@/Pages/Owner/flow/FlowSubmit";
import { questionNodeMaxNum, resultNodeMaxNum } from "@/Pages/Owner/constants";
import FlowInput from "@/Pages/Owner/flow/flowInput/FlowInput";
import Droppable from "@/Pages/Owner/components/dnd/Droppable";
import Draggable from "@/Pages/Owner/components/dnd/Draggable";
import { useOwnerStore } from "@/Pages/Owner/store";

const FlowPanel = () => {
    const qNodeNum = useOwnerStore((state) => state.qNodeNum);
    const rNodeNum = useOwnerStore((state) => state.rNodeNum);
    return (
        <>
            <Panel position="top-left">
                <Droppable id="panel-area-0">
                    <FlowSubmit />
                </Droppable>
            </Panel>

            <Panel position="top-right">
                <Droppable id="panel-area-1">
                    <div className="w-96 py-3 bg-slate-800 rounded-md shadow flex flex-col justify-around items-center">
                        <FlowInput />
                    </div>
                </Droppable>
            </Panel>

            <Panel position="top-left" className="panel-top-10">
                <Droppable id="panel-area-2">
                    <div className="w-24 h-60 py-3 bg-slate-800 rounded-md shadow flex flex-col justify-around items-center">
                        <Draggable
                            id="draggable-question"
                            label="質問"
                            color="indigo"
                            nodeNum={qNodeNum}
                            maxNodeNum={questionNodeMaxNum}
                        />

                        <Draggable
                            id="draggable-result"
                            label="結果"
                            color="orange"
                            nodeNum={rNodeNum}
                            maxNodeNum={resultNodeMaxNum}
                        />
                    </div>
                </Droppable>
            </Panel>
        </>
    );
};

export default memo(FlowPanel);
