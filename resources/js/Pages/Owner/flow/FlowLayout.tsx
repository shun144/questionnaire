import { ReactFlowProvider } from "@xyflow/react";
import { memo, useEffect } from "react";
import AuthenticatedSideLayout from "@/Layouts/AuthenticatedSideLayout";
import { Head } from "@inertiajs/react";
import Flow from "./Flow";
import { useOwnerStore } from "@/Pages/Owner/store";
import { CustomToaster } from "@/Pages/Owner/components/toast/CustomToaster";
import QuestionSubMenu from "@/Pages/Owner/components/subMenu/QuestionSubMenu";
import ResultSubMenu from "@/Pages/Owner/components/subMenu/ResultSubMenu";
import FlowHeader from "@/Pages/Owner/components/FlowHeader";

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

const FlowLayout = ({
    id,
    questions,
    results,
    edges,
    title,
    url,
    initFirstQuestionId,
    x,
    y,
    zoom,
}: Props) => {
    const setFirstNodeId = useOwnerStore((state) => state.setFirstNodeId);

    useEffect(() => {
        setFirstNodeId(initFirstQuestionId);
    }, []);

    return (
        <AuthenticatedSideLayout>
            <Head title="Board" />

            <ReactFlowProvider>
                <div className="h-full w-full flex flex-col">
                    <FlowHeader id={id} initialTitle={title} initialUrl={url} />
                    <Flow
                        initialNodes={[
                            ...JSON.parse(questions),
                            ...JSON.parse(results),
                        ]}
                        initialEdges={JSON.parse(edges)}
                        defaultViewport={{ x, y, zoom }}
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
