import { GetServerSideProps } from 'next'
import Head from 'next/head'
import styles from './home.module.scss'
import { SubscribeButton } from '../components/SubscribeButton'
import {stripe} from '../services/stripe'

interface HomeProps {
  
  product:{
    
    priceId: string;
    amount: number;
  }
}

export default function Home({product}:HomeProps ) {

  
  
  return (
    <>
    <Head>
    <title>Home | news</title>
    </Head>
    
    <main className={styles.contentContainer}>
    
      <section className={styles.hero}>
        <span>Hey, welcome</span>
        <h1>News about the <span>React</span> world.</h1>
        <p>
          Get access to all the publications
          <span> for {product.amount} month</span>
        </p>
        <SubscribeButton/>
      </section>
      
      <img src="/images/avatar.svg" alt="Girl Coding"/>
    </main>
    </>
  )
}


export const getServerSideProps:GetServerSideProps = async ()=>{
  
  const price = await stripe.prices.retrieve(
    'price_1JWlWoHyuVl0344xPHr1qZAd',
    {
    expand: ['product']
    }
  )
  
  const product ={
    
    priceId: price.id,
    amount: price.unit_amount/100,
  }
  
  return {
    
    props: {
      product
    }
  }
}

















