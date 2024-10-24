// import React, { useState, useCallback, memo, useEffect } from 'react'
// import { router } from '@inertiajs/react';
// import toast from 'react-hot-toast';
// import { commitCityHeavenFlow } from '../../utils';
// import { useOwnerStore } from '../../store';
// import { useReactFlow } from '@xyflow/react';
// import axios from 'axios';

// type Props = {
//   flowId: number
// }

// // コミット
// const CommitFlowButton = ({ flowId }: Props) => {
//   const { toObject } = useReactFlow();
//   const firstNodeId = useOwnerStore((state) => state.firstNodeId);
//   const flowTitle = useOwnerStore((state) => state.flowTitle);
//   const flowUrl = useOwnerStore((state) => state.flowUrl);
//   const setIsDirty = useOwnerStore((state) => state.setIsDirty);
//   const isDirty = useOwnerStore((state) => state.isDirty);

//   useEffect(() => {
//     console.log(isDirty)
//   }, [setIsDirty]);



//   function handleCommit() {
//     const isValid = validateValue();
//     if (!isValid) {
//       return;
//     }

//     const flow = toObject();
//     (async () => {
//       try {
//         const res = await commitCityHeavenFlow(
//           flowId, flow.nodes, flow.edges, firstNodeId, flowTitle, flowUrl
//         );
//         if (res) {
//           toast.success('保存しました', { duration: 4000 });


//         } else {
//           toast.error('保存できませんでした', { duration: 5000 })
//         }

//       } catch (error) {
//         toast.error('保存できませんでした', { duration: 5000 })
//       }
//     })();

//     setIsDirty(false);
//     // res.then((aaa) => {
//     //   setIsDirty(aaa);
//     // }).catch((error) => {
//     //   setIsDirty(false);
//     // })
//   }

//   function validateValue(): boolean {

//     if (!flowTitle) {
//       toast.error('タイトルを入力してください', { duration: 5000 })
//       return false;
//     }

//     if (flowTitle.length > 50) {
//       toast.error('タイトルは50文字以内で入力してください', { duration: 5000 })
//       return false;
//     }

//     if (!flowUrl) {
//       toast.error('URLを入力してください', { duration: 5000 })
//       return false;
//     }

//     if (!flowUrl.match(/^[A-Za-z0-9]*$/)) {
//       toast.error('URLは半角英数字で入力してください', { duration: 5000 })
//       return false;
//     }

//     if (flowUrl.length > 15) {
//       toast.error('URLは15文字以内で入力してください', { duration: 5000 })
//       return false;
//     }
//     return true;
//   }

//   // async function test() {
//   //   try {
//   //     const res = await axios.post('/flow/2/check', {
//   //       url: flowUrl
//   //     });
//   //     console.log(res.data);
//   //   } catch (error) {
//   //     console.log(error)
//   //   }
//   // }

//   return (
//     <div className='w-full flex justify-center items-center'>
//       <button
//         className="w-full  bg-indigo-500 py-5 px-2 text-white rounded shadow transition-all hover:bg-indigo-600 select-none hover:shadow-xl duration-200"
//         onClick={handleCommit}
//       >保 存
//       </button>
//     </div>
//   )
// }
// export default memo(CommitFlowButton);