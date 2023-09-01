
import ResultContainer from "@/src/components/result/ResultContainer";

const Results = async () => {

    const res = await fetch("https://opentdb.com/api.php?amount=15");
    const response = await res.json()


    return (
        <ResultContainer quizList={response?.results} />
    );
};

export default Results;
