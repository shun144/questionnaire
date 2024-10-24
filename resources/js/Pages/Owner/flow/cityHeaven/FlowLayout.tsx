import { ReactFlowProvider, } from '@xyflow/react'
import { memo, useEffect, useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CityHeavenFlow from './CityHeavenFlow'
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
          <CityHeavenFlow
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





// import { ReactFlowProvider, } from '@xyflow/react'
// import { memo, useEffect, useState } from 'react'
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Head } from '@inertiajs/react';
// import CityHeavenFlow from './CityHeavenFlow'
// import { useOwnerStore } from '../../store';
// import { Toaster } from 'react-hot-toast';
// import QuestionSubMenu from '../../components/subMenu/QuestionSubMenu';
// import ResultSubMenu from '../../components/subMenu/ResultSubMenu';
// // import { usePage } from '@inertiajs/react';

// type Props = { id: number, quesitions: string, results: string, edges: string, title: string, url: string, initFirstQuestionId: string }

// const FlowLayout = ({ id, quesitions, results, edges, title, url, initFirstQuestionId }: Props) => {

//   const flowTitle = useOwnerStore((state) => state.flowTitle);
//   const flowUrl = useOwnerStore((state) => state.flowUrl);

//   const setFlowTitle = useOwnerStore((state) => state.setFlowTitle);
//   const setFlowUrl = useOwnerStore((state) => state.setFlowUrl);
//   const setFirstNodeId = useOwnerStore((state) => state.setFirstNodeId);

//   useEffect(() => {
//     setFlowTitle(title);
//     setFlowUrl(url);
//     setFirstNodeId(initFirstQuestionId);
//   }, []);


//   return (
//     <AuthenticatedLayout
//       header={
//         <div className='h-full w-full flex justify-around'>

//           <div className='flex flex-row items-center w-96 bg-slate-200'>
//             <label htmlFor="flow-title" className="block text-sm font-medium text-gray-900 px-3">Title</label>
//             <input
//               type="text" id="flow-title" placeholder="タイトルを入力してください"
//               className="bg-slate-100 border border-transparent text-gray-900 text-sm focus:ring-transparent focus:border-transparent block w-full p-2.5 h-full placeholder-slate-400"
//               onChange={(event) => setFlowTitle(event.currentTarget.value)} value={flowTitle}
//             />
//           </div>

//           <div className='flex flex-row  items-center w-96 bg-slate-200'>
//             <label htmlFor="flow-url" className="block text-sm font-medium text-gray-900 px-3">URL</label>
//             <input
//               type="text" id="flow-url" placeholder="URLを入力してください"
//               className="bg-slate-100 border border-transparent text-gray-900 text-sm focus:ring-transparent focus:border-transparent block w-full p-2.5 h-full placeholder-slate-400"
//               onChange={(event) => setFlowUrl(event.currentTarget.value)} value={flowUrl}
//             />
//           </div>

//         </div>
//       }

//     >
//       <Head title="Board" />

//       <ReactFlowProvider>

//         <CityHeavenFlow
//           flowId={id}
//           initialNodes={[...JSON.parse(quesitions), ...JSON.parse(results)]}
//           initialEdges={JSON.parse(edges)}
//         />

//         <Toaster position="bottom-right" reverseOrder={false} />
//         <QuestionSubMenu />
//         <ResultSubMenu />

//       </ReactFlowProvider>


//     </AuthenticatedLayout >
//   )
// }

// export default memo(FlowLayout);


