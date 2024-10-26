import { memo } from 'react'
import { Head } from '@inertiajs/react'
import { Header, Footer } from '../../components/Index';

const NotFound = () => {
  return (
    <>
      <Head title="アンケートが見つかりません" />

      <div className='w-screen min-h-screen h-screen flex flex-col md:overflow-x-hidden'>

        <Header />

        <div className=' bg-slate-100 grow h-full w-full'>
          <div className='h-full w-full flex justify-center items-start'>
            <div className='pt-12 w-9/12 md:pt-24 md:w-5/12'>

              <div className='flex items-end gap-x-3'>
                <span className='text-3xl font-normal text-slate-600 md:text-4xl'>404</span>
                <span className='text-3xl font-bold text-slate-600 md:text-4xl'>アンケートが見つかりません</span>
              </div>
              <div className='pt-6 text-xl text-slate-700 md:pt-12 md:text-3xl'>
                <span>お探しのアンケートは一時的にアクセスができないか、削除された可能性があります。</span>
                <p className='pt-2 md:pt-4'>また、URLに誤りがないか再度ご確認ください。</p>
              </div>

            </div>
          </div>

        </div>

        <Footer />
      </div>
    </>
  )
}

export default memo(NotFound);