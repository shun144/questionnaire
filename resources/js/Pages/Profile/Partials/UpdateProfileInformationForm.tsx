import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage, } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { FormEventHandler } from 'react';

const nameMaxLength = 50;
const englishNameMaxLength = 15;
const mailMaxLength = 255;
const passwordMaxLength = 255;


export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }: { mustVerifyEmail: boolean, status?: string, className?: string }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        id: user.id,
        name: user.name,
        english_name: user.english_name,
        email: user.email,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                {/* <h2 className="text-lg font-medium text-gray-900">プロフィール</h2> */}

                <p className="mt-1 text-sm text-gray-600">
                    ユーザ情報やメールアドレスを更新します
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value={`ユーザ名（${nameMaxLength}文字）`} />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                        maxLength={nameMaxLength}
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                {/* 英語名 */}
                <div>
                    <InputLabel htmlFor="english_name" value={`店舗URL名（${englishNameMaxLength}文字）`} />
                    <TextInput
                        id="english_name"
                        className="mt-1 block w-full"
                        value={data.english_name}
                        onChange={(e) => setData('english_name', e.target.value)}
                        required
                        isFocused
                        autoComplete="english_name"
                        maxLength={englishNameMaxLength}
                    />
                    <InputError className="mt-2" message={errors.english_name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value={`メールアドレス（${mailMaxLength}文字）`} />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                        maxLength={mailMaxLength}
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>保存</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">保存完了</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}



// import InputError from '@/Components/InputError';
// import InputLabel from '@/Components/InputLabel';
// import PrimaryButton from '@/Components/PrimaryButton';
// import TextInput from '@/Components/TextInput';
// import { Link, useForm, usePage } from '@inertiajs/react';
// import { Transition } from '@headlessui/react';
// import { FormEventHandler } from 'react';

// export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }: { mustVerifyEmail: boolean, status?: string, className?: string }) {
//     const user = usePage().props.auth.user;

//     const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
//         name: user.name,
//         email: user.email,
//     });

//     const submit: FormEventHandler = (e) => {
//         e.preventDefault();

//         patch(route('profile.update'));
//     };

//     return (
//         <section className={className}>
//             <header>
//                 <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>

//                 <p className="mt-1 text-sm text-gray-600">
//                     Update your account's profile information and email address.
//                 </p>
//             </header>

//             <form onSubmit={submit} className="mt-6 space-y-6">
//                 <div>
//                     <InputLabel htmlFor="name" value="Name" />

//                     <TextInput
//                         id="name"
//                         className="mt-1 block w-full"
//                         value={data.name}
//                         onChange={(e) => setData('name', e.target.value)}
//                         required
//                         isFocused
//                         autoComplete="name"
//                     />

//                     <InputError className="mt-2" message={errors.name} />
//                 </div>

//                 <div>
//                     <InputLabel htmlFor="email" value="Email" />

//                     <TextInput
//                         id="email"
//                         type="email"
//                         className="mt-1 block w-full"
//                         value={data.email}
//                         onChange={(e) => setData('email', e.target.value)}
//                         required
//                         autoComplete="username"
//                     />

//                     <InputError className="mt-2" message={errors.email} />
//                 </div>

//                 {mustVerifyEmail && user.email_verified_at === null && (
//                     <div>
//                         <p className="text-sm mt-2 text-gray-800">
//                             Your email address is unverified.
//                             <Link
//                                 href={route('verification.send')}
//                                 method="post"
//                                 as="button"
//                                 className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                             >
//                                 Click here to re-send the verification email.
//                             </Link>
//                         </p>

//                         {status === 'verification-link-sent' && (
//                             <div className="mt-2 font-medium text-sm text-green-600">
//                                 A new verification link has been sent to your email address.
//                             </div>
//                         )}
//                     </div>
//                 )}

//                 <div className="flex items-center gap-4">
//                     <PrimaryButton disabled={processing}>Save</PrimaryButton>

//                     <Transition
//                         show={recentlySuccessful}
//                         enter="transition ease-in-out"
//                         enterFrom="opacity-0"
//                         leave="transition ease-in-out"
//                         leaveTo="opacity-0"
//                     >
//                         <p className="text-sm text-gray-600">Saved.</p>
//                     </Transition>
//                 </div>
//             </form>
//         </section>
//     );
// }
