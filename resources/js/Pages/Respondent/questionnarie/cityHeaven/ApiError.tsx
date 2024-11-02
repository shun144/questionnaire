import { memo } from 'react'
import ResetButton from '@/Pages/Respondent/components/ResetButton';
// import Reset from ""

type Props = {
  errorMessage: string;
}

const ApiError = ({ errorMessage }: Props) => {
  return (
    <>

      <div className=' bg-slate-100 grow h-full w-full'>
        <div className='h-full w-full flex  justify-center items-start'>
          <div className='pt-12 w-9/12 md:pt-24 md:w-5/12'>
            <div className='flex items-end gap-x-3'>
              {/* <span className='text-3xl font-normal text-slate-600 md:text-4xl'>404</span> */}
              <span className='text-3xl font-bold text-slate-600 md:text-4xl'>結果データの取得に失敗しました。</span>
            </div>
            <div className='pt-6 text-xl text-slate-700 md:pt-12 md:text-3xl'>
              <span>アンケートをやり直していただくか、管理者へご確認ください。</span>
              <p className='pt-2 md:pt-4'>{errorMessage}</p>
            </div>

            <div className='pt-6 md:pt-12'>
              <ResetButton />
            </div>


          </div>

        </div>
      </div>
    </>
  )
}

export default memo(ApiError);