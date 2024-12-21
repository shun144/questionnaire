import {
    useRef,
    memo,
    useState,
    useCallback,
    ChangeEvent,
    MouseEvent,
} from "react";
import { useGetImageUrl } from "./useGetImageUrl";
import { useOwnerStore } from "@/Pages/Owner/store";

type Props = {
    imgId: string;
    onUpdateImage: (val: string) => void;
};

const ImageUploader = ({ imgId, onUpdateImage }: Props) => {
    const addImage = useOwnerStore((state) => state.addImage);
    const delImage = useOwnerStore((state) => state.delImage);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { imageUrl } = useGetImageUrl({ file: imageFile });

    // const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     const target = event.currentTarget;
    //     if (!target || !target.files) return;
    //     setImageFile(target.files[0]);
    //     addImage(target.files[0]);
    //     onUpdateImage(imgId);
    // };

    const handleFileChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const target = event.currentTarget;
            if (!target || !target.files) return;
            setImageFile(target.files[0]);
            addImage({ id: imgId, imageFile: target.files[0] });
            onUpdateImage(imgId);
        },
        []
    );

    const handleCancelImage = useCallback(
        (event: MouseEvent<HTMLImageElement>) => {
            event.preventDefault();
            setImageFile(null);
            delImage(imgId);
            onUpdateImage("");
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        },
        []
    );

    return (
        <>
            <label
                className="w-full h-32 border border-dashed bg-slate-900  border-slate-300 rounded-md flex justify-center items-center overflow-hidden cursor-pointer"
                htmlFor={imgId}
            >
                {imageUrl && imageFile ? (
                    <img
                        className="w-full h-full object-scale-down"
                        src={imageUrl}
                        alt="アップロード画像"
                        onClick={handleCancelImage}
                    />
                ) : (
                    <>
                        <span className="text-slate-500">
                            画像をアップロード
                        </span>
                        <input
                            ref={fileInputRef}
                            id={imgId}
                            type="file"
                            accept="image/jpeg, image/png"
                            onChange={handleFileChange}
                            hidden
                        />
                    </>
                )}
            </label>
        </>
    );
};

export default memo(ImageUploader);
