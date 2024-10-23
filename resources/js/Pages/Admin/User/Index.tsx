import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import { Head, usePage, useForm, Link, router } from '@inertiajs/react';
import { useEffect, useState, useCallback, MouseEvent } from 'react';
import { User } from '../../../types';
import 'react-responsive-pagination/themes/classic.css';
import { Toaster } from 'react-hot-toast';
import UserTable from './Table';

type Props = {
  initialUsers: User[];
  success?: string;
}

const Index = ({ initialUsers, success }: Props) => {

  return (
    <AdminAuthenticatedLayout
      header={
        <div className='w-full flex justify-end items-center'>
          <Link
            href={route("admin.user.create")}
            className='bg-emerald-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-emerald-600'
          >ユーザ追加</Link>
        </div>
      }
    >
      <Head title="ユーザ一覧" />
      <div className="py-12">
        <Toaster position="top-right" reverseOrder={false} />
        <UserTable initialUsers={initialUsers} success={success} />
      </div>
    </AdminAuthenticatedLayout >
  )
}


export default Index;







// import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
// import { Head, usePage, useForm, Link, router } from '@inertiajs/react';
// import { useEffect, useState, useCallback, MouseEvent } from 'react';
// import { User } from '../../../types';
// import ResponsivePagination from 'react-responsive-pagination';
// import 'react-responsive-pagination/themes/classic.css';
// import toast from 'react-hot-toast';
// import TextInput from '@/Components/TextInput';

// type Props = {
//   initialUsers: User[];
//   success?: string;
// }

// const Index = ({ initialUsers, success }: Props) => {
//   const [users, setUsers] = useState<User[]>(initialUsers);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [currentItems, setCurrentItems] = useState<User[]>([]);

//   const peoplePerPage = 10; // 1ページあたりの人数

//   useEffect(() => {
//     setUsers(users);
//     setTotalPages(Math.ceil(users.length / peoplePerPage));
//     setCurrentItems(users.slice((currentPage - 1) * peoplePerPage, currentPage * peoplePerPage));

//   }, [users, currentPage])

//   useEffect(() => {
//     if (success) {
//       toast.success('ユーザを追加しました', { duration: 4000 });
//     }
//   }, [success])

//   const handlePageChange = useCallback((page: number) => {
//     setCurrentPage(page);
//   }, [setCurrentPage])

//   // const { delete: destroy } = useForm({
//   //   id: "", // リクエストボディにpageを追加
//   // });

//   const handleDelete = (event: MouseEvent, userId: number, userName: string) => {

//     event.preventDefault();

//     router.delete(`/admin/user/${userId}`, {
//       onBefore: () => confirm('Are you sure you want to delete this user?'),
//     })
//   }

//   return (

//     <AdminAuthenticatedLayout
//       header={
//         <div className='w-full flex justify-end items-center'>
//           <Link
//             href={route("admin.user.create")}
//             className='bg-emerald-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-emerald-600'
//           >ユーザ追加</Link>
//         </div>

//       }
//     >
//       <Head title="ユーザ一覧" />

//       {success && (
//         <div className='bg-emerald-500 py-2 px-4 text-white'>
//           {success}
//         </div>
//       )}

//       <div className="py-12">
//         <div className='max-w-7xl mx-auto sm:px-6 lg:py-8'>
//           <div className='bg-white overflow-hidden shadow-sm'>
//             <div className='p-6 text-gray-900'>

//               <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
//                 <thead className='text-xs text-slate-700 uppercase border-b-2 border-slate-600 bg-slate-200'>
//                   <tr className='text-nowrap'>
//                     <th className='px-3 py-3'>id</th>
//                     <th className='px-3 py-3'>name</th>
//                     <th className='px-3 py-3'>english_name</th>
//                     <th className='px-3 py-3'>email</th>
//                     <th className='px-3 py-3 text-center'>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody className='text-slate-800'>
//                   {currentItems.map(user => (
//                     <tr
//                       key={user.id}
//                       className='bg-white border-b border-slate-400 text-md'>
//                       <td className='px-3 py-2'>{user.id}</td>
//                       <td className='px-3 py-2'>{user.name}</td>
//                       <td className='px-3 py-2'>{user.english_name}</td>
//                       <td className='px-3 py-2'>{user.email}</td>
//                       <td className='px-3 py-2 text-center'>
//                         <button
//                           className='font-medium text-red-600 hover:bg-red-500 hover:text-white mx-1 transiton-all duration-150 p-1 rounded'
//                           onClick={(event) => handleDelete(event, user.id, user.name)}
//                         >
//                           削除
//                         </button>
//                         {/* <Link
//                           href={route('admin.user.destroy', user.id)}
//                           className='font-medium text-red-600 hover:underline mx-1'>
//                           削除
//                         </Link> */}
//                       </td>
//                     </tr>
//                   ))}


//                 </tbody>
//               </table>

//               <div className='w-full flex justify-center items-center mt-3'>
//                 <ResponsivePagination
//                   current={currentPage}
//                   total={totalPages}
//                   onPageChange={handlePageChange}
//                   maxWidth={350}
//                   className="pagination select-none flex space-x-2"
//                 />
//               </div>

//             </div>

//           </div>

//         </div>

//       </div>








//     </AdminAuthenticatedLayout >
//   )
// }


// export default Index;




