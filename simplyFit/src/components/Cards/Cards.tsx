import { useEffect, useState } from 'react';
import styles from './Cards.module.css';
import { Line } from 'rc-progress';
import { SlCalender } from "react-icons/sl";

const Cards = (props: any) => {
    const { name, description, frequency, startDate, endDate, status, Completed, id } = props.data;
    const localStorageData:any = localStorage.getItem('simplyFit');
    const currentData = JSON.parse(localStorageData);

    const [bgColor, setBgColor] = useState("Green");
    const [daysDifference, setDaysDifference] = useState<number | null>(null);
    const [comp , setComp] = useState<number>(0);
    const [taskDone , setTaskDone] = useState(false)
    const [isCompleted , setIsCompleted] = useState("InProgress");
    useEffect(() => {
        // Set background color based on status
        if (status === "Completed") {
            setBgColor("#5dbd4a");
        } else if (status === "Active") {
            setBgColor("#0d86d3");
        } else if (status === "Missed") {
            setBgColor("Red");
        } else {
            setBgColor("black");
        }

        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const differenceInTime = end.getTime() - start.getTime();
            const differenceInDays = differenceInTime / (1000 * 3600 * 24); // Convert from milliseconds to days
            setDaysDifference(Math.round(differenceInDays));
        }
    }, [status, startDate, endDate]);

    const updateCompleted = (num:number) => {
        setComp(comp+num);
        setTaskDone(true);
    }

    useEffect(()=>{
        
        console.log(currentData[id-1].Completed)
        currentData[id-1].Completed = comp;
        console.log( currentData[id-1].Completed=comp)
        localStorage.setItem("simplyFit" , JSON.stringify(currentData));
        
    },[comp])

    return (
        <div className={styles.card}>
            <div className={styles.rightUpper}>
            <p id={styles.frequency}>{frequency}</p>
            <p style={{ background: `${bgColor}` }} id={styles.status}>{status}</p>
            </div>
            <h1>{name}</h1>
            <h2 id={styles.description}>{description}</h2>
            
            <h2 id={styles.tasks}>Tasks</h2>
            <ul>
                <li>Running</li>
                <li>Jumping</li>
            </ul>
            <p><SlCalender />&nbsp;From : {startDate}</p>
            <p><SlCalender />&nbsp;To : {endDate}</p>
           
            <p id={styles.Completed}>Completed : <span style={{ color: `${bgColor}` }}>{comp}&nbsp;days</span></p>
            <p id={styles.daysDifference}>Duration: {daysDifference} days</p> {/* Display the calculated difference */}
            <Line percent={daysDifference ? (comp/daysDifference)*100 : 0} strokeWidth={4} strokeColor="black" trailWidth={10} />
            {/* {taskDone? <div id={styles.completed}>{daysDifference === Completed ? <h1 className={styles.inProgress} style={{background:'#5DBD4A'}}>Completed</h1> : <h1 className={styles.inProgress} style={{background:'#0D86D3'}}>InProgress</h1>}</div> : */}
            <div className={styles.today}><h2>Today's?</h2><button onClick={()=>updateCompleted(1)}>Yes</button><button onClick={()=>updateCompleted(0)}>No</button></div>
        </div>
    );
}

export default Cards;
