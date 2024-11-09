import { useEffect, FormEventHandler, ChangeEvent } from 'react'
import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import { Head, Link, useForm, } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

const nameMaxLength = 50;
const englishNameMaxLength = 15;
const mailMaxLength = 255;
const passwordMaxLength = 255;

const Create = () => {

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    english_name: '',
    email: '',
    password: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('admin.user.store'), {
      onFinish: () => reset('password'),
    });
  };

  return (

    <AdminAuthenticatedLayout
      header
    >
      <Head title="ユーザ一追加" />

      <div className="py-12">
        <div className='max-w-7xl mx-auto sm:px-6 lg:py-8'>
          <div className='bg-white overflow-hidden shadow-sm'>
            <div className='p-6 text-gray-900'>
              <form onSubmit={submit}>
                <div>
                  <InputLabel htmlFor="name" value={`ユーザ名（${nameMaxLength}文字）`} />

                  <TextInput
                    id="name"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    autoComplete="name"
                    isFocused={true}
                    onChange={(e) => setData('name', e.target.value)}
                    required
                    maxLength={nameMaxLength}
                  />
                  <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-8">
                  <InputLabel htmlFor="english_name" value={`店舗URL名（${englishNameMaxLength}文字）`} />

                  <TextInput
                    id="english_name"
                    name="english_name"
                    value={data.english_name}
                    className="mt-1 block w-full"
                    autoComplete="english_name"
                    isFocused={true}
                    onChange={(e) => setData('english_name', e.target.value)}
                    required
                    maxLength={englishNameMaxLength}
                  />
                  <InputError message={errors.english_name} className="mt-2" />
                </div>

                <div className="mt-8">
                  <InputLabel htmlFor="email" value={`メールアドレス（${mailMaxLength}文字）`} />

                  <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    autoComplete="username"
                    onChange={(e) => setData('email', e.target.value)}
                    required
                    maxLength={mailMaxLength}
                  />

                  <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-8">
                  <InputLabel htmlFor="password" value={`初回パスワード（8～${passwordMaxLength}文字）`} />

                  <TextInput
                    id="password"
                    // type="password"
                    name="password"
                    value={data.password}
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                    onChange={(e) => setData('password', e.target.value)}
                    required
                    maxLength={passwordMaxLength}
                  />
                  <InputError message={errors.password} className="mt-2" />
                </div>


                <div className="flex items-center justify-end mt-8">


                  <button
                    className='bg-emerald-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-emerald-600'
                    disabled={processing}
                  >追加</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </AdminAuthenticatedLayout >
  )
}

export default Create

// import React, { FormEventHandler } from 'react'
// import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
// import { Head, Link, useForm, } from '@inertiajs/react';
// import InputError from '@/Components/InputError';
// import InputLabel from '@/Components/InputLabel';
// import PrimaryButton from '@/Components/PrimaryButton';
// import TextInput from '@/Components/TextInput';

// const Create = () => {

//   const { data, setData, post, processing, errors, reset } = useForm({
//     name: '',
//     english_name: '',
//     email: '',
//     password: '',
//     password_confirmation: '',
//   });

//   const submit: FormEventHandler = (e) => {
//     e.preventDefault();

//     post(route('admin.user.store'), {
//       onFinish: () => reset('password', 'password_confirmation'),
//     });
//   };

//   return (

//     <AdminAuthenticatedLayout
//       header
//     >
//       <Head title="ユーザ一追加" />

//       <div className="py-12">
//         <div className='max-w-7xl mx-auto sm:px-6 lg:py-8'>
//           <div className='bg-white overflow-hidden shadow-sm'>
//             <div className='p-6 text-gray-900'>
//               <form onSubmit={submit}>
//                 <div>
//                   <InputLabel htmlFor="name" value="ユーザ名" />

//                   <TextInput
//                     id="name"
//                     name="name"
//                     value={data.name}
//                     className="mt-1 block w-full"
//                     autoComplete="name"
//                     isFocused={true}
//                     onChange={(e) => setData('name', e.target.value)}
//                     required
//                   />
//                   <InputError message={errors.name} className="mt-2" />
//                 </div>

//                 <div className="mt-8">
//                   <InputLabel htmlFor="english_name" value="店舗URL名" />

//                   <TextInput
//                     id="english_name"
//                     name="english_name"
//                     value={data.english_name}
//                     className="mt-1 block w-full"
//                     autoComplete="english_name"
//                     isFocused={true}
//                     onChange={(e) => setData('english_name', e.target.value)}
//                     required
//                   />
//                   <InputError message={errors.english_name} className="mt-2" />
//                 </div>

//                 <div className="mt-8">
//                   <InputLabel htmlFor="email" value="メールアドレス" />

//                   <TextInput
//                     id="email"
//                     type="email"
//                     name="email"
//                     value={data.email}
//                     className="mt-1 block w-full"
//                     autoComplete="username"
//                     onChange={(e) => setData('email', e.target.value)}
//                     required
//                   />

//                   <InputError message={errors.email} className="mt-2" />
//                 </div>

//                 <div className="mt-8">
//                   <InputLabel htmlFor="password" value="パスワード" />

//                   <TextInput
//                     id="password"
//                     type="password"
//                     name="password"
//                     value={data.password}
//                     className="mt-1 block w-full"
//                     autoComplete="new-password"
//                     onChange={(e) => setData('password', e.target.value)}
//                     required
//                   />

//                   <InputError message={errors.password} className="mt-2" />
//                 </div>

//                 <div className="mt-8">
//                   <InputLabel htmlFor="password_confirmation" value="パスワード（確認用）" />

//                   <TextInput
//                     id="password_confirmation"
//                     type="password"
//                     name="password_confirmation"
//                     value={data.password_confirmation}
//                     className="mt-1 block w-full"
//                     autoComplete="new-password"
//                     onChange={(e) => setData('password_confirmation', e.target.value)}
//                     required
//                   />

//                   <InputError message={errors.password_confirmation} className="mt-2" />
//                 </div>


//                 <div className="flex items-center justify-end mt-8">


//                   <button
//                     className='bg-emerald-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-emerald-600'
//                     disabled={processing}
//                   >追加</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//     </AdminAuthenticatedLayout >
//   )
// }

// export default Create