import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import '../../../css/quize/index.css';
import Board from './Board';

const BoardLayout = () => {

  return (
    <AuthenticatedLayout
      header
    >
      <Head title="Dashboard" />

      <ReactFlowProvider >
        <Board />
      </ReactFlowProvider>

    </AuthenticatedLayout >
  )
}
export default BoardLayout