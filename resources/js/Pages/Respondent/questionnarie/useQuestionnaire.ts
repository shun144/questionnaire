import React, { useEffect, useState } from "react";
import { useRespondentStore } from "@/Pages/Respondent/store";
import {
    QuestionnarieType,
    DbQuestionType,
    DbResultType,
    DbEdgeType,
} from "@/Pages/Respondent/types";

const useQuestionnaire = (
    questions: string,
    results: string,
    edges: string,
    firstQuestionId: string
) => {
    const setQuestionnarieDatas = useRespondentStore(
        (state) => state.setQuestionnarieDatas
    );
    const setCurrentQuestionnarie = useRespondentStore(
        (state) => state.setCurrentQuestionnarie
    );

    const setFirstQuestionId = useRespondentStore(
        (state) => state.setFirstQuestionId
    );

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const parsedQuestions: DbQuestionType[] = JSON.parse(questions);
        const parsedResults: DbResultType[] = JSON.parse(results);
        const parsedEdges: DbEdgeType[] = JSON.parse(edges);

        const formattedQuestions: QuestionnarieType[] = parsedQuestions.map(
            (x) => {
                return {
                    id: x.id,
                    topic: x.data.topic,
                    choices: x.data.choices.map((choice) => {
                        return {
                            id: choice.id,
                            content: choice.content,
                            salesPoints: [],
                            nextId: parsedEdges.find(
                                (edge) => edge.sourceHandle === choice.id
                            )?.targetHandle,
                        };
                    }),
                    category: "question",
                };
            }
        );

        const formattedResults: QuestionnarieType[] = parsedResults.map((x) => {
            return {
                id: x.id,
                result: x.data.result,
                message: x.data.message,
                img: x.data.img,
                url: x.data.url,
                category: "result",
            };
        });
        setQuestionnarieDatas([...formattedQuestions, ...formattedResults]);
        setFirstQuestionId(firstQuestionId);
        setCurrentQuestionnarie(firstQuestionId);
        setIsLoading(false);
    }, []);

    return { isLoading };
};

export default useQuestionnaire;
