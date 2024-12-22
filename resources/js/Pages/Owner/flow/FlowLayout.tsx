import { ReactFlowProvider } from "@xyflow/react";
import { memo, useEffect } from "react";
import AuthenticatedSideLayout from "@/Layouts/AuthenticatedSideLayout";
import { Head } from "@inertiajs/react";
import Flow from "./Flow";
import { useOwnerStore } from "@/Pages/Owner/store";
import { CustomToaster } from "@/Pages/Owner/components/toast/CustomToaster";
import QuestionSubMenu from "@/Pages/Owner/components/subMenu/QuestionSubMenu";
import ResultSubMenu from "@/Pages/Owner/components/subMenu/ResultSubMenu";

type Props = {
    id: number;
    questions: string;
    results: string;
    edges: string;
    title: string;
    url: string;
    initFirstQuestionId: string;
    x: number;
    y: number;
    zoom: number;
};

const FlowLayout = (props: Props) => {
    const setFirstNodeId = useOwnerStore((state) => state.setFirstNodeId);
    const setFlowTitle = useOwnerStore((state) => state.setFlowTitle);
    const setFlowUrl = useOwnerStore((state) => state.setFlowUrl);
    const setFlowId = useOwnerStore((state) => state.setFlowId);

    useEffect(() => {
        setFlowId(props.id);
        setFirstNodeId(props.initFirstQuestionId);
        setFlowTitle(props.title);
        setFlowUrl(props.url);
    }, []);

    return (
        <AuthenticatedSideLayout>
            <Head title="Board" />

            <ReactFlowProvider>
                <div className="h-full w-full flex flex-col">
                    <Flow
                        initialNodes={[
                            ...JSON.parse(props.questions),
                            ...JSON.parse(props.results),
                        ]}
                        initialEdges={JSON.parse(props.edges)}
                        defaultViewport={{
                            x: props.x,
                            y: props.y,
                            zoom: props.zoom,
                        }}
                    />
                </div>

                <CustomToaster />
                <QuestionSubMenu />
                <ResultSubMenu />
            </ReactFlowProvider>
        </AuthenticatedSideLayout>
    );
};

export default memo(FlowLayout);
