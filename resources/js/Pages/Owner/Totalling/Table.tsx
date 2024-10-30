import { useEffect, useState, useCallback, MouseEvent, memo, Fragment, useRef, useMemo } from 'react';
import HorizontalBarChart from './HorizontalBarChart';
import DebouncedInput from './DebouncedInput';
import { IoSearchOutline } from "react-icons/io5";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  getSortedRowModel,
  SortingFn,
  SortingState,
} from "@tanstack/react-table";

type Flow = {
  id: number,
  title: string;
  category: string;
  total: number
}

type Props = {
  flows: Flow[]
}

const columnHelper = createColumnHelper<Flow>();

// const sortTotalFn: SortingFn<Flow> = (rowA, rowB, _columnId) => {
//   const totalA = rowA.original.total
//   const totalB = rowB.original.total
//   return totalA - totalB;
// }

const Table = ({ flows }: Props) => {
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const toggleRow = (rowIndex: number) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowIndex]: !prev[rowIndex],
    }));
  };


  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "ID", size: 10, minSize: 10, maxSize: 10,
      }),
      columnHelper.accessor("category", {
        header: "カテゴリ", size: 10, minSize: 10, maxSize: 10
      }),
      columnHelper.accessor("title", {
        header: "タイトル"
      }),
      columnHelper.accessor("total", {
        header: "合計", size: 10, minSize: 10, maxSize: 10,
        // sortingFn: sortTotalFn
      }),
      columnHelper.display({
        id: "viewGraph",
        header: "内訳",
        size: 10, minSize: 10, maxSize: 10,
        cell: ({ row }) => (
          <button
            onClick={() => { toggleRow(row.index) }}
            className={`select-none ${expandedRows[row.index] ? 'text-red-400' : 'text-indigo-400'}`}>
            {expandedRows[row.index] ? '閉じる' : '表示'}
          </button>
        ),
      }),
    ],
    [expandedRows]
  );

  const table = useReactTable({
    data: flows,
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

            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-sm text-gray-700 uppercase bg-gray-200 ">
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

                  // <tr key={headerGroup.id}>
                  //   {headerGroup.headers.map((header) => {
                  //     return (
                  //       <th key={header.id} scope="col" className="px-3 py-3"
                  //         style={{ width: `${header.column.getSize()}px` }}>
                  //         {header.isPlaceholder
                  //           ? null
                  //           : flexRender(
                  //             header.column.columnDef.header,
                  //             header.getContext()
                  //           )}
                  //       </th>
                  //     );
                  //   })}
                  // </tr>


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

                      {expandedRows[row.index] && (
                        <tr
                        >
                          <td colSpan={columns.length} className="p-4">
                            <HorizontalBarChart key={row.id} flowId={row.original.id} />
                          </td>
                        </tr>
                      )}
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


            {/* Pagination */}
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

export default memo(Table);




