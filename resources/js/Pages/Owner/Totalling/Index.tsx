import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TotallingTable, { TableProps } from "./Table";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()

const Index = ({ flows }: TableProps) => {
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