import { memo, useState, ChangeEvent, MouseEvent, KeyboardEvent, CompositionEvent, FormEventHandler, useEffect, useRef, useCallback } from 'react'
import { useOwnerStore } from '@/Pages/Owner/store';
import { useReactFlow } from '@xyflow/react';
import { router, usePage } from '@inertiajs/react';
import { MdContentCopy } from "react-icons/md";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { toast } from '@/Pages/Owner/components/toast/CustomToaster'


type Props = {
  id: number;
  initialTitle: string;
  initialUrl: string;
}

type ValidateError = {
  title?: string;
  url?: string;
}

const titleMaxLength = 50;
const urlMaxLength = 15;

const FlowHeader = ({ id, initialTitle, initialUrl }: Props) => {
  const { props } = usePage();
  const owner = props.auth.user.english_name;

  const [title, setTitle] = useState(initialTitle);
  const [url, setUrl] = useState(initialUrl);
  const [error, setError] = useState<ValidateError>({});
  const { getNodes, getEdges, getViewport } = useReactFlow();
  const firstNodeId = useOwnerStore((state) => state.firstNodeId);
  const setIsDirty = useOwnerStore((state) => state.setIsDirty);
  const isDirty = useOwnerStore((state) => state.isDirty);
  const urlRef = useRef<HTMLInputElement | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);


  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();


    if (!firstNodeId) {
      toast.error("1問目の質問を作成してください", { duration: 5000 });
      return
    }

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
        for (const value of Object.values(err)) {
          toast.error(value, { duration: 5000 });
        }
      },
    })
  };


  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    setIsDirty(true);
  }

  const handleChangeUrl = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.currentTarget.value);
    setIsDirty(true);
  };


  const handleCopy = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      await navigator.clipboard.writeText(`${window.location.origin}/${owner}/${urlRef.current?.value}`);
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000); // 2秒後に自動でツールチップを非表示
    } catch (error) {
      console.error("コピーに失敗しました:", error);
    }
  };

  return (
    <div className='h-14 w-full bg-white'>

      <div className='h-full w-full flex items-center bg-slate-100'>


        <form onSubmit={handleSubmit} className='w-full h-14 flex justify-around items-center'>
          <div className='h-full w-2/12 flex justify-between items-center'>

            <div className='text-gray-500/70 font-bold text-lg pl-4'>{`ID:${id}`}</div>
            <div className='h-10 w-16 '>
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
          </div>


          <div className='flex justify-start items-center pl-20 gap-x-10 w-10/12'>
            <div className=' flex flex-col items-center w-[675px]'>
              <div>
                {error.title && (<div className='text-sm text-red-500'>{error.title}</div>)}
              </div>

              <div className='flex w-full flex-row items-center'>
                <label htmlFor="title" className="block text-sm font-medium text-gray-800 h-10 leading-10  text-center">タイトル：</label>
                <input
                  type="text" id="title" placeholder="タイトルを入力してください"
                  className="grow bg-white border border-slate-400 text-gray-900 text-sm focus:ring-transparent focus:border-blue-400 block  p-2.5 h-full placeholder-slate-400 rounded"
                  onChange={handleChangeTitle}
                  value={title}
                  required
                  maxLength={titleMaxLength}
                />
              </div>
            </div>

            <div className=' flex flex-col items-center w-96'>
              <div>
                {error.url && (<div className='text-sm text-red-500'>{error.url}</div>)}
              </div>

              <div className='flex w-full flex-row items-center'>
                <label htmlFor="url" className="block text-sm font-medium text-gray-800 h-10 leading-10  text-center">URL：</label>
                <div className='text-gray-400 border-slate-300 pr-1'>{window.location.origin}/{owner}/</div>
                <input
                  type="text" id="url" placeholder="URLを入力してください" ref={urlRef}
                  className={`grow bg-white  text-gray-900 text-sm focus:ring-transparent  block  p-2.5 h-full placeholder-slate-400 rounded ${error.url ? "border-rose-300 focus:border-rose-400 border-2" : "border-slate-400 focus:border-blue-400 border"} `}
                  onChange={handleChangeUrl}
                  value={url}
                  required
                  maxLength={urlMaxLength}
                />

                <button
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="URLをコピーしました"
                  onClick={handleCopy}
                  className="pl-2 py-2 text-indigo-400 rounded transition-all hover:text-indigo-800 duration-300"
                >
                  <MdContentCopy />
                </button>

                {showTooltip && (
                  <Tooltip
                    id="my-tooltip"
                    place="top"
                    style={{ background: "#6366f1", fontSize: "12px", padding: "4px 8px" }}
                    openOnClick={true}
                    isOpen={showTooltip}
                  />
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default memo(FlowHeader)

