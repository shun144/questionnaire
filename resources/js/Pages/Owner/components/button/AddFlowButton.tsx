import React, { useState, useCallback } from 'react'
import { FlowCategoryType } from '../../types';
import { addFlow } from '../../utils';
import { router } from '@inertiajs/react';

const AddFlowButton = () => {

  const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false);
  const handleOpenClick = useCallback(() => {
    setIsOpenSelect(true);
  }, []);

  const handleCloseClick = useCallback(() => {
    setIsOpenSelect(false);
  }, []);

  const handleAddClick = useCallback((_category: FlowCategoryType) => {
    (async () => {
      const addedFlowId = await addFlow(_category);
      if (addedFlowId === -999) {
      } else {
        router.get(`flow/${_category}/${addedFlowId}`);
      }
    })();
  }, []);

  return (
    <div
      className="w-56 h-28 rounded-lg shadow border relative inline-block">
      {isOpenSelect ? (
        <>
          <button
            className="w-1/2 h-full bg-blue-500 cursor-pointer"
            onClick={() => handleAddClick('standard')}
          >カスタムフロー
          </button>
          <button
            className="w-1/2 h-full bg-green-500 cursor-pointer"
            onClick={() => handleAddClick('cityheaven')}
          >チェックフロー
          </button>
        </>
      ) : (
        <button
          className="absolute top-0 left-0 w-full h-full bg-red-500 cursor-pointer"
          onClick={handleOpenClick}
        >追加
        </button>
      )}
    </div>
  )
}

export default AddFlowButton