"use client";
import React, { useEffect, useState } from "react";
import QuizList from "../QuizList";
import { Container, Row, Col, Button } from "react-bootstrap";
import SelectedQuiz from "../SelectedQuiz";
import { useRouter } from "next/navigation";
import styles from "./index.module.scss";
import Timer from "../Timer";
import { IQuiz, IAnswerQuiz } from "../../../lib/types/quiz";

interface IQuizHandler {
    quizList: IQuiz[];
}

const QuizHandler = (props: IQuizHandler) => {
    const { quizList } = props;
    const [selected, setSelected] = useState(quizList[0]);
    const [selectedAnswer, setSelectedAnswer] = useState<IAnswerQuiz[]>([]);
    const initialTime = 30 * 60;
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const router = useRouter();
    const findSelected = {
        selectedQuiz: {},
        index: -1,
    };

    selectedAnswer.forEach((item, index) => {
        if (item?.quiz?.question === selected?.question) {
            findSelected.selectedQuiz = item;
            findSelected.index = index;
        }
    });

    const handleSubmit = () => {
        sessionStorage.setItem("answerDetails", JSON.stringify(selectedAnswer));
        router.push("/result");
    };

    useEffect(() => {
        if (timeLeft == 0) {
            handleSubmit();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeLeft]);

    return (
        <Container>
            <Row>
                <Col xs={2} className={styles.quizHandler}>
                    <QuizList
                        list={quizList}
                        setSelected={setSelected}
                        findSelected={findSelected}
                        selectedAnswer={selectedAnswer}
                        setSelectedAnswer={setSelectedAnswer}
                    />
                </Col>
                <Col xs={10}>
                    <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
                    <SelectedQuiz
                        quiz={selected}
                        findSelected={findSelected}
                        selectedAnswer={selectedAnswer}
                        setSelectedAnswer={setSelectedAnswer}
                    />
                    <Button
                        className={styles.submitBtn}
                        variant="success"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default QuizHandler;
