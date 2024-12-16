import { Dispatch, SetStateAction, memo } from "react";
import { motion, type Transition, type Variants } from "framer-motion";

interface Props {
    d?: string;
    variants?: Variants;
    transition?: Transition;
}

const MotionPath = (props: Props) => (
    <motion.path
        fill="transparent"
        strokeWidth="3"
        stroke="white"
        strokeLinecap="round"
        {...props}
    />
);

interface ToggleProps {
    toggle: Dispatch<SetStateAction<boolean>>;
}

const Toggle = ({ toggle }: ToggleProps) => (
    <button
        className="absolute top-0 left-0 w-[46px] h-[46px] cursor-pointer border-none outline-none bg-transparent"
        onClick={() => toggle((prev) => !prev)}
    >
        <div className="flex justify-center items-center">
            <svg width="23" height="23" viewBox="0 0 23 23">
                <MotionPath
                    variants={{
                        closed: { d: "M 2 2.5 L 20 2.5" },
                        open: { d: "M 3 16.5 L 17 2.5" },
                    }}
                />
                <MotionPath
                    d="M 2 9.423 L 20 9.423"
                    variants={{
                        closed: { opacity: 1 },
                        open: { opacity: 0 },
                    }}
                    transition={{ duration: 0.1 }}
                />
                <MotionPath
                    variants={{
                        closed: { d: "M 2 16.346 L 20 16.346" },
                        open: { d: "M 3 2.5 L 17 16.346" },
                    }}
                />
            </svg>
        </div>
    </button>
);

export default memo(Toggle);
