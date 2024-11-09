import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import { Head, usePage, useForm, Link, router } from '@inertiajs/react';
import { useEffect, useState, useCallback, MouseEvent } from 'react';
// import { User } from '../../../types';
import 'react-responsive-pagination/themes/classic.css';
import { CustomToaster, toast } from '@/Pages/Owner/components/toast/CustomToaster'
import LogTable, { TableProps } from './Table';

const Index = ({ initialLogs, success, fail }: TableProps) => {
  return (
    <AdminAuthenticatedLayout
      header={
        <div className='w-full flex justify-start items-center my-2 h-8'>
          ログ一覧
          {/* <Link
            href={route("admin.user.create")}
            className='bg-emerald-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-emerald-600'
          >ユーザ追加</Link> */}
        </div>
      }
    >
      <Head title="ユーザ一覧" />
      <div className="py-12">
        <CustomToaster />
        <LogTable initialLogs={initialLogs} success={success} fail={fail} />
      </div>
    </AdminAuthenticatedLayout >
  )
}

export default Index