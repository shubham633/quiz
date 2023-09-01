import QuizHandler from "@/src/components/quiz/QuizHandler";

const Quiz = async () => {
    const res = await fetch("https://opentdb.com/api.php?amount=15");
    const response = await res.json()

    return <QuizHandler quizList={response?.results} />;
};

export default Quiz;
