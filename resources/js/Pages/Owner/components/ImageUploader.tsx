import { useRef, memo, useState, useCallback, ChangeEvent, MouseEvent } from "react";
// import InputImage from "./InputImage";
import { useGetImageUrl } from "./useGetImageUrl";

const IMAGE_ID = "imageId";
const ImageUploader = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { imageUrl } = useGetImageUrl({ file: imageFile });

  const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    if (!target || !target.files) {
      return;
    }
    setImageFile(target.files[0]);
  }, []);


  const handleCancelImage = useCallback((event: MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  return (
    <>
      <label
        className="w-full h-10 border border-dashed border-slate-300 rounded-md flex justify-center items-center overflow-hidden cursor-pointer"
        htmlFor={IMAGE_ID}
      >
        {imageUrl && imageFile ? (
          <img
            className="w-full h-full object-cover"
            src={imageUrl}
            alt="アップロード画像"
            onClick={handleCancelImage}
          />
        ) : (
          <>
            <span>+ 画像をアップロード</span>
            <input ref={fileInputRef} id={IMAGE_ID}
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
}

export default memo(ImageUploader);