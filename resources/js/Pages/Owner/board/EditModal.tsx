import React, { FormEventHandler, memo, useRef, useState, ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react'
import { Head, usePage, Link, useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { toast } from '@/Pages/Owner/components/toast/CustomToaster'


type Props = {
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  editTitle: string;
  editUrl: string;
  flowId: number;
}

const titleMaxLength = 50;
const urlMaxLength = 15;

const EditModal = ({ isOpenModal, setIsOpenModal, editTitle, editUrl, flowId }: Props) => {

  const { data, setData, patch, processing, reset, errors, clearErrors
  } = useForm({
    editTitle: "",
    editUrl: ""
  });

  useEffect(() => {
    setData({
      editTitle,
      editUrl,
    });
  }, [editTitle, editUrl]);

  const updateFlow: FormEventHandler = (e) => {
    e.preventDefault();

    patch(route('flow.update', flowId), {
      preserveScroll: true,
      onSuccess: () => {
        closeModal();
        toast.success('更新が完了しました', { duration: 3000 });
      }
    });
  };

  const closeModal = () => {
    setIsOpenModal(false);
  }

  return (
    <>
      <Modal show={isOpenModal} onClose={closeModal}>
        <form onSubmit={updateFlow} className="p-6">

          <div className="mt-6">
            <InputLabel htmlFor="editTitle" value={`診断URL名（${urlMaxLength}文字）`} />

            <TextInput
              id="editTitle"
              type="text"
              name="editTitle"
              value={data.editTitle}
              onChange={(e) => setData('editTitle', e.target.value)}
              className="mt-1 block w-11/12 placeholder-slate-300"
              placeholder="タイトル"
              required
              maxLength={titleMaxLength}
            />
            <InputError message={errors.editTitle} className="mt-2" />
          </div>

          <div className="mt-10">
            <InputLabel htmlFor="editUrl" value={`診断URL名（${urlMaxLength}文字）`} />
            <TextInput
              id="editUrl"
              type="text"
              name="editUrl"
              value={data.editUrl}
              onChange={(e) => setData('editUrl', e.target.value)}
              className="mt-1 block w-11/12 placeholder-slate-300"
              placeholder="URL"
              required
              maxLength={urlMaxLength}
            />
            <InputError message={errors.editUrl} className="mt-2" />
          </div>


          <div className="mt-3 flex justify-end">
            <button className="bg-indigo-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-indigo-600" disabled={processing}>
              更 新
            </button>
          </div>
        </form>
      </Modal >
    </>
  )
}

export default memo(EditModal);