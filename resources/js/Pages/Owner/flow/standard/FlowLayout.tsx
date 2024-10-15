import { ReactFlowProvider } from '@xyflow/react'
import { memo, useEffect, useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import StandardFlow from './StandardFlow'
import { useOwnerStore } from '../../store';
import { getFlowTitleAndUrl } from '../../utils';

const FlowLayout = ({ id }: { id: number }) => {

  const flowTitle = useOwnerStore((state) => state.flowTitle);
  const setFlowTitle = useOwnerStore((state) => state.setFlowTitle);
  const flowUrl = useOwnerStore((state) => state.flowUrl);
  const setFlowUrl = useOwnerStore((state) => state.setFlowUrl);

  useEffect(() => {
    (async () => {
      const res = await getFlowTitleAndUrl(id);
      setFlowTitle(res.title);
      setFlowUrl(res.url);
    })()
  }, [])

  return (
    <AuthenticatedLayout
      header={
        <div className='h-full flex justify-center gap-9'>

          <div className='flex flex-row  items-center w-96 bg-slate-200'>
            <label htmlFor="flow-title" className="block text-sm font-medium text-gray-900 px-3">Title</label>
            <input
              type="text" id="flow-title" placeholder="タイトルを入力してください"
              className="bg-gray-50 border border-transparent text-gray-900 text-sm focus:ring-transparent focus:border-transparent block w-full p-2.5 h-full"
              onChange={(event) => setFlowTitle(event.currentTarget.value)} value={flowTitle}
            />
          </div>

          <div className='flex flex-row  items-center w-96 bg-slate-200'>
            <label htmlFor="flow-url" className="block text-sm font-medium text-gray-900 px-3">URL</label>
            <input
              type="text" id="flow-url" placeholder="URLを入力してください"
              className="bg-gray-50 border border-transparent text-gray-900 text-sm focus:ring-transparent focus:border-transparent block w-full p-2.5 h-full"
              onChange={(event) => setFlowUrl(event.currentTarget.value)} value={flowUrl}
            />
          </div>


        </div>
      }
    >
      <Head title="Board" />
      <ReactFlowProvider>
        <StandardFlow flowId={id} />
      </ReactFlowProvider>
    </AuthenticatedLayout>
  )
}

export default memo(FlowLayout);