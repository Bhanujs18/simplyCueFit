import { useEffect, useState } from 'react';
import styles from './Challenges.module.css';
import Cards from '../../components/Cards/Cards';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { allPosts, savePost } from '../../apis/post';

interface Challenge {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    tasks: string[]; // Updated to be an array of strings
    status: string;
    frequency: string;
    Completed: number;
}

interface ChallengesProps {
    addTask: boolean;
    setAddTask: (value: boolean) => void;
}

const Challenges: React.FC<ChallengesProps> = (props) => {
    const [filter, setFilter] = useState<string>("All");
    const [fData, setFdata] = useState<Challenge[]>([]);
    const [refresh, setRefresh] = useState<string>(''); // Initialize with an empty string
    const [challenge, setChallenge] = useState<Challenge>({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        tasks: [], // Initialize as an empty array
        status: "",
        frequency: "Daily",
        Completed: 0
    });
    const [data, setData] = useState<Challenge[]>([]);
    const [newTask, setNewTask] = useState<string>(''); // State for new task input

    const fetchData = async () => {
        const res = await allPosts();
        if (res?.data) {
            setData(res.data.data);
            setFdata(res.data.data);
        }
    };

    useEffect(() => {
        fetchData();
    }, [refresh]); // Fetch data whenever `refresh` changes

    const handleChallenge = async () => {
        if (!challenge.name || !challenge.description || !challenge.startDate
            || !challenge.endDate || !challenge.status) {
            toast.warn('Please fill all fields !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
            return;
        }
        await savePost(challenge);
        props.setAddTask(false);
        fetchData();
        setChallenge({
            name: "",
            description: "",
            startDate: "",
            endDate: "",
            tasks: [], 
            status: "",
            frequency: "Daily",
            Completed: 0
        })
    };

    const filterData = () => {
        if (data) {
            if (filter !== "All") {
                const filteredData = data.filter((cur) => cur.status === filter);
                setFdata(filteredData);
            } else {
                setFdata(data);
            }
        }
    };

    useEffect(() => {
        filterData();
    }, [filter]);

    const handleAddTask = () => {
        if (newTask.trim()) {
            setChallenge(prev => ({
                ...prev,
                tasks: [...prev.tasks, newTask.trim()]
            }));
            setNewTask('');
        }
    };

    const handleRemoveTask = (taskToRemove: string) => {
        setChallenge(prev => ({
            ...prev,
            tasks: prev.tasks.filter(task => task !== taskToRemove)
        }));
    };

    return (
        <div className={styles.section}>
            <div className={styles.filter}>
                <button id={filter === "All" ? styles.bg : 'none'} onClick={() => setFilter("All")}>All</button>
                <button id={filter === "Active" ? styles.bg : 'none'} onClick={() => setFilter("Active")}>Active</button>
                <button id={filter === "Completed" ? styles.bg : 'none'} onClick={() => setFilter("Completed")}>Completed</button>
                <button id={filter === "Missed" ? styles.bg : 'none'} onClick={() => setFilter("Missed")}>Missed</button>
            </div>

            {fData.length > 0 ?
                <div className={styles.content}>
                    <div className={styles.challenges}>
                        {fData.map((cur, index) => (
                            <div key={index}>
                                <Cards data={cur as any} setRefresh={setRefresh} />
                            </div>
                        ))}
                    </div>
                </div>
                :
                <div>
                    <img src='https://res.cloudinary.com/dyqynjew8/image/upload/v1722778008/airy-online-fitness-lesson-water-bottle-and-dumbbells_hgwu2r.png' />
                    <h1>Currently, No Challenges</h1>
                </div>
            }

            {props.addTask &&
                <div className={styles.modalDiv}>
                    <div className={styles.addChallenge}>
                        <h1>Add challenge</h1>
                        <div className={styles.nameFreq}>
                            <input
                                placeholder='name (max 40 characters)'
                                value={challenge.name}
                                onChange={(e) => setChallenge(prev => ({ ...prev, name: e.target.value }))}
                            />
                            <select
                                value={challenge.frequency}
                                onChange={(e) => setChallenge(prev => ({ ...prev, frequency: e.target.value }))}
                            >
                                <option value={"Daily"}>Daily</option>
                                <option value={"Weekly"}>Weekly</option>
                            </select>
                        </div>
                        <textarea
                            id={styles.textarea}
                            placeholder='description'
                            value={challenge.description}
                            onChange={(e) => setChallenge(prev => ({ ...prev, description: e.target.value }))}
                        />
                        <div className={styles.dates}>
                            <label>From&nbsp;&nbsp; 
                                <input
                                    type='date'
                                    value={challenge.startDate}
                                    onChange={(e) => setChallenge(prev => ({ ...prev, startDate: e.target.value }))}
                                />
                            </label>
                            <label>To&nbsp;&nbsp; 
                                <input
                                    type='date'
                                    value={challenge.endDate}
                                    onChange={(e) => setChallenge(prev => ({ ...prev, endDate: e.target.value }))}
                                />
                            </label>
                            <select
                                id={styles.status}
                                value={challenge.status}
                                onChange={(e) => setChallenge(prev => ({ ...prev, status: e.target.value }))}
                            >
                                <option value="" disabled>Choose status</option>
                                <option value="Active">Active</option>
                                <option value="Completed">Completed</option>
                                <option value="Missed">Missed</option>
                            </select>
                        </div>
                        <div className={styles.tasksSection}>
                          <div className={styles.inbutton}>
                            <input
                                placeholder='Add task'
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                            />
                            <button onClick={handleAddTask}>Add Task</button>
                            </div>
                            <div className={styles.tasksContainer}>
                                {challenge.tasks.map((task, index) => (
                                    <div key={index} className={styles.taskItem}>
                                        {task}
                                        <span className={styles.removeTask} onClick={() => handleRemoveTask(task)}>✖</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button id={styles.add} onClick={handleChallenge}>Add challenge</button>
                        <button id={styles.close} onClick={() => props.setAddTask(false)}>Close</button>
                    </div>
                </div>
            }
            <ToastContainer />
        </div>
    );
}

export default Challenges;
