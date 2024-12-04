import React, { FormEventHandler, memo, useRef, useState, ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react'
import { Head, usePage, Link, useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  // isRegisteredApiCredential: boolean;
}

const TermsModal = ({ isOpen, setIsOpen }: Props) => {


  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const scrollableDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollableDivRef.current) {
        const element = scrollableDivRef.current;

        const scrolledToBottom = element.scrollTop + element.clientHeight >= element.scrollHeight;
        console.log(scrolledToBottom)


        setIsScrolledToBottom(scrolledToBottom);
      }
    };

    const scrollableDiv = scrollableDivRef.current;
    if (scrollableDiv) {
      scrollableDiv.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollableDiv) {
        scrollableDiv.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <Modal show={isOpen} onClose={() => setIsOpen(false)} maxWidth='2xl'>
      <div className='h-[800px] max-h-[800px]  px-2 pt-5 pb-10'>

        <div className="w-full flex flex-col justify-center items-center gap-y-6 h-full ">
          <div className='text-3xl'>利用規約</div>

          <div
            ref={scrollableDivRef}
            className='w-11/12 border border-slate-200 rounded overflow-y-auto'>
            <div className='h-[900px]'>
              aaa
            </div>

          </div>

          <div className='w-full flex justify-center items-center'>
            <button
              className={`border rounded px-2 py-2 text-white ${isScrolledToBottom ? "bg-indigo-400" : ""}`}
              disabled={!isScrolledToBottom}>
              利用規約に同意する
            </button>
          </div>
        </div>

      </div>
    </Modal>
  )

  // const { data, setData, post, processing, reset, errors, clearErrors
  // } = useForm({
  //   initialTitle: '',
  //   initialUrl: '',
  //   initialCategory: 'standard',
  // });

  // const createFlow: FormEventHandler = (e) => {
  //   e.preventDefault();

  //   post(route('flow.create'), {
  //     preserveScroll: true,
  //     onSuccess: () => closeModal(),
  //     onFinish: () => reset(),
  //   });
  // };

  // const closeModal = () => {
  //   setIsOpenModal(false);
  // }


  // return (
  //   <>
  //     <Modal show={isOpenModal} onClose={closeModal}>
  //       <form onSubmit={createFlow} className="p-6">

  //         <div className="mt-6">
  //           <InputLabel htmlFor="initialTitle" value={`診断タイトル（${titleMaxLength}文字）`} />

  //           <TextInput
  //             id="initialTitle"
  //             type="text"
  //             name="initialTitle"
  //             value={data.initialTitle}
  //             onChange={(e) => setData('initialTitle', e.target.value)}
  //             className="mt-1 block w-11/12 placeholder-slate-300"
  //             placeholder="タイトル"
  //             required
  //             maxLength={titleMaxLength}
  //           />
  //           <InputError message={errors.initialTitle} className="mt-2" />
  //         </div>

  //         <div className="mt-10">
  //           <InputLabel htmlFor="initialUrl" value={`診断URL名（${urlMaxLength}文字）`} />

  //           <TextInput
  //             id="initialUrl"
  //             type="text"
  //             name="initialUrl"
  //             value={data.initialUrl}
  //             onChange={(e) => setData('initialUrl', e.target.value)}
  //             className="mt-1 block w-11/12 placeholder-slate-300"
  //             placeholder="URL"
  //             required
  //             maxLength={urlMaxLength}
  //           />
  //           <InputError message={errors.initialUrl} className="mt-2" />
  //         </div>

  //         <input type="hidden" name="category" value="standard" />

  //         <div className="mt-12 flex justify-start">
  //           <button className="bg-indigo-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-indigo-600" disabled={processing}>
  //             作 成
  //           </button>
  //         </div>
  //       </form>
  //     </Modal >
  //   </>
  // )
}

export default memo(TermsModal);