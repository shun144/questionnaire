import { memo } from "react";
import { Link } from "@inertiajs/react";
import { displayMenu } from "./BoardMenu";
type Props = {
    id: number;
    title: string;
    fullUrl: string;
};

const BoardItem = ({ id, title, fullUrl }: Props) => {
    return (
        <Link
            onContextMenu={(event) => displayMenu(event, id, title, fullUrl)}
            href={`flow/${id}`}
            as="button"
            type="button"
            className="w-56 h-40 rounded-md border shadow block bg-white overflow-hidden select-none focus:outline-none focus:none
            hover:opacity-70 transition duration-150"
        >
            <div className="w-full h-full flex flex-col gap-y-2">
                <div className="h-4/12 w-full bg-indigo-400 flex justify-start items-center overflow-auto">
                    <div className="px-2">
                        <div className="max-w-full max-h-full text-white">
                            {title}
                        </div>
                    </div>
                </div>
                <div className="grow w-full px-2">{title}</div>

                <div className="h-2/12 w-full bg-indigo-400 flex justify-start items-center overflow-auto">
                    <div className="px-2">
                        <div className="max-w-full max-h-full text-indigo-100 text-sm">
                            {fullUrl}
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="w-full h-full flex flex-col justify-center items-center">
                <div className="w-full h-5/6 ">
                    <div className="px-2 h-full flex flex-col justify-start  bg-indigo-400">
                        <p className="text-slate-700 text-lg break-all leading-tight text-start">
                            {title}
                        </p>
                    </div>
                </div>

                <div className="w-full h-1/6">
                    <p className="px-2 text-slate-400 text-[11px] break-all leading-tight text-start">
                        {fullUrl}
                    </p>
                </div>
            </div> */}
        </Link>
    );
};

export default memo(BoardItem);

// import { memo } from "react";
// import { Link } from "@inertiajs/react";
// import { displayMenu } from "./BoardMenu";
// type Props = {
//     id: number;
//     title: string;
//     fullUrl: string;
// };

// const BoardItem = ({ id, title, fullUrl }: Props) => {
//     return (
//         <Link
//             onContextMenu={(event) => displayMenu(event, id, title, fullUrl)}
//             href={`flow/${id}`}
//             as="button"
//             type="button"
//             className="w-56 h-40 rounded-lg shadow border inline-block bg-white overflow-hidden select-none hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all duration-300 py-2"
//         >
//             <div className="w-full h-full flex flex-col justify-center items-center">
//                 <div className="w-full h-5/6 pt-2">
//                     <div className="px-2 h-full flex flex-col justify-start">
//                         <p className="text-slate-700 text-lg break-all leading-tight text-start">
//                             {title}
//                         </p>
//                     </div>
//                 </div>

//                 <div className="w-full h-1/6">
//                     <p className="px-2 text-slate-400 text-[11px] break-all leading-tight text-start">
//                         {fullUrl}
//                     </p>
//                 </div>
//             </div>
//         </Link>
//     );
// };

// export default memo(BoardItem);
