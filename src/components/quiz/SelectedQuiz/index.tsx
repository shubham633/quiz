import { Dispatch, SetStateAction } from "react";
import { IQuiz, IAnswerQuiz } from "../../../lib/types/quiz";
import styles from "./index.module.scss";

interface ISelectedQuiz {
    quiz: IQuiz;
    selectedAnswer: IAnswerQuiz[];
    setSelectedAnswer: Dispatch<SetStateAction<IAnswerQuiz[]>>;
    findSelected: {
        selectedQuiz: {
            quiz?: IQuiz;
            answer?: string;
        };
        index: number;
    };
}
const SelectedQuiz = (props: ISelectedQuiz) => {
    const { quiz, selectedAnswer, setSelectedAnswer, findSelected } = props;
    const {
        category,
        type,
        difficulty,
        question,
        correct_answer,
        incorrect_answers,
    } = quiz || {};

    const allAnswer = [...(incorrect_answers || []), correct_answer];

    const handleAnswer = (answer: string) => {
        if (!!findSelected) {
            const temp = [...selectedAnswer];
            temp[findSelected.index] = {
                ...temp[findSelected.index],
                answer: answer,
            };
            setSelectedAnswer(temp);
        } else {
            setSelectedAnswer((prev: any) => [...prev, { quiz, answer: answer }]);
        }
    };

    return (
        <div className={styles.selectedQuiz}>
            <h4>{quiz?.question?.replaceAll("&quot;", `"`)}</h4>
            <ul>
                {allAnswer?.map((val, index) => (
                    <li
                        key={index}
                        className={
                            findSelected?.selectedQuiz?.answer === val
                                ? styles.selected
                                : "btn-success"
                        }
                        onClick={() => handleAnswer(val)}
                    >
                        {val}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SelectedQuiz;
