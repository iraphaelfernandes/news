import styles from './styles.module.scss'
import { SignInButton } from '../SignInButton'

export function Header() {
  
  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
      <strong>ORACULUM</strong>
      
        <nav>
          <a className={styles.active}>Home</a>
          <a>Posts</a>
        </nav>
        <SignInButton/>
      </div>
    </header>
    
  )
}