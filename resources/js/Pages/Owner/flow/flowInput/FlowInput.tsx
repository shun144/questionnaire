import { memo } from "react";
import "react-tooltip/dist/react-tooltip.css";
import FlowTitleInput from "./FlowTitleInput";
import FlowUrlInput from "./FlowUrlInput";

const FlowInput = () => {
    return (
        <div className="w-full flex flex-col justify-center items-start gap-y-2">
            <div className="w-full flex flex-col items-center">
                <FlowTitleInput />
            </div>

            <div className="w-full flex flex-col items-center">
                <FlowUrlInput />
            </div>
        </div>
    );
};

export default memo(FlowInput);
