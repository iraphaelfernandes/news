import { GetStaticProps } from 'next'
import Head from 'next/head'
import styles from './home.module.scss'
import { SubscribeButton } from '../components/SubscribeButton'
import {stripe} from '../services/stripe'

//Client-side
//Server-side
//Static Site Generation


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
        <span>Bem vindo</span>
        <h1>Esse é a sua fonte de informação</h1>
        <p>
          Se inscreva para ter acesso ao conteúdo
          <span> por {product.amount} mensal</span>
        </p>
        <SubscribeButton priceId={product.priceId}/>
      </section>
      
      <img src="/images/pc-news.png" alt="Home image"/>
    </main>
    </>
  )
}


export const getStaticProps:GetStaticProps = async ()=>{
  
  const price = await stripe.prices.retrieve('price_1KpCLDHyuVl0344xicLpn9Tv')
  
  const product ={
    
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US',{
      style: 'currency',
      currency:'USD',
    }).format(price.unit_amount/100),
  }
  
  return {
    
    props: {
      product,
      
    }, 
    revalidate: 60*60*24, //24 horas
  }
}

















