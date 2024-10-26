import { forwardRef, useEffect, useImperativeHandle, useRef, InputHTMLAttributes, useState } from 'react';

export default forwardRef(function PasswordInput(
    { type = 'password', className = '', isFocused = false, ...props }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean },
    ref
) {
    const [isRevealPassword, setIsRevealPassword] = useState(false);
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={isRevealPassword ? 'text' : 'password'}
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className
            }
            ref={localRef}
        />
    );
});
