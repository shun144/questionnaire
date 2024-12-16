import { FormEventHandler, memo, Dispatch, SetStateAction } from "react";
import { useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";

type Props = {
    isOpenModal: boolean;
    setIsOpenModal: Dispatch<SetStateAction<boolean>>;
};

const titleMaxLength = 50;
const urlMaxLength = 15;

const CreateModal = ({ isOpenModal, setIsOpenModal }: Props) => {
    const { data, setData, post, processing, reset, errors, clearErrors } =
        useForm({
            initialTitle: "",
            initialUrl: "",
        });

    const createFlow: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("flow.create"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setIsOpenModal(false);
    };

    return (
        <>
            <Modal show={isOpenModal} onClose={closeModal}>
                <form onSubmit={createFlow} className="p-6">
                    <div className="mt-6">
                        <InputLabel
                            htmlFor="initialTitle"
                            value={`アンケートタイトル（${titleMaxLength}文字）`}
                        />

                        <TextInput
                            id="initialTitle"
                            type="text"
                            name="initialTitle"
                            value={data.initialTitle}
                            onChange={(e) =>
                                setData("initialTitle", e.target.value)
                            }
                            className="mt-1 block w-11/12 placeholder-slate-300"
                            placeholder="タイトル"
                            required
                            maxLength={titleMaxLength}
                        />
                        <InputError
                            message={errors.initialTitle}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-10">
                        <InputLabel
                            htmlFor="initialUrl"
                            value={`アンケートURL名（${urlMaxLength}文字）`}
                        />

                        <TextInput
                            id="initialUrl"
                            type="text"
                            name="initialUrl"
                            value={data.initialUrl}
                            onChange={(e) =>
                                setData("initialUrl", e.target.value)
                            }
                            className="mt-1 block w-11/12 placeholder-slate-300"
                            placeholder="URL"
                            required
                            maxLength={urlMaxLength}
                        />
                        <InputError
                            message={errors.initialUrl}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-12 flex justify-start">
                        <button
                            className="bg-indigo-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-indigo-600"
                            disabled={processing}
                        >
                            作 成
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default memo(CreateModal);
