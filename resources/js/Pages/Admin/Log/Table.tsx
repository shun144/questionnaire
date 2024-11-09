import { router } from '@inertiajs/react';
import { useEffect, useState, useCallback, MouseEvent, useMemo, Fragment } from 'react';
import { User } from '../../../types';
import { toast } from '@/Pages/Owner/components/toast/CustomToaster'
import DebouncedInput from '@/Components/DebouncedInput';

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


type Log = {
  name: string;
  url: string;
}

export type TableProps = {
  initialLogs: Log[];
  success?: string;
  fail?: string;
}

const columnHelper = createColumnHelper<Log>();

const Table = ({ initialLogs, success, fail }: TableProps) => {

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    if (success) {
      toast.success(success, { duration: 4000 });
    }
  }, [success])

  useEffect(() => {
    if (fail) {
      toast.error(fail, { duration: 4000 });
    }
  }, [fail])



  const handleClickDownload = (event: MouseEvent, name: string, url: string) => {
    event.preventDefault();

    const link = document.createElement('a');
    link.href = url;
    link.download = name; // ダウンロード時のファイル名
    link.style.display = 'none'; // 見えないように設定
    document.body.appendChild(link); // DOMに追加
    link.click();
    document.body.removeChild(link); // ダウンロード後にDOMから削除
  }


  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "ファイル名",
      }),
      columnHelper.display({
        id: "Action",
        header: "Action",
        size: 65,
        cell: ({ row }) => (
          <>
            <button
              className='font-medium text-blue-600 hover:bg-blue-500 hover:text-white mx-1 transiton-all duration-150 p-1 rounded'
              onClick={(e) => handleClickDownload(e, row.original.name, row.original.url)}
            >
              ダウンロード
            </button>
          </>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: initialLogs,
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
    defaultColumn: {
      size: 200,
    },
  });

  return (
    <>
      <div className='max-w-full w-5/12 mx-auto sm:px-6 lg:py-8'>
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
            <table
              className="w-full text-sm text-left rtl:text-right text-gray-500"

            >
              <thead className="text-sm text-gray-700 bg-gray-200 ">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => {
                      return (
                        <th
                          key={header.id}
                          colSpan={header.colSpan}
                          style={{ maxWidth: header.getSize() }}
                        >
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
                        className="bg-white border-b"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id}
                            className='px-2 py-2'
                            style={{
                              maxWidth: cell.column.getSize(),
                              overflow: 'hidden',
                              overflowWrap: 'break-word',
                            }}
                          >
                            {
                              flexRender(
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

      </div >
    </>
  )
}


export default Table;









