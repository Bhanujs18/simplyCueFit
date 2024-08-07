import { NavLink, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from 'react';
import { IoClose } from "react-icons/io5";

const Navbar = (props:any) => {

    const navigate = useNavigate();
    const [mobMenu , setMobMenu] = useState<boolean>(false);

    const openModal = () => {
        navigate('/challenges')
        props.setAddTask(true)
    }
 
  return (
    <div className={styles.section}>
       <div className={styles.navbar}>
            <img src='https://res.cloudinary.com/dyqynjew8/image/upload/v1722744127/Simply.Fit-removebg-preview_hppo2t.png' />
            <div className={styles.menu}>
                <NavLink style={{textDecoration:'none'}} to={"/"}><h2>Homepage</h2></NavLink>
                <NavLink  style={{textDecoration:'none'}} to={"/challenges"}><h2>Challenges</h2></NavLink>
                <button className={styles.createTask} onClick={()=>openModal()}>+ New Challenge</button>
            </div> 
            <div className={styles.Mobilemenu}>
             {mobMenu  ?
             <div className={styles.mobDivSection}>
              <div className={styles.mobMenu}>
                <IoClose onClick={()=>setMobMenu(false)} className={styles.closeMenu}/>
                <NavLink style={{textDecoration:'none'}}  onClick={()=>setMobMenu(false)} to={"/"}><h2>Homepage</h2></NavLink>
                <NavLink  style={{textDecoration:'none'}}  onClick={()=>setMobMenu(false)} to={"/challenges"}><h2>Challenges</h2></NavLink>
                <button className={styles.createTask} onClick={()=>openModal()}>+ New Challenge</button>
               </div> 
               </div>
               :
               <GiHamburgerMenu id={styles.ham} onClick={()=>setMobMenu(true)} />
             }
             </div>
       </div>
    
    </div>
  )
}

export default Navbar