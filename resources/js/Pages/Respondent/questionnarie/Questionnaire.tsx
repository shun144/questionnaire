import { Head } from "@inertiajs/react";
import { memo } from "react";
import NotFinished from "./components/NotFinished";
import Question from "./Question";
import Result from "./Result";
import { Header, Footer } from "@/Pages/Respondent/components/Index";
import { useRespondentStore } from "@/Pages/Respondent/store";
import useQuestionnaire from "./useQuestionnaire";

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
