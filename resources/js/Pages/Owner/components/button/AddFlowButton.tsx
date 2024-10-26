import React, { useState, useCallback, memo, useEffect } from 'react'
import { FlowCategoryType } from '../../types';
import { router } from '@inertiajs/react';

const AddFlowButton = () => {

  const handleAddFlow = useCallback((category: FlowCategoryType) => {
    router.post('flow', { category });
  }, []);
  return (
    <div className='flex justify-center items-center gap-5'>

      <button
        className="bg-emerald-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-emerald-400 select-none"
        onClick={() => handleAddFlow('standard')}
      >標準アンケート作成
      </button>

      <button
        className="bg-indigo-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-indigo-600 select-none"
        onClick={() => handleAddFlow('cityHeaven')}
      >シティヘブンアンケート作成
      </button>
    </div>
  )
}
export default memo(AddFlowButton);