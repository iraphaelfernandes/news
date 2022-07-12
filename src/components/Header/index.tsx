import styles from './styles.module.scss'
import { SignInButton } from '../SignInButton'

import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { ActiveLink } from '../ActiveLink'

export function Header() {
  
  
  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
      <strong>ORACULUM</strong>
      
        <nav>
        <ActiveLink activeClassName={styles.active} href="/">
          <a>Home</a>
        </ActiveLink>
        
        <ActiveLink activeClassName={styles.active} href="/posts">
          <a>Posts</a>
        </ActiveLink>
        </nav>
        <SignInButton/>
      </div>
    </header>
    
  )
}