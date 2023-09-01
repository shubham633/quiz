"use client"
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { IAnswerQuiz, IQuiz } from "@/src/lib/types/quiz";
import ResultSummary from "@/src/components/result/ResultSummary";
import Result from "@/src/components/result/Result";

interface IResultContainer {
    quizList: IQuiz[]
}
const ResultContainer = (props: IResultContainer) => {
    const { quizList } = props
    const [answerDetails, setAnserDetails] = useState<IAnswerQuiz[]>([]);
    const [isLoaded, setIsLoaded] = useState(true);


    useEffect(() => {
        const getanswer = sessionStorage.getItem("answerDetails");
        getanswer && setAnserDetails(JSON.parse(getanswer));
        setIsLoaded(false);
    }, []);

    return (
        <Container>
            {isLoaded ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h1>Results View</h1>
                    <h6>Summary</h6>
                    <ResultSummary
                        answerDetails={answerDetails}
                        quizList={quizList}
                    />
                    <Result answerDetails={answerDetails} quizList={quizList} />
                </>
            )}
        </Container>
    );
};

export default ResultContainer;
