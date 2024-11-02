import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link, } from '@inertiajs/react';
import TotallingTable from "./Table";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

type Props = {
  flows: {
    id: number,
    title: string;
    category: string;
    total: number
  }[]
}

const queryClient = new QueryClient()

const Index = ({ flows }: Props) => {
  return (
    <AuthenticatedLayout
      header={
        <div className='flex justify-between items-center py-5'>
          <h2 className="font-bold text-xl text-slate-600 leading-tight">診断結果集計</h2>
        </div >
      }
    >

      <Head title="Setting" />
      <div className="py-6">
        <QueryClientProvider client={queryClient}>
          <TotallingTable flows={flows} />
        </QueryClientProvider>
      </div>

    </AuthenticatedLayout>
  )
}

export default Index;