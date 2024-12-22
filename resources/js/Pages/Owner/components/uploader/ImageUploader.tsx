import { memo, useState, ChangeEvent, MouseEvent, useMemo } from "react";
import { useViewImage } from "./useViewImage";
import { useOwnerStore } from "@/Pages/Owner/store";
import { usePage } from "@inertiajs/react";
import { useReactFlow } from "@xyflow/react";

type Props = {
    nodeId: string;
    initImgUrl?: string;
};

const ImageUploader = ({ nodeId, initImgUrl }: Props) => {
    const { props } = usePage();
    const userId = props.auth.user.id;
    const { updateNodeData } = useReactFlow();
    const BASE_URL = useMemo(() => import.meta.env.VITE_BASE_URL, []);
    const IMG_ID = useMemo(() => `img-${nodeId}`, []);

    const addImage = useOwnerStore((state) => state.addImage);
    const delImage = useOwnerStore((state) => state.delImage);
    const [imageData, setimageData] = useState<File | string | undefined>(
        initImgUrl
    );

    const viewImage = useViewImage({ imageData });

    const handelUpdateImgUrl = (val: string) => {
        updateNodeData(nodeId, { img: val });
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.currentTarget;
        if (!target || !target.files) return;

        const targetFile = target.files[0];
        setimageData(targetFile);
        addImage({ nodeId, file: targetFile });
        const fileExt = targetFile.name.split(".").pop();
        const savedImageUrl = `${BASE_URL}/storage/user_${userId}/images/${nodeId}.${fileExt}`;
        handelUpdateImgUrl(savedImageUrl);
    };

    const handleCancelImage = (event: MouseEvent<HTMLImageElement>) => {
        if (!confirm("画像を削除しますか？")) return;
        event.preventDefault();
        setimageData(undefined);
        delImage(nodeId);
        handelUpdateImgUrl("");
    };

    return (
        <label
            className="w-full h-32 border border-dashed bg-slate-900  border-slate-300 rounded-md flex justify-center items-center overflow-hidden cursor-pointer"
            htmlFor={IMG_ID}
        >
            {viewImage ? (
                <img
                    className="w-full h-full object-scale-down"
                    src={viewImage}
                    alt="アップロード画像"
                    onClick={handleCancelImage}
                />
            ) : (
                <>
                    <span className="text-slate-500">画像をアップロード</span>
                    <input
                        id={IMG_ID}
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={handleFileChange}
                        hidden
                    />
                </>
            )}
        </label>
    );
};

export default memo(ImageUploader);

// import {
//     useRef,
//     memo,
//     useState,
//     ChangeEvent,
//     MouseEvent,
//     useMemo,
//     useEffect,
// } from "react";
// import { useGetImageUrl } from "./useGetImageUrl";
// import { useOwnerStore } from "@/Pages/Owner/store";
// import { usePage } from "@inertiajs/react";
// import { useReactFlow } from "@xyflow/react";

// type Props = {
//     nodeId: string;
//     initImgUrl?: string;
// };

// const ImageUploader = ({ nodeId, initImgUrl }: Props) => {
//     const { props } = usePage();
//     const userId = props.auth.user.id;
//     const { updateNodeData, getNode } = useReactFlow();
//     const BASE_URL = useMemo(() => import.meta.env.VITE_BASE_URL, []);
//     const IMG_ID = useMemo(() => `img-${nodeId}`, []);

//     const addImage = useOwnerStore((state) => state.addImage);
//     const delImage = useOwnerStore((state) => state.delImage);
//     const [imageFile, setImageFile] = useState<File | null>(null);

//     const { imageUrl } = useGetImageUrl({
//         file: imageFile,
//         // initUrl: initImgUrl,
//     });

//     const fileInputRef = useRef<HTMLInputElement>(null);

//     const handelUpdateImgUrl = (val: string) => {
//         updateNodeData(nodeId, { img: val });
//     };

//     const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//         const target = event.currentTarget;
//         if (!target || !target.files) return;

//         const targetFile = target.files[0];
//         setImageFile(targetFile);
//         addImage({ nodeId, file: targetFile });
//         const fileExt = targetFile.name.split(".").pop();
//         const savedImageUrl = `${BASE_URL}/storage/user_${userId}/images/${nodeId}.${fileExt}`;
//         handelUpdateImgUrl(savedImageUrl);
//     };

//     const handleCancelImage = (event: MouseEvent<HTMLImageElement>) => {
//         if (!confirm("画像を削除しますか？")) return;
//         event.preventDefault();
//         setImageFile(null);
//         delImage(nodeId);
//         handelUpdateImgUrl("");
//         if (fileInputRef.current) {
//             fileInputRef.current.value = "";
//         }
//     };

//     return (
//         <label
//             className="w-full h-32 border border-dashed bg-slate-900  border-slate-300 rounded-md flex justify-center items-center overflow-hidden cursor-pointer"
//             htmlFor={IMG_ID}
//         >
//             {imageUrl ? (
//                 <img
//                     className="w-full h-full object-scale-down"
//                     src={imageUrl}
//                     alt="アップロード画像"
//                     onClick={handleCancelImage}
//                 />
//             ) : (
//                 <>
//                     <span className="text-slate-500">画像をアップロード</span>
//                     <input
//                         ref={fileInputRef}
//                         id={IMG_ID}
//                         type="file"
//                         accept="image/jpeg, image/png"
//                         onChange={handleFileChange}
//                         hidden
//                     />
//                 </>
//             )}
//         </label>
//     );
// };

// export default memo(ImageUploader);
