import { memo, useMemo } from "react";
import AuthenticatedSideLayout from "@/Layouts/AuthenticatedSideLayout";
import { Head, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { FlowType } from "@/Pages/Owner/types";
import { CustomToaster } from "@/Pages/Owner/components/toast/CustomToaster";
import BoardItem from "./BoardItem";
import BoardMenu from "./BoardMenu";
import CreateModal from "./CreateModal";

import "react-contexify/dist/ReactContexify.css";

type Props = {
    initialFlows: FlowType[];
};

const MainBoard = ({ initialFlows }: Props) => {
    const [flows, setFlows] = useState<FlowType[]>(initialFlows);
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const { props } = usePage();
    const owner = props.auth.user.english_name;
    // const BASE_URL = useMemo(() => import.meta.env.VITE_BASE_URL, []);

    useEffect(() => {
        setFlows(initialFlows);
    }, [initialFlows]);

    return (
        <AuthenticatedSideLayout>
            <Head title="Board" />

            <div className="w-full h-full flex justify-center items-start ">
                <div className="w-full h-full flex justify-center items-center">
                    <div className="grow h-full flex justify-center items-center ">
                        <div className="w-11/12 h-full ">
                            {flows.length ? (
                                <div className="grid grid-cols-5 gap-8 pt-20">
                                    {flows.map(({ id, title, url }) => (
                                        <BoardItem
                                            key={id}
                                            id={id}
                                            title={title}
                                            fullUrl={`${owner}/${url}`}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="w-full h-full flex justify-center items-start">
                                    <div className="text-3xl font-bold select-none text-slate-400/80">
                                        作成ボタンからアンケートを作成してください
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-2/12 h-full ">
                        <div className="flex justify-start items-center pt-10">
                            <button
                                className="bg-indigo-500 py-2 px-3 text-white rounded shadow-lg transition-all hover:bg-indigo-600 duration-300"
                                onClick={() => setIsOpenCreateModal(true)}
                            >
                                新 規 作 成
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <CustomToaster />

            <CreateModal
                isOpenModal={isOpenCreateModal}
                setIsOpenModal={setIsOpenCreateModal}
            />

            <BoardMenu setFlows={setFlows} />
        </AuthenticatedSideLayout>
    );
};

export default memo(MainBoard);
