import { Toaster, ToastPosition, toast } from 'react-hot-toast';

type Props = {
  position?: ToastPosition;
  duration?: number;
}

const CustomToaster = ({ position = "bottom-right", duration = 3000 }: Props) => {
  return (
    <Toaster
      position={position}
      reverseOrder={false}
      toastOptions={{
        duration,
        style: {
          maxWidth: '400px', // 最大幅を設定
          whiteSpace: 'pre-wrap', // 空白と改行をそのまま表示
          wordBreak: 'break-all', // 単語を折り返す
        },
      }}
    />
  );
};

export { CustomToaster, toast };

