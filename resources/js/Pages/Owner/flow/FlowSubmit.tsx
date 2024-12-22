import { memo, MouseEventHandler } from "react";
import { useOwnerStore } from "@/Pages/Owner/store";
import { useReactFlow } from "@xyflow/react";
import { toast } from "@/Pages/Owner/components/toast/CustomToaster";
import { router } from "@inertiajs/react";

const FlowSubmit = () => {
    const { getNodes, getEdges, getViewport } = useReactFlow();
    const firstNodeId = useOwnerStore((state) => state.firstNodeId);
    const setIsDirty = useOwnerStore((state) => state.setIsDirty);
    const isDirty = useOwnerStore((state) => state.isDirty);
    const flowId = useOwnerStore((state) => state.flowId);
    const flowTitle = useOwnerStore((state) => state.flowTitle);
    const flowUrl = useOwnerStore((state) => state.flowUrl);

    const flowImages = useOwnerStore((state) => state.flowImages);

    const setSubmitError = useOwnerStore((state) => state.setSubmitError);

    const handleSubmit: MouseEventHandler = (event) => {
        event.preventDefault();

        if (!firstNodeId) {
            toast.error("1問目の質問を作成してください", { duration: 5000 });
            return;
        }

        const nodes = getNodes();
        const edges = getEdges();
        const questions = nodes.filter((x) => x.type === "qNode");

        const results = nodes.filter((x) => x.type === "rNode");
        const { x, y, zoom } = getViewport();

        const formData = new FormData();

        // JSON.stringifyしたデータをFormDataに追加
        formData.append("update_questions", JSON.stringify(questions));
        formData.append("update_results", JSON.stringify(results));
        formData.append("update_edges", JSON.stringify(edges));

        console.log(questions);

        // その他のフィールドをそのまま追加
        formData.append("first_question_id", firstNodeId.toString());
        formData.append("title", flowTitle);
        formData.append("url", flowUrl);
        formData.append("x", x.toString());
        formData.append("y", y.toString());
        formData.append("zoom", zoom.toString());

        // 画像ファイルを追加
        flowImages.forEach(({ nodeId, file }, index) => {
            formData.append(`images[${index}]`, file);
            formData.append(`imageNodeIds[${index}]`, nodeId);
        });

        router.post(`/flow/${flowId}`, formData, {
            onSuccess: () => {
                setSubmitError({});
                toast.success("保存しました", { duration: 4000 });
                setIsDirty(false);
            },
            onError: (err) => {
                setSubmitError(err);
                for (const value of Object.values(err)) {
                    toast.error(value, { duration: 5000 });
                }
            },
        });

        // router.post(
        //     `/flow/${flowId}`,
        //     {
        //         update_questions: JSON.stringify(questions),
        //         update_results: JSON.stringify(results),
        //         update_edges: JSON.stringify(edges),
        //         first_question_id: firstNodeId,
        //         title: flowTitle,
        //         url: flowUrl,
        //         x,
        //         y,
        //         zoom,
        //     },
        //     {
        //         onSuccess: () => {
        //             setSubmitError({});
        //             toast.success("保存しました", { duration: 4000 });
        //             setIsDirty(false);
        //         },
        //         onError: (err) => {
        //             setSubmitError(err);
        //             for (const value of Object.values(err)) {
        //                 toast.error(value, { duration: 5000 });
        //             }
        //         },
        //     }
        // );
    };

    return (
        <>
            <button
                onClick={handleSubmit}
                className="relative w-full h-full bg-indigo-500 px-2 text-white rounded-md shadow-xl transition-all hover:bg-indigo-600 select-none hover:shadow-xl duration-200"
            >
                保 存
                {isDirty && (
                    <span className="absolute flex h-3 w-3 -top-1 -right-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500 opacity-85"></span>
                    </span>
                )}
            </button>
        </>
    );
};

export default memo(FlowSubmit);
