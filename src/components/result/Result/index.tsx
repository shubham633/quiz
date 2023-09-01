import { IQuiz, IAnswerQuiz } from "../../../lib/types/quiz";
import styles from "./index.module.scss";

interface IResult {
    quizList: IQuiz[];
    answerDetails: IAnswerQuiz[];
}
const Result = (props: IResult) => {
    const { answerDetails, quizList } = props;

    return (
        <ul className={styles.result}>
            {quizList?.map((item, index) => {
                const findAnswer = answerDetails?.find(
                    (answerDetailsItem) =>
                        answerDetailsItem.quiz.question === item.question
                );
                const isAnswered = !!findAnswer?.answer;
                const isAttempted = findAnswer?.isVisited;
                const isCorrect = findAnswer?.answer === item.correct_answer;
                const allAnswer = [
                    ...(item.incorrect_answers || []),
                    item.correct_answer,
                ];

                return (
                    <li key={item.question}>
                        <h6>
                            <span>{index + 1}.</span>
                            {item?.question?.replaceAll("&quot;", `"`)}
                        </h6>
                        <ul>
                            {allAnswer.map((allAnswerItem, index) => (
                                <li
                                    key={index}
                                    className={
                                        item.correct_answer === allAnswerItem ? styles.correct : ""
                                    }
                                >
                                    {allAnswerItem} <b>Correct Answer</b>
                                </li>
                            ))}
                        </ul>
                        {isAnswered ? (
                            <>
                                <p>
                                    Your answer{" "}
                                    <span
                                        className={isCorrect ? styles.correct : styles.inCorrect}
                                    >
                                        {findAnswer?.answer}
                                    </span>
                                </p>
                                <p>
                                    Point{" "}
                                    <span
                                        className={isCorrect ? styles.correct : styles.inCorrect}
                                    >
                                        {isCorrect ? "1.5" : 0}
                                    </span>{" "}
                                </p>
                            </>
                        ) : (
                            <p
                                className={isAttempted ? styles.attempted : styles.notAttempted}
                            >
                                {isAttempted ? "Attempted" : "Not Attempted"}
                            </p>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

export default Result;
