import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useCallback, useState } from 'react';
import Flow from './Flow';
// import BoardLayout from './BoardLayout';

const dummy = [
  {
    id: "1",
    title: 'テスト',
    url: 'test'
  }
]

const MainBoard = () => {
  const [flowId, setFlowId] = useState<string>("");

  const handleClick = useCallback((_id: string) => {
    setFlowId(_id);
  }, []);

  return (
    <AuthenticatedLayout
      header
    >
      <Head title="Board" />

      {flowId ? (
        Flow(flowId)
      ) : (
        <div className='grid grid-cols-3 gap-4'>
          {
            dummy &&
            dummy.map(({ id, title, url }) => (
              <div
                key={id}
                className="">
                <button
                  className="cursor-pointer"
                  onClick={() => handleClick(id)}
                >{title}</button>

              </div>
            ))
          }
        </div>
      )}


    </AuthenticatedLayout >
  )
}
export default MainBoard