import { useRef, FormEventHandler, memo, MouseEvent } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm, router } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

type Props = {
    className?: string
    masking_access_key?: string;
    masking_shop_id?: string;
}

const UpdateCityHeavenApiForm = ({ className = '', masking_access_key, masking_shop_id }: Props) => {
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

    const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        router.delete('/city-heaven', {
            preserveScroll: true,
            onBefore: () => confirm("資格情報を削除してよろしいですか？\n作成済みのシティヘブン診断結果が表示されなくなります"),
            // onSuccess: () => reset(),
            onFinish: () => reset(),
        })
    }


    return (
        <section className={className}>
            <header>

                <h2 className={`text-lg font-medium text-gray-900 inline-block
                after:ml-2 after:text-[10px] after:font-bold after:py-1 after:px-2 after:text-white after:rounded-full
                ${masking_access_key && masking_shop_id ?
                        "after:content-['登録済み']   after:bg-emerald-500" :
                        "after:content-['未登録']  after:bg-red-500 "}
                `}>
                    シティヘブンAPI利用 資格情報
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    シティヘブンチェック診断を利用する場合、シティヘブンAPIに関する資格情報（アクセスキーと店舗ID）が必要です。
                </p>
            </header>

            <div className='w-full pt-4'>

                {masking_access_key && masking_shop_id && (
                    <div className='w-full h-full flex flex-col justify-center items-start'>

                        <div className='text-[14px] text-white select-none bg-emerald-500/90 py-2 px-4 rounded grid grid-rows-2 grid-cols-2 gap-y-1 w-52'
                            style={{ gridTemplateColumns: "1fr 35px" }}
                        >
                            <div className=''>登録済みアクセスキー：</div>
                            <div className='text-end'>{masking_access_key}</div>
                            <div className=''>登録済み店舗ID：</div>
                            <div className='text-end'>{masking_shop_id}</div>
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={updatePassword} className="mt-12 space-y-6">
                <div>
                    <InputLabel htmlFor="access_key" value="アクセスキー" />

                    <TextInput
                        id="access_key"
                        ref={accessKeyInput}
                        value={data.access_key}
                        onChange={(e) => setData('access_key', e.target.value)}
                        type="password"
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
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="shop-id"
                    />
                    <InputError message={errors.shop_id} className="mt-2" />
                </div>

                <div className="flex items-center justify-between gap-4">

                    <div className='flex items-end justify-center gap-2'>
                        <button
                            className={` py-2 px-3 text-white rounded shadow transition-all 
                            ${processing ? " bg-slate-400 hover:bg-slate-400" : "bg-indigo-500 hover:bg-indigo-600"}`}
                            disabled={processing}
                        >
                            保 存
                        </button>
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


                    <button
                        className={` py-2 px-3 text-white rounded shadow transition-all  ${(!masking_access_key || !masking_shop_id || processing) ? "bg-slate-400 hover:bg-slate-400" : "bg-red-500 hover:bg-red-600"}`}
                        disabled={!masking_access_key || !masking_shop_id || processing}
                        onClick={handleDelete}
                    >
                        削 除
                    </button>


                </div>
            </form>
        </section>
    );
}

export default memo(UpdateCityHeavenApiForm);
