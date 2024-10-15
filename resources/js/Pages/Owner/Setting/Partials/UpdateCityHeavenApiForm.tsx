import { useRef, FormEventHandler } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateCityHeavenApiForm({ className = '' }: { className?: string }) {
    // const passwordInput = useRef<HTMLInputElement>(null);
    // const currentPasswordInput = useRef<HTMLInputElement>(null);
    const accessKeyInput = useRef<HTMLInputElement>(null);
    const shopIdInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        access_key: '',
        shop_id: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('cityheaven.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.access_key) {
                    reset('access_key');
                    accessKeyInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('shop_id');
                    shopIdInput.current?.focus();
                }
            },
        });
    };

    // const updatePassword: FormEventHandler = (e) => {
    //     e.preventDefault();

    //     put(route('password.update'), {
    //         preserveScroll: true,
    //         onSuccess: () => reset(),
    //         onError: (errors) => {
    //             if (errors.password) {
    //                 reset('password', 'password_confirmation');
    //                 passwordInput.current?.focus();
    //             }

    //             if (errors.current_password) {
    //                 reset('current_password');
    //                 currentPasswordInput.current?.focus();
    //             }
    //         },
    //     });
    // };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">シティヘブンAPI利用時必要項目</h2>

                <p className="mt-1 text-sm text-gray-600">
                    シティヘブンチェック項目アンケートを利用する場合シティヘブンAPI登録が必要です。
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="access_key" value="アクセスキー" />

                    <TextInput
                        id="access_key"
                        ref={accessKeyInput}
                        value={data.access_key}
                        onChange={(e) => setData('access_key', e.target.value)}
                        // type="password"
                        className="mt-1 block w-full"
                        autoComplete="access-key"
                    />
                    <InputError message={errors.access_key} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="shop_id" value="店舗ID" />

                    <TextInput
                        id="shop_id"
                        ref={shopIdInput}
                        value={data.shop_id}
                        onChange={(e) => setData('shop_id', e.target.value)}
                        // type="password"
                        className="mt-1 block w-full"
                        autoComplete="shop-id"
                    />
                    <InputError message={errors.shop_id} className="mt-2" />
                </div>

                {/* <div>
                    <InputLabel htmlFor="current_password" value="Current Password" />

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                    />

                    <InputError message={errors.current_password} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="New Password" />

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div> */}

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
