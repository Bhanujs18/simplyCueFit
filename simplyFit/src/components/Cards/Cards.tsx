import { useEffect, useState } from 'react';
import styles from './Cards.module.css';
import { Line } from 'rc-progress';
import { SlCalender } from "react-icons/sl";
import { updatePost } from '../../apis/post';

interface CardData {
    name: string;
    description: string;
    frequency: string;
    from: string;
    to: string;
    status: string;
    completed: string;
    duration: string;
    _id: string;
    tasks: string[]; // Add tasks to the data interface
}

interface CardsProps {
    data: CardData;
    setRefresh: (value: string) => void;
}

const Cards: React.FC<CardsProps> = ({ data, setRefresh }) => {
    const { name, description, frequency, from, to, status, completed, duration, _id, tasks } = data;

    const [bgColor, setBgColor] = useState<string>("Green");

    useEffect(() => {
        if (status === "Completed") {
            setBgColor("#5dbd4a");
        } else if (status === "Active") {
            setBgColor("#0d86d3");
        } else if (status === "Missed") {
            setBgColor("Red");
        } else {
            setBgColor("black");
        }
    }, [status]);

    const setcompleted = async (value: number) => {
        const updatedValue = value + parseInt(completed);
        const res = await updatePost({ _id, updatedValue, duration });
        if (res) {
            console.log(res);
            setRefresh(new Date().toISOString()); // Trigger a refresh by updating the timestamp
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.rightUpper}>
                <p id={styles.frequency}>{frequency}</p>
                <p style={{ background: `${bgColor}` }} id={styles.status}>{status}</p>
            </div>
            <h2 style={{height:'2.2rem'}}>{name.slice(0, 40)}</h2>
            <h2 id={styles.description}>{description}</h2>

            <h2 id={styles.tasks}>Tasks</h2>
            <ul className={styles.tasksList}>
                {tasks.map((task, index) => (
                    <li key={index} className={styles.taskItem}>
                        {task}
                    </li>
                ))}
            </ul>
            <p><SlCalender />&nbsp;From : {from}</p>
            <p><SlCalender />&nbsp;To : {to}</p>

            <p id={styles.completed}>Completed : {completed}<span style={{ color: `${bgColor}` }}>&nbsp;days</span></p>
            <p id={styles.daysDifference}>Duration : {duration} days</p>
            <Line percent={parseInt(completed) / parseInt(duration) * 100} strokeWidth={4} strokeColor="black" trailWidth={10} />
              
            <div id={styles.completed}>
                <div className={styles.inProgress} style={{ background: 'white' }}>
                    {status !== "Completed" &&
                    <div className={styles.today}>
                        <h2 style={{ color: 'black' }}>Today's?</h2>
                        <button onClick={() => setcompleted(1)}>Yes</button>
                        <button onClick={() => setcompleted(0)}>No</button>
                    </div>}
                </div>
            </div>  
        </div>
    );
}

export default Cards;
