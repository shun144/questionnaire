import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import { Head, usePage, Link, } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  return (

    <AdminAuthenticatedLayout
      header
    >
      <Head title="Board" />

      <div>You’re Admin User!</div>



    </AdminAuthenticatedLayout >
  )
}


export default Dashboard;




