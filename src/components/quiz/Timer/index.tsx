import { Dispatch, SetStateAction, useEffect } from "react";
import styles from "./index.module.scss";

interface ITimer {
    timeLeft: number;
    setTimeLeft: Dispatch<SetStateAction<number>>;
}
const Timer = (props: ITimer) => {
    const { timeLeft, setTimeLeft = () => null } = props;

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime: number) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
        return () => {
            clearInterval(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    return <p className={styles.timer}>{formatTime(timeLeft)}</p>;
};

export default Timer;
