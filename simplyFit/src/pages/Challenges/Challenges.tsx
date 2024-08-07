import { useEffect, useState } from 'react'
import styles from './Challenges.module.css'
import Cards from '../../components/Cards/Cards'
import { IoClose } from "react-icons/io5";


interface Challenge {
    id:number,
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    status: string;
    frequency: string
    Completed: number;
  }
  
  interface ChallengesProps {
    addTask: boolean;
    setAddTask: (value: boolean) => void;
  }
  

const Challenges: React.FC<ChallengesProps> = (props) => {
    const storedData = localStorage.getItem("simplyFit");
    let parsedData: Challenge[] = [];
    if (storedData) {
      try {
        parsedData = JSON.parse(storedData) as Challenge[];
      } catch (error) {
        console.error('Error parsing JSON from localStorage', error);
      }
    }
    
    const [filter , setFilter] = useState<string>("All")
    const [challenge , setChallenge] = useState<Challenge>({
        id: parsedData ? parsedData.length + 1 : 99,
        name : "",
        description : "",
        startDate : "",
        endDate : "",
        status : "",
        frequency : "Daily",
        Completed : 0
    })
    const [data , setData] = useState<Challenge[]>(parsedData ? parsedData : [])

    const handleChallenge = () => {
     setData((prev)=>[...prev , challenge])    
     localStorage.setItem("simplyFit" , JSON.stringify(data));
    }

    const filterData = () => {
        if(data){
            if(filter!=="All"){
                const filteredData = parsedData.filter((cur)=>cur.status === filter);
                console.log(filteredData)
                setData(filteredData)
            }
            else{
                setData(parsedData)
            }
        }
    }

    useEffect(()=>{
        filterData();
    },[filter])
  return (
    <div className={styles.section}>
  {data ? 
    <div className={styles.content}>
         <div className={styles.filter}>
            <button id={filter==="All" ? styles.bg : 'none'} onClick={()=>setFilter("All")}>All</button>
            <button id={filter==="Active" ? styles.bg : 'none'} onClick={()=>setFilter("Active")}>Active</button>
            <button id={filter==="Completed" ? styles.bg : 'none'} onClick={()=>setFilter("Completed")}>Completed</button>
            <button id={filter==="Missed" ? styles.bg : 'none'} onClick={()=>setFilter("Missed")}>Missed</button>
         </div>

         <div className={styles.challenges}>
            {data && data?.map((cur)=>{
                return(
                    <div>
                        <Cards data={cur}/>
                    </div>
                )
            })}
         </div>
    </div>
    : <div>
        <img src='https://res.cloudinary.com/dyqynjew8/image/upload/v1722778008/airy-online-fitness-lesson-water-bottle-and-dumbbells_hgwu2r.png' />
        <h1>Cuurently, No Challanges</h1>
        </div>}
        {props.addTask && 
            <div className={styles.modalDiv}>
            <div className={styles.addChallenge}>
               <h1>Add challenge</h1>
               <div className={styles.nameFreq}>
               <input placeholder='name' onChange={(e)=>setChallenge((prev)=>({...prev , name : e.target.value}))}/>
               <select value={challenge.frequency} onChange={(e)=>setChallenge((prev)=>({...prev , frequency : e.target.value}))}>
                <option value={"Daily"}>Daily</option>
                <option value={"Weekly"}>Weekly</option>
               </select>
               </div>
               <textarea id={styles.textarea} placeholder='description' onChange={(e)=>setChallenge((prev)=>({...prev , description : e.target.value}))}/>
                <div className={styles.dates}>
                <label>From&nbsp;&nbsp; 
               <input type='date' onChange={(e)=>setChallenge((prev)=>({...prev , startDate : e.target.value}))} />
               </label>
               <label>To&nbsp;&nbsp; 
               <input type='date' onChange={(e)=>setChallenge((prev)=>({...prev , endDate : e.target.value}))}/>
               </label>
               <select id={styles.status} value={challenge.status} onChange={(e)=>setChallenge((prev)=>({...prev , status : e.target.value}))}>
                 <option value="" disabled>Choose status</option>
                 <option value="Active">Active</option>
                 <option value="Completed">Completed</option>
                 <option value="Missed">Missed</option>
                </select>
               </div>
               <button id={styles.add} onClick={()=>handleChallenge()}>Add challenge</button>
               <button id={styles.close} onClick={()=>props.setAddTask(false)}>Close</button>
            </div>
            </div>}
    </div>
  )
}

export default Challenges