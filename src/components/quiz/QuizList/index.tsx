import { Dispatch, SetStateAction } from "react";
import { IQuiz, IAnswerQuiz } from "../../../lib/types/quiz";
import styles from "./index.module.scss";

interface IQuizList {
    list: IQuiz[];
    setSelected: (val: IQuiz) => void;
    findSelected: {
        selectedQuiz: {
            quiz?: IQuiz;
        };
    };
    selectedAnswer: IAnswerQuiz[];
    setSelectedAnswer: Dispatch<SetStateAction<IAnswerQuiz[]>>;
}
const QuizList = (props: IQuizList) => {
    const {
        list,
        setSelected,
        findSelected,
        selectedAnswer,
        setSelectedAnswer = () => null,
    } = props;

    const handleListSelection = (item: IQuiz) => {
        setSelected(item);
        const isFind = selectedAnswer?.some(
            (answerItem) => item?.question == answerItem?.quiz?.question
        );
        if (!isFind) {
            setSelectedAnswer((prev: any) => [
                ...prev,
                { quiz: item, isVisited: true },
            ]);
        }
    };

    const handleClassName = (item: IQuiz) => {
        const findItem = selectedAnswer?.find(
            (answerItem) => item?.question == answerItem?.quiz?.question
        );
        return item?.question === findSelected?.selectedQuiz?.quiz?.question
            ? styles.selected
            : findItem?.answer
                ? styles.attempted
                : findItem?.isVisited
                    ? styles.visited
                    : "";
    };

    return (
        <ul className={styles.quizList}>
            {list?.map((item, index) => (
                <li key={index}>
                    <button
                        className={handleClassName(item)}
                        onClick={() => handleListSelection(item)}
                    >
                        {index + 1}
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default QuizList;
