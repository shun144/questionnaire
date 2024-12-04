import { useState, FormEventHandler, MouseEvent } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import TermsModal from './TermsModal';


type Props = {
    token: string;
}

export default function ResetPassword({ token }: Props) {

    const [isCheckDisable, setIsCheckDisable] = useState(true);
    const [isOpenModal, setIsOpenModal] = useState(false);


    const { data, setData, post, processing, errors, reset } = useForm({
        token,
        email: '',
        password: '',
        password_confirmation: '',
        // terms_check: false,
        terms_check: true
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('first.login.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        setIsOpenModal(true)
    }

    return (
        <GuestLayout>
            <Head title="初回パスワードリセット" />
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="メールアドレス" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="パスワード" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="パスワード（確認用）" />

                    <TextInput
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                {/* 利用規約の同意チェックボックス */}
                <div className='mt-8'>

                    <div className='flex flex-col'>

                        <div className=" flex justify-start items-center gap-x-2">
                            <input
                                type="checkbox"
                                name="term_checkbox"
                                className={`${isCheckDisable ? "bg-gray-300" : ""} outline-none border-none`}
                                checked={data.terms_check}
                                disabled={isCheckDisable}
                                onChange={(e) => setData('terms_check', !data.terms_check)}
                            />

                            <InputLabel htmlFor="term_checkbox">
                                <button
                                    className='text-base text-blue-500 transaction-all duration-200 hover:text-blue-700'
                                    onClick={handleClick}>
                                    利用規約を見る
                                </button>
                                {/* <a className='text-lg text-blue-500 underline transaction-all duration-200 hover:text-blue-800' href="">利用規約</a> を見る */}
                            </InputLabel>
                        </div>

                        <InputError message={errors.terms_check} className="mt-2" />

                    </div>
                </div>


                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        初回ログイン
                    </PrimaryButton>
                </div>
            </form>

            <TermsModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
        </GuestLayout >
    );
}
