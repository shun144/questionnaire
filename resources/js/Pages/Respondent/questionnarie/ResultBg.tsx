import { memo } from "react";

const StandardResultBg = () => {
    return (
        <>
            <div
                className="animate-slide top-0 bottom-0 -left-1/2 -right-1/2 opacity-50 absolute"
                style={{
                    backgroundImage:
                        "linear-gradient(-60deg, #f3e8ff 50%, #ddd6fe 50%)",
                    animationDuration: "83s",
                }}
            ></div>

            <div
                className="placeholder:animate-slide top-0 bottom-0 -left-1/2 -right-1/2 opacity-50 absolute"
                style={{
                    backgroundImage:
                        "linear-gradient(-65deg, #f3e8ff 50%, #ddd6fe 50%)",
                    animationDirection: "alternate-reverse",
                    animationDuration: "54s",
                }}
            ></div>

            <div
                className="animate-slide top-0 bottom-0 -left-1/2 -right-1/2 opacity-50 absolute"
                style={{
                    backgroundImage:
                        "linear-gradient(-76deg, #f3e8ff 50%, #ddd6fe 50%)",
                    animationDuration: "78s",
                }}
            ></div>
        </>
    );
};

export default memo(StandardResultBg);
