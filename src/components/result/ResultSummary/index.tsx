import styles from "./index.module.scss";
import { IQuiz, IAnswerQuiz } from "../../../lib/types/quiz";

interface IResultSummary {
    quizList: IQuiz[];
    answerDetails: IAnswerQuiz[];
}
const ResultSummary = (props: IResultSummary) => {
    const { quizList, answerDetails } = props;
    const totalQuestions = quizList?.length;
    let attempted = 0;
    let correct = 0;
    let incorrect = 0;
    quizList?.forEach((item) => {
        const findAnswer = answerDetails?.find(
            (answerDetailsItem) => answerDetailsItem.quiz.question === item.question
        );
        const isAnswered = !!findAnswer?.answer;
        const isAttempted = findAnswer?.isVisited;
        if (isAnswered) {
            const isCorrect = findAnswer?.answer === item.correct_answer;
            if (isCorrect) {
                correct++;
            } else {
                incorrect++;
            }
        }
        if (isAttempted) {
            attempted++;
        }
    });

    return (
        <div className={styles.resultSummary}>
            <p>Total Number of Questions: {totalQuestions}</p>
            <p>Total Attempted Questions: {attempted}</p>
            <p>Total Correct Answer: {correct}</p>
            <p>Total Incorrect Answer: {incorrect}</p>
            <p>Non Attempted Questions: {totalQuestions - attempted}</p>
            <p>Point: {correct * 1.5}</p>
        </div>
    );
};

export default ResultSummary;
