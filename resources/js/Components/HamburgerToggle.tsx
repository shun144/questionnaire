import { memo, Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { tv } from "tailwind-variants";

type Props = {
    className: string;
    isOpen: boolean;
};

const spanTv = tv({
    base: "block w-full h-0.5 bg-slate-500 group-hover:bg-slate-400 transiton duration-200",
});

const HamburgerToggle = ({ className, isOpen }: Props) => {
    return (
        <div
            className={`flex flex-col justify-between items-center relative ${className}`}
        >
            <motion.span
                initial={false}
                animate={{
                    y: isOpen ? "5px" : 0,
                    rotate: isOpen ? "-315deg" : 0,
                }}
                transition={{
                    duration: 0.1,
                }}
                className={spanTv()}
            ></motion.span>
            <motion.span
                initial={false}
                animate={{
                    opacity: isOpen ? 0 : 1,
                }}
                transition={{
                    duration: 0.05,
                }}
                className={spanTv()}
            ></motion.span>
            <motion.span
                initial={false}
                animate={{
                    y: isOpen ? "-5px" : 0,
                    rotate: isOpen ? "135deg" : 0,
                }}
                transition={{
                    duration: 0.05,
                }}
                className={spanTv()}
            ></motion.span>
        </div>
    );
};

export default memo(HamburgerToggle);
