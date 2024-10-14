import { memo } from 'react'
import { IoArrowBack } from "react-icons/io5";
import { useQuestionnaireStore } from './store';


const NotFound = () => {
  const { answerHistories, backStep } = useQuestionnaireStore();

  return (
    <>
      <div>
        記事がないよ！
        {/* 戻るボタン */}
        {answerHistories.length > 0 && (
          <div className='flex justify-start items-start'>
            <button
              className='bg-blue-500 hoverable:hover:bg-blue-700 text-white font-bold py-2 px-3 rounded flex justify-center items-center gap-1 shadow-2xl'
              onClick={backStep}>
              <IoArrowBack className="text-xl" />
              <p>1つ前の質問に戻る</p>
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default memo(NotFound);