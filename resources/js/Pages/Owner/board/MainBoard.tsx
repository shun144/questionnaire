import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link, } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { getFlows } from '../utils';
import { FlowType } from '../types';
import AddFlowButton from '../components/button/AddFlowButton';

const MainBoard = () => {
  const [flows, setFlows] = useState<FlowType[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getFlows();
        setFlows(res);
      } catch (error) {
        setFlows([]);
      }
    })();
  }, []);

  return (

    <AuthenticatedLayout
      header
    >
      <Head title="Board" />

      <div className="flex justify-center items-start h-full pt-20">
        <div className='grid grid-cols-5 gap-8'>
          <>
            {
              flows.map(({ id, category, title, url }) => (
                <Link
                  className="w-56 h-28 rounded-lg shadow border bg-slate-500 relative inline-block"
                  key={id} href={`flow/${category}/${id}`} as="button" type="button"
                >
                  {title} {category} {url}
                </Link>
              ))
            }
            {flows && <AddFlowButton />}

          </>
        </div>
      </div>



    </AuthenticatedLayout >
  )
}


export default MainBoard




