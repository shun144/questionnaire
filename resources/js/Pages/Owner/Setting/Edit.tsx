import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link, } from '@inertiajs/react';
import UpdateCityHeavenApiForm from './Partials/UpdateCityHeavenApiForm'

type Props = {
  masking_access_key: string;
  masking_shop_id: string;
}

const Edit = ({ masking_access_key, masking_shop_id }: Props) => {
  return (
    <AuthenticatedLayout
      header={
        <div className='flex justify-between items-center py-5'>
          <h2 className="font-bold text-xl text-slate-600 leading-tight">シティヘブンAPI資格情報</h2>
        </div >
      }
    >
      <Head title="Setting" />
      <div className="py-12">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">

          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <UpdateCityHeavenApiForm
              className={"max-w-full"}
              masking_access_key={masking_access_key}
              masking_shop_id={masking_shop_id} />
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  )
}

export default Edit;