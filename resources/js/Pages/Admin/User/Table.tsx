import { router } from '@inertiajs/react';
import { useEffect, useState, useCallback, MouseEvent, useMemo, Fragment } from 'react';
import { User } from '../../../types';
import toast from 'react-hot-toast';
import DebouncedInput from './DebouncedInput';

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { IoSearchOutline } from 'react-icons/io5';

type UserForAdmin = User & {
  first_password: string
}

type Props = {
  initialUsers: UserForAdmin[];
  success?: string
}

const columnHelper = createColumnHelper<UserForAdmin>();

const Table = ({ initialUsers, success }: Props) => {


  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    if (success) {
      toast.success(success, { duration: 4000 });
    }
  }, [success])

  const handleClickEdit = (event: MouseEvent, userId: number) => {
    event.preventDefault();
    router.get(`/admin/user/${userId}`)
  }

  const handleClickDelete = (event: MouseEvent, userId: number, userName: string) => {
    event.preventDefault();
    router.delete(`/admin/user/${userId}`, {
      onBefore: () => confirm(`${userName}さんを削除してよろしいですか？`),
    })
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "ID", size: 10, minSize: 10, maxSize: 10,
      }),
      columnHelper.accessor("name", {
        header: "ユーザ名"
      }),
      columnHelper.accessor("english_name", {
        header: "店舗URL名"
      }),
      columnHelper.accessor("email", {
        header: "メールアドレス"
      }),
      columnHelper.accessor("first_password", {
        header: "初回パスワード"
      }),
      columnHelper.display({
        id: "Action",
        header: "Action",
        size: 10, minSize: 10, maxSize: 10,
        cell: ({ row }) => (
          <>
            <button
              className='font-medium text-blue-600 hover:bg-blue-500 hover:text-white mx-1 transiton-all duration-150 p-1 rounded'
              onClick={(e) => handleClickEdit(e, row.original.id)}
            >
              編集
            </button>

            <button
              className='font-medium text-red-600 hover:bg-red-500 hover:text-white mx-1 transiton-all duration-150 p-1 rounded'
              onClick={(e) => handleClickDelete(e, row.original.id, row.original.name)}
            >
              削除
            </button>
          </>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: initialUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      globalFilter,
    },
  });

  return (
    <>
      <div className='max-w-full w-11/12 mx-auto sm:px-6 lg:py-8'>
        <div className='bg-white overflow-hidden shadow-sm'>
          <div className='pb-3 px-6'>

            {/* 検索 */}
            <div className='flex justify-start items-center h-24'>
              <div className="h-12 bg-slate-600 px-2 rounded-l">
                <IoSearchOutline className='h-full block text-white' />
              </div>

              <div className='h-full flex justify-center items-center'>
                <DebouncedInput
                  value={globalFilter ?? ""}
                  handleChange={(value) => setGlobalFilter(String(value))}
                  className="w-96 h-12 bg-transparent outline-none border rounded-r border-slate-300 focus:ring-0 focus:border-blue-500 placeholder:text-slate-400"
                  placeholder="検索"
                />
              </div>
            </div>

            {/* テーブル */}
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-sm text-gray-700 bg-gray-200 ">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => {
                      return (
                        <th key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder ? null : (
                            <div
                              className={`
                                px-3 py-3
                                ${header.column.getCanSort()
                                  ? 'cursor-pointer select-none'
                                  : ''
                                }`}
                              onClick={header.column.getToggleSortingHandler()}
                              title={
                                header.column.getCanSort()
                                  ? header.column.getNextSortingOrder() === 'asc'
                                    ? 'Sort ascending'
                                    : header.column.getNextSortingOrder() === 'desc'
                                      ? 'Sort descending'
                                      : 'Clear sort'
                                  : undefined
                              }
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {
                                { asc: '↑', desc: '↓', }
                                [header.column.getIsSorted() as string] ?? null
                              }
                            </div>
                          )}
                        </th>
                      )
                    })}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <Fragment key={row.id}>
                      <tr
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        className="bg-white border-b "
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="px-3 py-4 text-base"
                            style={{ width: `${cell.column.getSize()}px` }}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    </Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length} className="h-24 text-center">
                      対象レコード0件
                    </td>
                  </tr>
                )}
              </tbody>
            </table>


            {/* ページネーション */}
            <div className="flex items-center justify-center mt-4 gap-8">
              <div className='w-12 flex justify-center gap-2'>
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="p-1 border border-gray-300 px-2 disabled:opacity-30 select-none cursor-pointer"
                >
                  {"<"}
                </button>
                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="p-1 border border-gray-300 px-2 disabled:opacity-30 select-none cursor-pointer"
                >
                  {">"}
                </button>
              </div>

              <div className="flex items-center">
                <div className="text-gray-500">{`${table.getState().pagination.pageIndex + 1} / ${table.getPageCount()}`}</div>
              </div>

              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => table.setPageSize(Number(e.currentTarget.value))}
                className="py-2 pr-8 bg-transparent cursor-pointer select-none border-1 border-slate-200 focus:ring-0 focus:border-blue-500 text-sm"
              >
                {[10, 20, 30, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize} >
                    {`${pageSize} 行表示`}
                  </option>
                ))}
              </select>
            </div>

          </div>

        </div>

      </div>
    </>
  )
}


export default Table;










// import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
// import { Head, usePage, useForm, Link, router } from '@inertiajs/react';
// import { useEffect, useState, useCallback, MouseEvent } from 'react';
// import { User } from '../../../types';
// import ResponsivePagination from 'react-responsive-pagination';
// import toast from 'react-hot-toast';
// import TextInput from '@/Components/TextInput';

// type UserForAdmin = User & {
//   first_password: string
// }


// type Props = {
//   initialUsers: UserForAdmin[];
//   success?: string
// }

// const Table = ({ initialUsers, success }: Props) => {

//   const [users, setUsers] = useState<UserForAdmin[]>(initialUsers);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [currentItems, setCurrentItems] = useState<UserForAdmin[]>([]);

//   const peoplePerPage = 10; // 1ページあたりの人数

//   useEffect(() => {
//     setUsers(initialUsers);
//     setTotalPages(Math.ceil(initialUsers.length / peoplePerPage));
//   }, [initialUsers])

//   useEffect(() => {
//     setCurrentItems(users.slice((currentPage - 1) * peoplePerPage, currentPage * peoplePerPage));
//   }, [users, currentPage])


//   useEffect(() => {
//     if (success) {
//       toast.success(success, { duration: 4000 });
//     }
//   }, [success])

//   const handlePageChange = useCallback((page: number) => {
//     setCurrentPage(page);
//   }, [setCurrentPage])

//   const handleClickEdit = (event: MouseEvent, userId: number, userName: string) => {
//     event.preventDefault();
//     router.get(`/admin/user/${userId}`)
//   }


//   const handleClickDelete = (event: MouseEvent, userId: number, userName: string) => {
//     event.preventDefault();
//     router.delete(`/admin/user/${userId}`, {
//       onBefore: () => confirm(`${userName}さんを削除してよろしいですか？`),
//     })
//   }



//   return (
//     <>
//       <div className='max-w-7xl mx-auto sm:px-6 lg:py-8'>
//         <div className='bg-white overflow-hidden shadow-sm'>
//           <div className='p-6 text-gray-900'>

//             <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
//               <thead className='text-xs text-slate-700 uppercase border-b-2 border-slate-600 bg-slate-200'>
//                 <tr className='text-nowrap'>
//                   <th className='px-3 py-3'>ID</th>
//                   <th className='px-3 py-3'>ユーザ名</th>
//                   <th className='px-3 py-3'>店舗URL名</th>
//                   <th className='px-3 py-3'>メールアドレス</th>
//                   <th className='px-3 py-3'>初回パスワード</th>
//                   <th className='px-3 py-3 text-center'>action</th>
//                 </tr>
//               </thead>
//               <tbody className='text-slate-800'>

//                 {currentItems && currentItems.map(user => (
//                   <tr
//                     key={user.id}
//                     className='bg-white border-b border-slate-400 text-md'>
//                     <td className='px-3 py-2'>{user.id}</td>
//                     <td className='px-3 py-2'>{user.name}</td>
//                     <td className='px-3 py-2'>{user.english_name}</td>
//                     <td className='px-3 py-2'>{user.email}</td>
//                     <td className='px-3 py-2'>{user.first_password}</td>
//                     <td className='px-3 py-2 text-center'>

//                       <button
//                         className='font-medium text-blue-600 hover:bg-blue-500 hover:text-white mx-1 transiton-all duration-150 p-1 rounded'
//                         onClick={(event) => c(event, user.id, user.name)}
//                       >
//                         編集
//                       </button>

//                       <button
//                         className='font-medium text-red-600 hover:bg-red-500 hover:text-white mx-1 transiton-all duration-150 p-1 rounded'
//                         onClick={(event) => handleClickDelete(event, user.id, user.name)}
//                       >
//                         削除
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             <div className='w-full flex justify-center items-center mt-3'>
//               <ResponsivePagination
//                 current={currentPage}
//                 total={totalPages}
//                 onPageChange={handlePageChange}
//                 maxWidth={350}
//                 className="pagination select-none flex space-x-2"
//               />
//             </div>

//           </div>

//         </div>

//       </div>
//     </>
//   )
// }


// export default Table;






