import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link, } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { deleteFlow } from '../utils';
import { FlowType } from '../types';
import AddFlowButton from '../components/button/AddFlowButton';

import { Menu, Item, TriggerEvent, Separator, Submenu, ItemParams, useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

type Props = {
  initialFlows: FlowType[];
}

const MENU_ID = "menu-id";

const MainBoard = ({ initialFlows }: Props) => {
  const [flows, setFlows] = useState<FlowType[]>(initialFlows);

  const { show } = useContextMenu({ id: MENU_ID });

  function handleFlowDelete(params: ItemParams) {
    // console.log(params.event, params.props, params.triggerEvent, params.data);
    // console.log(params.event);
    // console.log(params.props);
    // console.log(params.triggerEvent);
    // console.log(params.data);
    const flowId = params.props.flowId;
    (async () => {
      try {
        const res = await deleteFlow(flowId);
      } catch (error) {
      }
    })();
    setFlows(prev => prev.filter(x => x.id != flowId));
  }

  const displayMenu = (event: TriggerEvent, flowId: number) => {
    show({ event, props: { flowId } });
  }

  return (

    <AuthenticatedLayout
      header={
        <div className='flex justify-between items-center'>
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">アンケート一覧</h2>
          <AddFlowButton />
        </div>
      }
    >
      <Head title="Board" />

      <div className="flex justify-center items-start h-full pt-20">
        <div className='grid grid-cols-5 gap-8'>
          <>
            {
              flows.map(({ id, category, title, url }) => (

                <div className="w-56 h-40 rounded-lg shadow border inline-block bg-white overflow-hidden hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all
                ">
                  <div className={`w-full h-full relative
                  ${category === 'standard'
                      ? "before:content-['標準'] before:bg-emerald-100 before:text-emerald-800"
                      : "before:content-['シティヘブン'] before:bg-blue-100 before:text-blue-800"}
                  before:absolute before:left-1 before:top-1 before:text-xs  before:font-medium  before:me-2  before:px-2.5  before:py-0.5 before:rounded-md`}
                  >
                    <Link
                      className="w-full h-full"
                      key={id}
                      href={`flow/${id}`}
                      as="button"
                      type="button"
                      onContextMenu={(event) => displayMenu(event, id)}
                    >
                      {title}
                    </Link>
                  </div>
                </div>
              ))
            }

          </>
        </div>

      </div>

      <Menu id={MENU_ID}>
        <Item onClick={handleFlowDelete}>
          削除
        </Item>
        {/* <Item onClick={() => console.log('shun')}>
          削除
        </Item> */}
      </Menu>

    </AuthenticatedLayout >
  )
}


export default MainBoard







// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Head, usePage, Link, } from '@inertiajs/react';
// import { useEffect, useState } from 'react';
// import { getFlows, deleteFlow } from '../utils';
// import { FlowType } from '../types';
// import AddFlowButton from '../components/button/AddFlowButton';

// import { Menu, Item, TriggerEvent, Separator, Submenu, ItemParams, useContextMenu } from "react-contexify";
// import "react-contexify/dist/ReactContexify.css";

// const MENU_ID = "menu-id";

// const MainBoard = () => {
//   const [flows, setFlows] = useState<FlowType[]>([]);

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await getFlows();
//         setFlows(res);
//       } catch (error) {
//         setFlows([]);
//       }
//     })();
//   }, []);

//   const { show } = useContextMenu({
//     id: MENU_ID,
//   });

//   function handleFlowDelete(params: ItemParams) {
//     // console.log(params.event, params.props, params.triggerEvent, params.data);
//     // console.log(params.event);
//     // console.log(params.props);
//     // console.log(params.triggerEvent);
//     // console.log(params.data);
//     const flowId = params.props.flowId;
//     (async () => {
//       try {
//         const res = await deleteFlow(flowId);
//       } catch (error) {
//       }
//     })();

//     setFlows(prev => prev.filter(x => x.id != flowId));
//   }


//   function displayMenu(event: TriggerEvent, flowId: number) {
//     show({
//       event,
//       props: {
//         flowId
//       },
//     });
//   }

//   return (

//     <AuthenticatedLayout
//       header={
//         <div className='flex justify-between items-center'>
//           <h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>
//           <AddFlowButton />
//         </div>
//       }
//     >
//       <Head title="Board" />

//       <div className="flex justify-center items-start h-full pt-20">
//         <div className='grid grid-cols-5 gap-8'>
//           <>
//             {
//               flows.map(({ id, category, title, url }) => (
//                 <Link
//                   className="w-56 h-28 rounded-lg shadow border bg-slate-500 relative inline-block"
//                   key={id} href={`flow/${category}/${id}`} as="button" type="button"
//                   onContextMenu={(event) => displayMenu(event, id)}
//                 >
//                   {title} {category} {url}
//                 </Link>
//               ))
//             }

//           </>
//         </div>

//       </div>

//       <Menu id={MENU_ID}>
//         <Item onClick={handleFlowDelete}>
//           削除
//         </Item>
//         {/* <Item onClick={() => console.log('shun')}>
//           削除
//         </Item> */}
//       </Menu>

//     </AuthenticatedLayout >
//   )
// }


// export default MainBoard




