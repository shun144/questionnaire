import { ReactFlowProvider } from '@xyflow/react'
import React, { memo } from 'react'
import CustomFlow from './CustomFlow'
import CheckFlow from './CheckFlow'
import { FlowCategoryType } from '../types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

type Props = {
  flowId: number;
  category: FlowCategoryType;
}

const FlowLayout = ({ flowId, category }: Props) => {
  return (

    <AuthenticatedLayout
      header
    >
      <Head title="Board" />
      <ReactFlowProvider>
        {category === 'custom' && <CustomFlow flowId={flowId} />}
        {category === 'check' && <CheckFlow flowId={flowId} />}
      </ReactFlowProvider>
    </AuthenticatedLayout>



  )
}

export default memo(FlowLayout);