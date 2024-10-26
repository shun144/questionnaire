import { ReactFlowProvider, } from '@xyflow/react'
import { memo, useEffect, useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import StandardFlow from './StandardFlow'
import { useOwnerStore } from '../../store';
import { Toaster } from 'react-hot-toast';
import QuestionSubMenu from '../../components/subMenu/QuestionSubMenu';
import ResultSubMenu from '../../components/subMenu/ResultSubMenu';
import FlowHeader from './FlowHeader';

type Props = {
  id: number,
  quesitions: string,
  results: string,
  edges: string,
  title: string,
  url: string,
  initFirstQuestionId: string
  x: number,
  y: number,
  zoom: number,
}

const FlowLayout = ({ id, quesitions, results, edges, title, url, initFirstQuestionId, x, y, zoom }: Props) => {

  const setFirstNodeId = useOwnerStore((state) => state.setFirstNodeId);

  useEffect(() => {
    setFirstNodeId(initFirstQuestionId);
  }, []);

  return (
    <AuthenticatedLayout>
      <Head title="Board" />

      <ReactFlowProvider>
        <div className='h-full w-full flex flex-col'>
          <FlowHeader
            id={id}
            initialTitle={title}
            initialUrl={url}
          />
          <StandardFlow
            initialNodes={[...JSON.parse(quesitions), ...JSON.parse(results)]}
            initialEdges={JSON.parse(edges)}
            defaultViewport={{ x, y, zoom }}
          />
        </div>

        <Toaster position="bottom-right" reverseOrder={false} />
        <QuestionSubMenu />
        <ResultSubMenu />
      </ReactFlowProvider>
    </AuthenticatedLayout >
  )
}

export default memo(FlowLayout);



