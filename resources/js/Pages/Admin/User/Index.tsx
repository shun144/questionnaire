import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import 'react-responsive-pagination/themes/classic.css';
import { CustomToaster } from '@/Pages/Owner/components/toast/CustomToaster'
import UserTable, { TableProps } from './Table';


const Index = ({ initialUsers, success, fail }: TableProps) => {

  return (
    <AdminAuthenticatedLayout
      header={
        <div className='w-full flex justify-end items-center my-2'>
          <Link
            href={route("admin.user.create")}
            className='bg-emerald-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-emerald-600'
          >ユーザ追加</Link>
        </div>
      }
    >
      <Head title="ユーザ一覧" />
      <div className="py-12">
        <CustomToaster />
        <UserTable initialUsers={initialUsers} success={success} fail={fail} />
      </div>
    </AdminAuthenticatedLayout >
  )
}

export default Index;





