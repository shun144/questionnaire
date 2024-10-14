import React, { useState } from 'react';

interface ImageForm {
  id: number;
  file: File | null;
  previewUrl: string | null;
}

const ImageUpload: React.FC = () => {
  const [imageForms, setImageForms] = useState<ImageForm[]>([{ id: Date.now(), file: null, previewUrl: null }]);

  const handleImageChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const newForms = imageForms.map(form => {
        if (form.id === id) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImageForms(currentForms =>
              currentForms.map(f => f.id === id ? { ...f, previewUrl: reader.result as string } : f)
            );
          };
          reader.readAsDataURL(file);
          return { ...form, file };
        }
        return form;
      });
      setImageForms(newForms);
    }
  };

  const handleAddForm = () => {
    setImageForms([...imageForms, { id: Date.now(), file: null, previewUrl: null }]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    imageForms.forEach(form => {
      if (form.file) {
        formData.append('images[]', form.file);
      }
    });

    await fetch('/upload', {
      method: 'POST',
      body: formData,
    });

    // 必要に応じて、アップロード後の処理を追加
  };

  return (
    <div>
      {imageForms.map(form => (
        <div key={form.id}>
          <input type="file" onChange={(e) => handleImageChange(form.id, e)} />
          {form.previewUrl && <img src={form.previewUrl} alt="Preview" style={{ width: '100px' }} />}
        </div>
      ))}
      <button onClick={handleAddForm}>フォームを追加</button>
      <div>
        <button onClick={handleSubmit} disabled={imageForms.every(form => !form.file)}>保存</button>
      </div>

      {imageForms.every(form => !form.file) && <div>test</div>}
    </div>
  );
};

export default ImageUpload;
