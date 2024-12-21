import {
    memo,
    useCallback,
    useState,
    Dispatch,
    SetStateAction,
    useMemo,
} from "react";
import { deleteFlow } from "@/Pages/Owner/utils";
import {
    Menu,
    Item,
    TriggerEvent,
    ItemParams,
    useContextMenu,
} from "react-contexify";
import { toast } from "@/Pages/Owner/components/toast/CustomToaster";
import { FlowType } from "@/Pages/Owner/types";
import EditModal from "./EditModal";
import { usePage } from "@inertiajs/react";

type Props = {
    setFlows: Dispatch<SetStateAction<FlowType[]>>;
};

const MENU_ID = "board-menu";

const { show } = useContextMenu({ id: MENU_ID });
export const displayMenu = (
    event: TriggerEvent,
    flowId: number,
    title: string,
    url: string
) => {
    show({ event, props: { flowId, title, url } });
};

const BoardMenu = ({ setFlows }: Props) => {
    const [editTitle, setEditTitle] = useState("");
    const [editUrl, setEditUrl] = useState("");
    const [editId, setEditId] = useState(0);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);

    const { props } = usePage();
    const owner = props.auth.user.english_name;
    const BASE_URL = useMemo(() => import.meta.env.VITE_BASE_URL, []);

    const handleFlowDelete = useCallback(
        ({ props: { flowId, title } }: ItemParams) => {
            if (!confirm(`${title}を削除してよろしいですか？`)) return;

            (async () => {
                const res = await deleteFlow(flowId);
                if (res) {
                    toast.success(`${title}を削除しました`);
                    setFlows((prev) => prev.filter((x) => x.id !== flowId));
                } else {
                    toast.error(`${title}の削除に失敗しました`);
                }
            })();
        },
        []
    );

    const handleOpenEditModal = useCallback(
        ({ props: { title, url, flowId } }: ItemParams) => {
            setEditTitle(title);
            setEditUrl(url);
            setEditId(flowId);
            setIsOpenEditModal(true);
        },
        [setEditTitle, setEditUrl, setEditId]
    );

    const handleCopy = useCallback(async ({ props: { url } }: ItemParams) => {
        try {
            const flowFullUrl = `${BASE_URL}/${owner}/${url}`;
            await navigator.clipboard.writeText(flowFullUrl);
            toast.success("URLをクリップボードにコピーしました", {
                duration: 3000,
            });
        } catch (error) {
            toast.error("URLのコピーに失敗しました", { duration: 3000 });
        }
    }, []);

    return (
        <>
            <Menu id={MENU_ID}>
                <Item
                    closeOnClick={true}
                    onClick={(params) => handleOpenEditModal(params)}
                >
                    タイトル/URLの変更
                </Item>
                <Item
                    closeOnClick={true}
                    onClick={(params) => handleCopy(params)}
                >
                    URLのコピー
                </Item>
                <Item
                    closeOnClick={true}
                    onClick={(params) => handleFlowDelete(params)}
                >
                    削除
                </Item>
            </Menu>

            <EditModal
                isOpenModal={isOpenEditModal}
                setIsOpenModal={setIsOpenEditModal}
                editTitle={editTitle}
                editUrl={editUrl}
                flowId={editId}
            />
        </>
    );
};

export default memo(BoardMenu);
