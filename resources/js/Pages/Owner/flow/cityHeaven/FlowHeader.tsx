import React, { memo, useState, ChangeEvent, KeyboardEvent, CompositionEvent, FormEventHandler, useEffect, useRef, useCallback } from 'react'
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
  const [title, setTitle] = useState(initialTitle);
  const [url, setUrl] = useState(initialUrl);
  const [error, setError] = useState<ValidateError>({});
  const { getNodes, getEdges, getViewport } = useReactFlow();
  const firstNodeId = useOwnerStore((state) => state.firstNodeId);
  const setIsDirty = useOwnerStore((state) => state.setIsDirty);
  const isDirty = useOwnerStore((state) => state.isDirty);


  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    console.log(getNodes());

    const nodes = getNodes();
    const edges = getEdges();
    const questions = nodes.filter(x => x.type === 'qNode');
    const results = nodes.filter(x => x.type === 'rNode');
    const { x, y, zoom } = getViewport();

    router.post(`/flow/${id}`, {
      update_questions: JSON.stringify(questions),
      update_results: JSON.stringify(results),
      update_edges: JSON.stringify(edges),
      first_question_id: firstNodeId,
      title: title,
      url: url,
      x,
      y,
      zoom
    }, {
      onSuccess: () => {
        setError({});
        toast.success('保存しました', { duration: 4000 });
        setIsDirty(false);
      },
      onError: (err) => {
        setError(err);
        // toast.error('保存に失敗しました', { duration: 5000 });
        for (const value of Object.values(err)) {
          toast.error(value, { duration: 5000 });
        }
      },
    })
  };


  const handleChangeTitle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    setIsDirty(true);
  }, [])

  const handleChangeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
    setIsDirty(true);
  };

  const handleKeyDownUrl = (event: KeyboardEvent<HTMLInputElement>) => {
    const alphanumericRegex = /^[a-zA-Z0-9]$/;
    // 入力されたキーが半角英数字でない場合、イベントをキャンセル
    if (!alphanumericRegex.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab') {
      event.preventDefault();
    }
  };

  const handleCompositionEndUrl = (event: CompositionEvent<HTMLInputElement>) => {
    // IMEでの入力終了時に入力値を検証
    const newValue = event.currentTarget.value;
    const alphanumericRegex = /^[a-zA-Z0-9]*$/;

    if (!alphanumericRegex.test(newValue)) {
      setUrl(newValue.split('').filter(char => alphanumericRegex.test(char)).join(''));
    }
  };

  return (
    <div className='h-14 w-full bg-white'>

      <div className='h-full w-full flex justify-center items-center bg-slate-100'>

        <form onSubmit={handleSubmit} className='w-full h-14 flex justify-around items-center'>
          <div className='h-10 w-16'>
            <button
              className="relative w-full h-full bg-indigo-500 px-2 text-white rounded-md shadow-xl transition-all hover:bg-indigo-600 select-none hover:shadow-xl duration-200"
            >保 存
              {isDirty && (
                <span className="absolute flex h-3 w-3 -top-1 -right-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500 opacity-85"></span>
                </span>
              )}
            </button>
          </div>


          <div className='flex justify-center items-center gap-x-10'>
            <div className=' flex flex-col items-center w-96'>
              <div>
                {error.title && (<div className='text-sm text-red-500'>{error.title}</div>)}
              </div>

              <div className='flex w-full flex-row items-center'>
                <label htmlFor="title" className="block text-sm font-medium text-gray-800 px-3 h-10 leading-10 bg-slate-300 text-center">タイトル</label>
                <input
                  type="text" id="title" placeholder="タイトルを入力してください" maxLength={50}
                  className="grow bg-slate-100 border border-slate-300 text-gray-900 text-sm focus:ring-transparent focus:border-slate-400 block  p-2.5 h-full placeholder-slate-400 shadow"
                  onChange={handleChangeTitle}
                  value={title}
                />
              </div>
            </div>

            <div className=' flex flex-col items-center w-96'>
              <div>
                {error.url && (<div className='text-sm text-red-500'>{error.url}</div>)}
              </div>

              <div className='flex w-full flex-row items-center'>
                <label htmlFor="url" className="block text-sm font-medium text-gray-800 px-3 h-10 leading-10 bg-slate-300 text-center">URL</label>
                <input
                  type="text" id="url" placeholder="URLを入力してください" maxLength={50}
                  // className="grow bg-slate-100 border border-slate-300 text-gray-900 text-sm focus:ring-transparent focus:border-slate-400 block  p-2.5 h-full placeholder-slate-400 shadow"
                  className={`grow bg-slate-100  text-gray-900 text-sm focus:ring-transparent  block  p-2.5 h-full placeholder-slate-400 shadow ${error.url ? "border-rose-300 focus:border-rose-400 border-2" : "border-slate-300 focus:border-slate-400 border"} `}

                  onChange={handleChangeUrl}
                  value={url}
                />
              </div>
            </div>
          </div>
        </form>

      </div>




    </div>

  )
}

export default memo(CityHeavenFlowHeader)

