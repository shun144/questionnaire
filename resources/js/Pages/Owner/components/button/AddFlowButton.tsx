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
    <div className='flex justify-center items-center gap-5'>

      <button
        className="bg-emerald-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 select-none"
        onClick={() => handleAddClick('standard')}
      >標準アンケート作成
      </button>

      <button
        className="bg-indigo-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-indigo-600 select-none"
        onClick={() => handleAddClick('cityheaven')}
      >シティヘブンアンケート作成
      </button>
    </div>
  )
}

export default AddFlowButton;


// import React, { useState, useCallback } from 'react'
// import { FlowCategoryType } from '../../types';
// import { addFlow } from '../../utils';
// import { router } from '@inertiajs/react';

// const AddFlowButton = () => {

//   const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false);
//   const handleOpenClick = useCallback(() => {
//     setIsOpenSelect(true);
//   }, []);

//   const handleCloseClick = useCallback(() => {
//     setIsOpenSelect(false);
//   }, []);

//   const handleAddClick = useCallback((_category: FlowCategoryType) => {
//     (async () => {
//       const addedFlowId = await addFlow(_category);
//       if (addedFlowId === -999) {
//       } else {
//         router.get(`flow/${_category}/${addedFlowId}`);
//       }
//     })();
//   }, []);

//   return (
//     <div
//       // className="w-56 h-28 rounded-lg shadow border relative inline-block"
//       className=" w-48 h-14 relative inline-block"
//     >
//       {isOpenSelect ? (
//         <>
//           <button
//             className="w-1/2 h-full bg-blue-500 cursor-pointer"
//             onClick={() => handleAddClick('standard')}
//           >カスタムフロー
//           </button>
//           <button
//             className="w-1/2 h-full bg-green-500 cursor-pointer"
//             onClick={() => handleAddClick('cityheaven')}
//           >チェックフロー
//           </button>
//         </>
//       ) : (
//         <button
//           // className="absolute top-0 left-0 w-full h-full bg-red-500 cursor-pointer"
//           className="absolute top-0 left-0 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
//           onClick={handleOpenClick}
//         >追加
//         </button>
//       )}
//     </div>
//   )
// }

// export default AddFlowButton;