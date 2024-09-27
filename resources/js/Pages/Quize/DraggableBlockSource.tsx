type Props = {
  isDragging?: boolean;
  label: string;
};

export const DraggableBlockSource = ({ isDragging, label }: Props) => {
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded shadow dark:bg-gray-800 dark:border-gray-700 text-center select-none"
      style={{
        cursor: isDragging ? "grabbing" : "grab",
        opacity: isDragging ? 0.5 : undefined,
      }}>
      {label}
    </div >
  );
};

