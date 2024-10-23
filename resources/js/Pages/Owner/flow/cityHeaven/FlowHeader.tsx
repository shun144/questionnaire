import React, { memo, useState, ChangeEvent, FormEventHandler, ChangeEventHandler, useEffect, useRef } from 'react'
import { useOwnerStore } from '../../store';
import { useReactFlow } from '@xyflow/react';
import { router } from '@inertiajs/react';
import { toast } from 'react-hot-toast';

type Props = {
  id: number;
  initialTitle: string;
  initialUrl: string;
}

type ValidateError = {
  title?: string;
  url?: string;
}

const CityHeavenFlowHeader = ({ id, initialTitle, initialUrl }: Props) => {
  // console.log('shun')
  const [title, setTitle] = useState(initialTitle);
  const [url, setUrl] = useState(initialUrl);
  const [error, setError] = useState<ValidateError>({});
  const { getNodes, getEdges } = useReactFlow();
  const firstNodeId = useOwnerStore((state) => state.firstNodeId);
  const setIsDirty = useOwnerStore((state) => state.setIsDirty);
  const isDirty = useOwnerStore((state) => state.isDirty);


  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    const nodes = getNodes();
    const edges = getEdges();
    const questions = nodes.filter(x => x.type === 'cityHeavenQuestionNode');
    const results = nodes.filter(x => x.type === 'cityHeavenResultNode');

    router.post(`/flow/${id}`, {
      update_questions: JSON.stringify(questions),
      update_results: JSON.stringify(results),
      update_edges: JSON.stringify(edges),
      first_question_id: firstNodeId,
      title: title,
      url: url,
    }, {
      onSuccess: () => {
        setError({});
        toast.success('保存しました', { duration: 4000 });
        setIsDirty(false);
      },
      onError: (err) => {
        setError(err);
        toast.error('保存に失敗しました', { duration: 5000 });

        for (const value of Object.values(err)) {
          toast.error(value, { duration: 5000 });
        }
      },
    })
  };

  return (
    <div className='h-14 w-full bg-white'>

      <form onSubmit={handleSubmit} className='w-full flex justify-around items-center'>
        <div className='w-20 h-full'>
          <button
            className="w-full h-full  bg-indigo-500 px-2 text-white rounded shadow transition-all hover:bg-indigo-600 select-none hover:shadow-xl duration-200"
          >保 存
          </button>
        </div>

        <div className=' flex flex-col items-center w-96 '>
          <div className='flex w-full flex-row items-center'>
            <label htmlFor="title" className="block text-sm font-medium text-gray-800 px-3 h-10 leading-10 bg-slate-300 text-center">タイトル</label>
            <input
              type="text" id="title" placeholder="タイトルを入力してください"
              className="grow bg-slate-100 border border-transparent text-gray-900 text-sm focus:ring-transparent focus:border-transparent block  p-2.5 h-full placeholder-slate-400 shadow"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div>
            {error.title && (<div className='text-sm text-red-500'>{error.title}</div>)}
          </div>


        </div>


        <div className='flex flex-row  items-center w-96 bg-slate-200'>
          <label htmlFor="url" className="block text-sm font-medium text-gray-900 px-3">URL</label>
          <input
            type="text" id="url" placeholder="URLを入力してください"
            className="bg-slate-100 border border-transparent text-gray-900 text-sm focus:ring-transparent focus:border-transparent block w-full p-2.5 h-full placeholder-slate-400"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
          />
        </div>

        {error.url && (<div className='text-sm text-red-500'>{error.url}</div>)}
      </form>
    </div>

  )
}

export default memo(CityHeavenFlowHeader)

// import React, { useState, ChangeEvent, FormEventHandler, ChangeEventHandler, useEffect, useRef } from 'react'
// import { useOwnerStore } from '../../store';
// import { useReactFlow } from '@xyflow/react';
// import { Link, useForm, usePage, } from '@inertiajs/react';

// type Props = {
//   id: number;
//   initialTitle: string;
//   initialUrl: string;
// }

// const CityHeavenFlowHeader = ({ id, initialTitle, initialUrl }: Props) => {
//   console.log('shun')
//   // const [title, setTitle] = useState(initialTitle);
//   // const [url, setUrl] = useState(initialUrl);
//   const { toObject, getNodes, getEdges } = useReactFlow();
//   const firstNodeId = useOwnerStore((state) => state.firstNodeId);
//   const setIsDirty = useOwnerStore((state) => state.setIsDirty);
//   const isDirty = useOwnerStore((state) => state.isDirty);

//   const { data, setData, transform, post, patch, errors, processing, recentlySuccessful } = useForm({
//     flow_id: id,
//     update_questions: '',
//     update_results: '',
//     update_edges: '',
//     first_question_id: '',
//     title: initialTitle,
//     url: initialUrl,
//   });

//   // console.log(firstNodeId)

//   // transform((data) => ({
//   //   ...data,
//   //   update_questions: JSON.stringify(getNodes().filter(x => x.type === 'cityHeavenQuestionNode')),
//   //   update_results: JSON.stringify(getNodes().filter(x => x.type === 'cityHeavenQuestionNode')),
//   //   update_edges: JSON.stringify(getEdges()),
//   //   first_question_id: 'shun',
//   // }));

//   const handleSubmit: FormEventHandler = (event) => {
//     event.preventDefault();
//     // const nodes = getNodes();
//     // const edges = getEdges();
//     // const questions = nodes.filter(x => x.type === 'cityHeavenQuestionNode');
//     // const results = nodes.filter(x => x.type === 'cityHeavenResultNode');

//     post(route('flows.commit'));

//     // console.log({
//     //   ...data,
//     //   update_questions: JSON.stringify(questions)
//     // });

//     // transform((data) => ({
//     //   ...data,
//     //   update_questions: JSON.stringify(questions),
//     //   update_results: JSON.stringify(results),
//     //   update_edges: JSON.stringify(edges),
//     //   first_question_id: firstNodeId,
//     // }));

//     // post(route('flows.commit'));

//     // transform((data) => ({
//     //   ...data,
//     //   title: data.title ? data.title : '無題',
//     // })).post(route('bookmark.store'));

//     // setData('update_questions', JSON.stringify(questions));
//     // setData('update_results', JSON.stringify(results));
//     // setData('update_edges', JSON.stringify(edges));
//     // setData('first_question_id', firstNodeId);
//   };

//   return (
//     <div className='h-10 w-full bg-white'>

//       <form onSubmit={handleSubmit} className='w-full flex justify-around items-center'>
//         <div className='w-20 h-full'>
//           <button
//             className="w-full h-full  bg-indigo-500 px-2 text-white rounded shadow transition-all hover:bg-indigo-600 select-none hover:shadow-xl duration-200"
//           >保 存
//           </button>
//         </div>

//         <div className='flex flex-row items-center w-96 bg-slate-200'>
//           <label htmlFor="title" className="block text-sm font-medium text-gray-900 px-3">Title</label>
//           <input
//             type="text" id="title" placeholder="タイトルを入力してください"
//             className="bg-slate-100 border border-transparent text-gray-900 text-sm focus:ring-transparent focus:border-transparent block w-full p-2.5 h-full placeholder-slate-400"
//             onChange={(e) => setData('title', e.target.value)}
//             value={data.title}
//           />
//         </div>

//         <div className='flex flex-row  items-center w-96 bg-slate-200'>
//           <label htmlFor="url" className="block text-sm font-medium text-gray-900 px-3">URL</label>
//           <input
//             type="text" id="url" placeholder="URLを入力してください"
//             className="bg-slate-100 border border-transparent text-gray-900 text-sm focus:ring-transparent focus:border-transparent block w-full p-2.5 h-full placeholder-slate-400"
//             onChange={(e) => setData('url', e.target.value)}
//             value={data.url}
//           />
//         </div>
//       </form>
//     </div>

//   )
// }

// export default CityHeavenFlowHeader