import { useEffect, FormEventHandler, ChangeEvent, MouseEvent, memo } from 'react'
import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

type Props = {
  id: number,
  initialName: string;
  initialEnglishName: string;
  initialEmail: string;
  initialFirstPassword: string;
}

const Edit = ({ id, initialName, initialEnglishName, initialEmail, initialFirstPassword }: Props) => {

  const { data, setData, patch, processing, errors, reset } = useForm({
    name: initialName,
    english_name: initialEnglishName,
    email: initialEmail,
    first_password: initialFirstPassword,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    patch(route('admin.user.update', { id }));
  };

  const handleClickBack = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.visit(route('admin.dashboard'));
  };

  return (

    <AdminAuthenticatedLayout
      header
    >
      <Head title="ユーザ情報編集" />

      <div className="py-12">
        <div className='max-w-7xl mx-auto sm:px-6 lg:py-8'>
          <div className='bg-white overflow-hidden shadow-sm'>
            <div className='p-6 text-gray-900'>
              <form onSubmit={submit}>
                <div>
                  <InputLabel htmlFor="name" value="ユーザ名" />

                  <TextInput
                    id="name"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    autoComplete="name"
                    isFocused={true}
                    onChange={(e) => setData('name', e.target.value)}
                    required
                  />
                  <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-8">
                  <InputLabel htmlFor="english_name" value="店舗URL名" />

                  <TextInput
                    id="english_name"
                    name="english_name"
                    value={data.english_name}
                    className="mt-1 block w-full"
                    autoComplete="english_name"
                    isFocused={true}
                    onChange={(e) => setData('english_name', e.target.value)}
                    required
                    maxLength={15}
                  />
                  <InputError message={errors.english_name} className="mt-2" />
                </div>

                <div className="mt-8">
                  <InputLabel htmlFor="email" value="メールアドレス" />

                  <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    autoComplete="username"
                    onChange={(e) => setData('email', e.target.value)}
                    required
                  />

                  <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-8">
                  <InputLabel htmlFor="first_password" value="初回パスワード" />

                  <TextInput
                    id="first_password"
                    name="first_password"
                    value={data.first_password}
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                    onChange={(e) => setData('first_password', e.target.value)}
                    required
                  />
                  <InputError message={errors.first_password} className="mt-2" />
                </div>


                <div className="flex items-center justify-end mt-8">

                  <div className="flex items-center justify-between gap-x-8">
                    <button
                      className='bg-emerald-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-emerald-600'
                      disabled={processing}
                    >更新
                    </button>

                    <button
                      className='bg-stone-400 py-2 px-3 text-white rounded shadow transition-all hover:bg-stone-500'
                      disabled={processing}
                      onClick={handleClickBack}
                    >戻る
                    </button>
                  </div>



                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </AdminAuthenticatedLayout >
  )
}

export default memo(Edit)

