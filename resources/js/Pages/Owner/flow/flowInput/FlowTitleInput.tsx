import { ChangeEvent, memo, useCallback } from "react";
import { useOwnerStore } from "@/Pages/Owner/store";

const FlowTitleInput = () => {
    const flowTitle = useOwnerStore((state) => state.flowTitle);
    const setFlowTitle = useOwnerStore((state) => state.setFlowTitle);
    const setIsDirty = useOwnerStore((state) => state.setIsDirty);
    const submitError = useOwnerStore((state) => state.submitError);

    const handleChangeTitle = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setFlowTitle(e.currentTarget.value);
            setIsDirty(true);
        },
        [setFlowTitle, setIsDirty]
    );

    return (
        <div className="w-full flex justify-start items-center pr-4">
            <label
                htmlFor="title"
                className="w-2/12 block select-none text-base font-medium text-gray-300 h-9 leading-9 text-center"
            >
                Title
            </label>
            <input
                type="text"
                id="title"
                value={flowTitle}
                onChange={handleChangeTitle}
                placeholder="タイトルを入力してください"
                className="grow bg-white border border-slate-400 text-gray-900 text-sm focus:ring-transparent focus:border-blue-400 block  p-2.5 h-9 placeholder-slate-400 rounded"
                required
            />

            <div>
                {submitError.title && (
                    <div className="text-sm text-red-500">
                        {submitError.title}
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(FlowTitleInput);
