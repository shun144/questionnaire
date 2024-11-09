import { ReactFlowProvider, } from '@xyflow/react'
import { memo, useEffect, useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import StandardFlow from './StandardFlow'
import { useOwnerStore } from '../../store';
import { CustomToaster, toast } from '@/Pages/Owner/components/toast/CustomToaster'

import QuestionSubMenu from '../../components/subMenu/QuestionSubMenu';
import ResultSubMenu from '../../components/subMenu/ResultSubMenu';
import FlowHeader from '@/Pages/Owner/components/FlowHeader';

type Props = {
  id: number,
  questions: string,
  results: string,
  edges: string,
  title: string,
  url: string,
  initFirstQuestionId: string
  x: number,
  y: number,
  zoom: number,
}

const FlowLayout = ({ id, questions, results, edges, title, url, initFirstQuestionId, x, y, zoom }: Props) => {

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
            initialNodes={[...JSON.parse(questions), ...JSON.parse(results)]}
            initialEdges={JSON.parse(edges)}
            defaultViewport={{ x, y, zoom }}
          />
        </div>

        <CustomToaster />
        <QuestionSubMenu />
        <ResultSubMenu />
      </ReactFlowProvider>
    </AuthenticatedLayout >
  )
}

export default memo(FlowLayout);



