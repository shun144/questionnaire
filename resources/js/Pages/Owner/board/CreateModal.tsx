import React, { FormEventHandler, memo, useRef, useState, ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react'
import { Head, usePage, Link, useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

type Props = {
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  isRegisteredApiCredential: boolean;
}

const titleMaxLength = 50;
const urlMaxLength = 15;

const CreateModal = ({ isOpenModal, setIsOpenModal, isRegisteredApiCredential }: Props) => {

  const { data, setData, post, processing, reset, errors, clearErrors
  } = useForm({
    initialTitle: '',
    initialUrl: '',
    initialCategory: 'standard',
  });

  const createFlow: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('flow.create'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    setIsOpenModal(false);
  }

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData('initialCategory', event.target.value);
  };

  return (
    <>
      <Modal show={isOpenModal} onClose={closeModal}>
        <form onSubmit={createFlow} className="p-6">

          <div className="mt-6">
            <InputLabel htmlFor="initialTitle" value={`診断タイトル（${titleMaxLength}文字）`} />

            <TextInput
              id="initialTitle"
              type="text"
              name="initialTitle"
              value={data.initialTitle}
              onChange={(e) => setData('initialTitle', e.target.value)}
              className="mt-1 block w-11/12 placeholder-slate-300"
              placeholder="タイトル"
              required
              maxLength={titleMaxLength}
            />
            <InputError message={errors.initialTitle} className="mt-2" />
          </div>

          <div className="mt-10">
            <InputLabel htmlFor="initialUrl" value={`診断URL名（${urlMaxLength}文字）`} />

            <TextInput
              id="initialUrl"
              type="text"
              name="initialUrl"
              value={data.initialUrl}
              onChange={(e) => setData('initialUrl', e.target.value)}
              className="mt-1 block w-11/12 placeholder-slate-300"
              placeholder="URL"
              required
              maxLength={urlMaxLength}
            />
            <InputError message={errors.initialUrl} className="mt-2" />
          </div>

          <div className="mt-10 w-fit">
            <InputLabel htmlFor="standard" value="診断タイプ" />
            <div className="mx-auto max-w-md min-w-[320px]">
              <div className="flex border border-slate-300 rounded-md overflow-hidden inline-radio">
                <div className="flex-1">
                  <input
                    type="radio"
                    id="standard"
                    name="category"
                    value="standard"
                    className="opacity-0 absolute"
                    checked={data.initialCategory === 'standard'}
                    onChange={handleOptionChange}
                  />
                  <label
                    htmlFor="standard"
                    className={`text-sm flex items-center justify-center w-full h-12 text-gray-400 cursor-pointer border-r-2 border-white transition duration-300 select-none ${data.initialCategory === 'standard' ? 'bg-emerald-400 text-white font-medium' : ''}`}
                  >
                    標準診断
                  </label>
                </div>
                <div className="flex-1">
                  <input
                    type="radio"
                    id="cityHeaven"
                    name="category"
                    value="cityHeaven"
                    className="opacity-0 absolute"
                    checked={data.initialCategory === 'cityHeaven'}
                    onChange={handleOptionChange}
                    disabled={!isRegisteredApiCredential}
                  />
                  <label
                    htmlFor="cityHeaven"
                    className={`text-sm  flex items-center justify-center w-full h-12 text-gray-400 transition duration-300 select-none 
                    ${data.initialCategory === 'cityHeaven' ? 'bg-pink-500 text-white font-medium' : ''}
                    ${isRegisteredApiCredential ? "cursor-pointer" : "cursor-not-allowed"}
                  `}
                  >
                    シティヘブン診断
                  </label>
                </div>
              </div>
              <p className='text-slate-400 select-none pt-2'>
                シティヘブン診断のご利用には、シティヘブンAPIに関する資格情報が必要です。
                資格情報は
                <Link className="inline text-indigo-700 underline hover:text-indigo-400" href={"setting"}>
                  こちら
                </Link>
                から登録できます。
              </p>
            </div>
          </div>


          <div className="mt-3 flex justify-end">
            <button className="bg-indigo-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-indigo-600" disabled={processing}>
              作 成
            </button>
          </div>
        </form>
      </Modal >
    </>
  )
}

export default memo(CreateModal);