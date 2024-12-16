import React, {
    FormEventHandler,
    memo,
    useRef,
    useState,
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useEffect,
} from "react";
import { Head, usePage, Link, useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    // isRegisteredApiCredential: boolean;
};

const TermsModal = ({ isOpen, setIsOpen }: Props) => {
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
    const scrollableDivRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (scrollableDivRef.current) {
                const element = scrollableDivRef.current;

                const scrolledToBottom =
                    element.scrollTop + element.clientHeight >=
                    element.scrollHeight;
                console.log(scrolledToBottom);

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
        <Modal show={isOpen} onClose={() => setIsOpen(false)} maxWidth="2xl">
            <div className="h-[800px] max-h-[800px]  px-2 pt-5 pb-10">
                <div className="w-full flex flex-col justify-center items-center gap-y-6 h-full ">
                    <div className="text-3xl">利用規約</div>

                    <div
                        ref={scrollableDivRef}
                        className="w-11/12 border border-slate-200 rounded overflow-y-auto"
                    >
                        <div className="h-[900px]">aaa</div>
                    </div>

                    <div className="w-full flex justify-center items-center">
                        <button
                            className={`border rounded px-2 py-2 text-white ${
                                isScrolledToBottom ? "bg-indigo-400" : ""
                            }`}
                            disabled={!isScrolledToBottom}
                        >
                            利用規約に同意する
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default memo(TermsModal);
