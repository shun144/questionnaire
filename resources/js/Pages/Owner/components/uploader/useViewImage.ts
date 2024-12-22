import { useEffect, useState } from "react";
type Props = {
    imageData: File | string | undefined;
};

function isFile(file: unknown) {
    return file instanceof File;
}

export const useViewImage = ({ imageData }: Props) => {
    const [viewImage, setViewImage] = useState<string | undefined>(undefined);

    useEffect(() => {
        // Fileの場合はFileReaderを使ってbase64に変換
        if (isFile(imageData)) {
            let reader: FileReader | null = new FileReader();
            reader.onloadend = () => {
                // base64のimageUrlを生成する。
                const base64 = reader && reader.result;
                if (base64 && typeof base64 === "string") {
                    setViewImage(base64);
                }
            };
            reader.readAsDataURL(imageData);

            return () => {
                reader = null;
            };
        } else {
            // string（初期URL)の場合と、undefined（アップロード画像削除）はそのままセット
            setViewImage(imageData);
        }
    }, [imageData]);

    return viewImage;
};
