import { memo } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link, useForm } from '@inertiajs/react';
import { useCallback, useEffect, useState, useRef } from 'react';
import { deleteFlow } from '../utils';
import { FlowType } from '../types';
import CreateFlowModal from './CreateFlowModal';

import { Menu, Item, TriggerEvent, Separator, Submenu, ItemParams, useContextMenu, } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

type Props = {
  initialFlows: FlowType[];
  isRegisteredApiCredential: boolean;
}

const MENU_ID = "menu-id";

const MainBoard = ({ initialFlows, isRegisteredApiCredential }: Props) => {
  const [flows, setFlows] = useState<FlowType[]>(initialFlows);
  const [isOpenModal, setIsOpenModal] = useState(false);


  useEffect(() => {
    setFlows(initialFlows);
  }, [initialFlows])

  const { show } = useContextMenu({ id: MENU_ID });

  const handleFlowDelete = useCallback((params: ItemParams) => {
    const flowId = params.props.flowId;
    (async () => {
      try {
        const res = await deleteFlow(flowId);
      } catch (error) {
      }
    })();
    setFlows(prev => prev.filter(x => x.id != flowId));
  }, [setFlows])

  const displayMenu = (event: TriggerEvent, flowId: number) => {
    show({ event, props: { flowId } });
  }

  return (
    <AuthenticatedLayout
      header={
        <div className='flex justify-between items-center py-3'>
          <h2 className="font-bold text-xl text-slate-600 leading-tight">診 断 一 覧</h2>
          <button className="bg-indigo-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-indigo-600"
            onClick={() => setIsOpenModal(true)}>
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

                  <div
                    key={id} className="w-56 h-40 rounded-lg shadow border inline-block bg-white overflow-hidden hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all
                ">
                    <div className={`w-full h-full relative
                  ${category === 'standard'
                        ? "before:content-['標準'] before:bg-emerald-100 before:text-emerald-500"
                        : "before:content-['シティヘブン'] before:bg-rose-100 before:text-pink-500"
                      }
                  before:absolute before:left-1 before:top-1 before:text-xs  before:font-medium  before:me-2  before:px-2.5  before:py-0.5 before:rounded-md`}
                    >
                      <Link
                        className="w-full h-full"
                        href={`flow/${id}`}
                        as="button"
                        type="button"
                        onContextMenu={(event) => displayMenu(event, id)}
                      >
                        {title}
                      </Link>
                    </div>
                  </div>
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

      <CreateFlowModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        isRegisteredApiCredential={isRegisteredApiCredential} />

      <Menu id={MENU_ID}>
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

