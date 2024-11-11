import { memo } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link, useForm } from '@inertiajs/react';
import { useCallback, useEffect, useState, useRef } from 'react';
import { FlowType } from '../types';
import { deleteFlow } from '@/Pages/Owner/utils';
import CreateModal from './CreateModal';
import EditModal from './EditModal';
import { CustomToaster, toast } from '@/Pages/Owner/components/toast/CustomToaster'
import { Menu, Item, TriggerEvent, Separator, Submenu, ItemParams, useContextMenu, } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";


type Props = {
  initialFlows: FlowType[];
  isRegisteredApiCredential: boolean;
}

const MENU_ID = "menu-id";

const MainBoard = ({ initialFlows, isRegisteredApiCredential }: Props) => {
  const [flows, setFlows] = useState<FlowType[]>(initialFlows);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const [editTitle, setEditTitle] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [editId, setEditId] = useState(0);

  const { props } = usePage();


  useEffect(() => {
    setFlows(initialFlows);
  }, [initialFlows])

  const { show } = useContextMenu({ id: MENU_ID });


  const handleFlowDelete = useCallback((params: ItemParams) => {
    const flowId = params.props.flowId;
    const title = params.props.title;

    if (!confirm(`${title}を削除してよろしいですか？`)) {
      return
    };

    (async () => {
      const res = await deleteFlow(flowId);
      if (res) {
        toast.success(`${title}を削除しました`);
        setFlows(prev => prev.filter(x => x.id !== flowId));
      } else {
        toast.error(`${title}の削除に失敗しました`);
      }
    })();
  }, []);



  const handleOpenEditModal = useCallback(({ props }: ItemParams) => {

    setEditTitle(props.title)
    setEditUrl(props.url)
    setEditId(props.flowId)
    setIsOpenEditModal(true);

  }, [setEditTitle, setEditUrl])

  const handleCopy = async (params: ItemParams) => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/${props.auth.user.english_name}/${params.props.url}`
      );
      toast.success('URLをクリップボードにコピーしました', { duration: 3000 });
    } catch (error) {
      toast.error('URLのコピーに失敗しました', { duration: 3000 });
    }
  };

  const displayMenu = (event: TriggerEvent, flowId: number, title: string, url: string) => {
    show({ event, props: { flowId, title, url } });
  }

  return (
    <AuthenticatedLayout
      header={
        <div className='flex justify-between items-center py-3'>
          <h2 className="font-bold text-xl text-slate-600 leading-tight">診 断 一 覧</h2>
          <button className="bg-indigo-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-indigo-600"
            onClick={() => setIsOpenCreateModal(true)}>
            診 断 作 成
          </button>
        </div >
      }
    >
      <Head title="Board" />

      <div className="flex justify-center items-start h-full pt-20">

        {flows.length > 0 ?

          <div className='grid grid-cols-5 gap-8'>
            <>
              {
                flows.map(({ id, category, title, url }) => (
                  <Link
                    key={id}
                    onContextMenu={(event) => displayMenu(event, id, title, url)}
                    href={`flow/${id}`}
                    as="button"
                    type="button"
                    className="w-56 h-48 rounded-lg shadow border inline-block bg-white overflow-hidden select-none
                    hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all duration-300 py-2">

                    <div className="w-full h-full flex flex-col justify-center items-center">
                      <div className='w-full h-1/6 pl-2 flex justify-start items-center'>
                        <div className={`${category === 'standard' ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-pink-500"} inline-flex rounded-md h-full justify-center items-center text-xs  px-1`}>
                          {category === 'standard' ? "標準" : "シティヘブン"}
                        </div>
                      </div>

                      <div className='w-full h-4/6 pt-2'>
                        <div className='px-2 h-full flex flex-col justify-start'>
                          <p className='text-slate-700 text-lg break-all leading-tight text-start'>{title}</p>
                        </div>
                      </div>

                      <div className='w-full h-1/6'>
                        <p className='px-2  text-slate-400 text-[11px] break-all leading-tight text-start'>{window.location.origin}/{props.auth.user.english_name}/{url}</p>
                      </div>
                    </div>
                  </Link>
                ))
              }
            </>
          </div>
          :
          <div className='w-full h-full flex justify-center items-start'>
            <div className='text-3xl font-bold select-none text-slate-400/80'>
              診断作成ボタンから診断を作成してください
            </div>
          </div>
        }

      </div>

      <CreateModal
        isOpenModal={isOpenCreateModal}
        setIsOpenModal={setIsOpenCreateModal}
        isRegisteredApiCredential={isRegisteredApiCredential}
      />

      <EditModal
        isOpenModal={isOpenEditModal}
        setIsOpenModal={setIsOpenEditModal}
        editTitle={editTitle}
        editUrl={editUrl}
        flowId={editId}
      />


      <CustomToaster />

      <Menu id={MENU_ID}>
        <Item
          closeOnClick={true}
          onClick={(params) => handleOpenEditModal(params)}>
          タイトル/URLの変更
        </Item>
        <Item
          closeOnClick={true}
          onClick={(params) => handleCopy(params)}>
          URLのコピー
        </Item>
        <Item
          closeOnClick={true}
          onClick={(params) => handleFlowDelete(params)}>
          削除
        </Item>
      </Menu>

    </AuthenticatedLayout >
  )
}
export default memo(MainBoard);

