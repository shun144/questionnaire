import { useEffect, useState } from 'react'

type Props = {
  value: string;
  handleChange: (value: string) => void;
  debounce?: number;
  className: string;
  placeholder: string;
}

const DebouncedInput = ({ value: initValue, handleChange, debounce = 500, ...props }: Props) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleChange(value)
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);


  return (
    <input {...props} value={value} onChange={(e) => setValue(e.currentTarget.value)} />
  )
}

export default DebouncedInput