// import { Head } from "@inertiajs/react";
// import { memo, useState } from "react";
// import NotFinished from "./components/NotFinished";
// // import Question from "./Question";
// import Result from "./Result";
// import { Header, Footer } from "@/Pages/Respondent/components/Index";
// import { useRespondentStore } from "@/Pages/Respondent/store";
// import useQuestionnaire from "./useQuestionnaire";
// import { AnimatePresence, motion } from "framer-motion";

// type Props = {
//     ownerName: string;
//     title: string;
//     questions: string;
//     results: string;
//     edges: string;
//     firstQuestionId: string;
// };

// const Question = ({ id }: { id: number }) => {
//     return (
//         <div style={{ padding: "20px", background: "lightblue" }}>
//             Question {id}
//         </div>
//     );
// };

// const Questionnaire = (props: Props) => {

//     const [currentQuestionId, setCurrentQuestionId] = useState(1);

//     // アニメーションのバリアント定義
//     const slideVariants = {
//         initial: { x: 300, opacity: 0 }, // 画面右から登場
//         animate: { x: 0, opacity: 1 }, // 中央に表示
//         exit: { x: -300, opacity: 0 }, // 左にスライドして退場
//     };

//     const nextQuestion = () => {
//         setCurrentQuestionId((prev) => prev + 1); // 次の質問に進む
//     };

//     return (
//         <div>
//             <Head title="アンケート" />

//             <div className="w-screen min-h-screen h-screen flex flex-col md:overflow-x-hidden bg-red-200">
//                 <div className=" relative w-48 h-96">
//                     <AnimatePresence mode="wait">
//                         <motion.div
//                             key={currentQuestionId} // keyが変更されるたびにアニメーションが発火
//                             variants={slideVariants}
//                             initial="initial"
//                             animate="animate"
//                             exit="exit"
//                             transition={{ duration: 0.5 }}
//                             style={{
//                                 position: "absolute",
//                                 width: "100%",
//                                 height: "500px",
//                             }}
//                         >
//                             <Question id={currentQuestionId} />
//                         </motion.div>
//                     </AnimatePresence>
//                     <button
//                         onClick={nextQuestion}
//                         className="absolute bottom-0 right-0 bg-blue-500 text-white p-2"
//                     >
//                         Next Question
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default memo(Questionnaire);

import { Head } from "@inertiajs/react";
import { memo } from "react";
import NotFinished from "./components/NotFinished";
import Question from "./Question";
import Result from "./Result";
import { Header, Footer } from "@/Pages/Respondent/components/Index";
import { useRespondentStore } from "@/Pages/Respondent/store";
import useQuestionnaire from "./useQuestionnaire";
import { AnimatePresence } from "framer-motion";

type Props = {
    ownerName: string;
    title: string;
    questions: string;
    results: string;
    edges: string;
    firstQuestionId: string;
};

const Questionnaire = (props: Props) => {
    const currentQuestionnarie = useRespondentStore(
        (state) => state.currentQuestionnarie
    );

    const { isLoading } = useQuestionnaire(
        props.questions,
        props.results,
        props.edges,
        props.firstQuestionId
    );

    return (
        <>
            <Head title="アンケート" />

            <div className="w-screen min-h-screen h-screen flex flex-col md:overflow-x-hidden">
                <Header title={props.title} />

                <div className=" bg-slate-100 grow basis-1/2 overflow-hidden ">
                    {!isLoading && (
                        <>
                            {currentQuestionnarie.category === "question" && (
                                <Question />
                            )}

                            {currentQuestionnarie.category === "result" && (
                                <Result />
                            )}
                            {currentQuestionnarie.category === "none" && (
                                <NotFinished />
                            )}
                        </>
                    )}
                </div>

                <Footer ownerName={props.ownerName} />
            </div>
        </>
    );
};

export default memo(Questionnaire);
