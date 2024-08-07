import { NavLink } from 'react-router-dom'
import styles from './Dashboard.module.css'

const Dashboard = () => {
  return (
    <section className={styles.section}>
        <div className={styles.banner}>
            <div className={styles.mainSection}>
          <h1>Simply Fit: Achieve Your Best with a Simply Cue Approach</h1>
          <NavLink  style={{textDecoration:'none'}} to={"/challenges"}><button className={styles.button}>Get Started</button> </NavLink> 
          </div>
        </div>
    </section>
  )
}

export default Dashboard