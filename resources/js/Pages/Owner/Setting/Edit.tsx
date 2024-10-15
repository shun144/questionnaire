import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link, } from '@inertiajs/react';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
// import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateCityHeavenApiForm from './Partials/UpdateCityHeavenApiForm'

const Edit = () => {
  return (
    <AuthenticatedLayout
      header
    >

      <Head title="Setting" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <UpdateCityHeavenApiForm className="max-w-xl" />
          </div>

          {/* <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <UpdatePasswordForm className="max-w-xl" />
          </div> */}


        </div>
      </div>

    </AuthenticatedLayout>
  )
}

export default Edit;