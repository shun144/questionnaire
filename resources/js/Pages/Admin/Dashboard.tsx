// import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
// import { Head, usePage, Link, } from '@inertiajs/react';
// import { useEffect, useState } from 'react';
// import { User } from '../../types';

// type Props = {
//   initialUsers: User[];
// }

// const Dashboard = ({ initialUsers }: Props) => {
//   const [users, setUsers] = useState<User[]>(initialUsers);

//   useEffect(() => {
//     setUsers(users);
//   }, [users])


//   return (

//     <AdminAuthenticatedLayout
//       header
//     >
//       <Head title="ユーザ一覧" />

//       <div className="flex justify-center items-start h-full bg-red-200">


//         {users && users.map(user => (
//           <div key={user.id}>
//             {user.name}
//           </div>
//         ))}

//       </div>





//     </AdminAuthenticatedLayout >
//   )
// }


// export default Dashboard;




