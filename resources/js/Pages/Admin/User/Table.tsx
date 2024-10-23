import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import { Head, usePage, useForm, Link, router } from '@inertiajs/react';
import { useEffect, useState, useCallback, MouseEvent } from 'react';
import { User } from '../../../types';
import ResponsivePagination from 'react-responsive-pagination';
import toast from 'react-hot-toast';
import TextInput from '@/Components/TextInput';

type Props = {
  initialUsers: User[];
  success?: string
}

const Table = ({ initialUsers, success }: Props) => {



  const [users, setUsers] = useState<User[]>(initialUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentItems, setCurrentItems] = useState<User[]>([]);

  const peoplePerPage = 10; // 1ページあたりの人数

  useEffect(() => {
    setUsers(initialUsers);
    setTotalPages(Math.ceil(initialUsers.length / peoplePerPage));
  }, [initialUsers])

  useEffect(() => {
    setCurrentItems(users.slice((currentPage - 1) * peoplePerPage, currentPage * peoplePerPage));
  }, [users, currentPage])


  useEffect(() => {
    if (success) {
      toast.success(success, { duration: 4000 });
    }
  }, [success])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, [setCurrentPage])

  const handleDelete = (event: MouseEvent, userId: number, userName: string) => {
    event.preventDefault();
    router.delete(`/admin/user/${userId}`, {
      onBefore: () => confirm('Are you sure you want to delete this user?'),
    })
  }

  return (

    <>
      <div className='max-w-7xl mx-auto sm:px-6 lg:py-8'>
        <div className='bg-white overflow-hidden shadow-sm'>
          <div className='p-6 text-gray-900'>

            <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
              <thead className='text-xs text-slate-700 uppercase border-b-2 border-slate-600 bg-slate-200'>
                <tr className='text-nowrap'>
                  <th className='px-3 py-3'>ID</th>
                  <th className='px-3 py-3'>ユーザ名</th>
                  <th className='px-3 py-3'>店舗URL名</th>
                  <th className='px-3 py-3'>メールアドレス</th>
                  <th className='px-3 py-3 text-center'>action</th>
                </tr>
              </thead>
              <tbody className='text-slate-800'>

                {currentItems && currentItems.map(user => (
                  <tr
                    key={user.id}
                    className='bg-white border-b border-slate-400 text-md'>
                    <td className='px-3 py-2'>{user.id}</td>
                    <td className='px-3 py-2'>{user.name}</td>
                    <td className='px-3 py-2'>{user.english_name}</td>
                    <td className='px-3 py-2'>{user.email}</td>
                    <td className='px-3 py-2 text-center'>
                      <button
                        className='font-medium text-red-600 hover:bg-red-500 hover:text-white mx-1 transiton-all duration-150 p-1 rounded'
                        onClick={(event) => handleDelete(event, user.id, user.name)}
                      >
                        削除
                      </button>
                    </td>
                  </tr>
                ))}


              </tbody>
            </table>

            <div className='w-full flex justify-center items-center mt-3'>
              <ResponsivePagination
                current={currentPage}
                total={totalPages}
                onPageChange={handlePageChange}
                maxWidth={350}
                className="pagination select-none flex space-x-2"
              />
            </div>

          </div>

        </div>

      </div>
    </>
  )
}


export default Table;






