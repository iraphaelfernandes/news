import { GetStaticProps } from "next";
import {getSession, useSession} from "next-auth/client"
import Head from "next/head";
import Link from "next/link";
import { RichText } from "prismic-dom";
import { useEffect } from "react";
import { getPrismicClient } from  "../../../services/prismic";
import styles from '../post.module.scss'
import { useRouter } from 'next/dist/client/router';


interface PostPreviewProps{
  
  post:{
    
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
}

export default function PostPreview({post}:PostPreviewProps){
  
  const [session] = useSession()
  const router = useRouter()
  
  useEffect(()=>{
    if(session?.activeSubscription){
      router.push(`/posts/${post.slug}`)
    }
  }, [session])
  
  return(
    <>
      <Head>
      <title>{post.title} | ORACULUM</title>
      </Head>
      
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div 
          className={`${styles.postContent} ${styles.previewContent}`}
          dangerouslySetInnerHTML={{__html: post.content}}/>
          
          <div className={styles.continueReading}>
            Quer continuar lendo?!
            
            <Link href="/">
            <a href="">Inscreva-se</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}


export const getStaticPaths = () => {
  
  return {
    paths: [],
    fallback: 'blocking' //true, false ou blocking      
  }
  
}


export const getStaticProps:GetStaticProps = async ({ params}) => {
  

  const { slug } = params;
  
  const prismic = getPrismicClient()
  const response = await prismic.getByUID('publication', String(slug), {})
  
  console.log(JSON.stringify(response.data.content, null, 2), "XXXXX")
  
  
  const post = {
    slug,
    title: response.data.title,
    // content: response.data.content.find(content => content.type ==='paragraph'),
    
    content: RichText.asHtml(response.data.content.splice(0,3)),
    
    // content: RichText.asHtml(response.data.content),
    
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }
  
  return {
    props:{
      
      post,
    },
    redirect: 60*30, //30 minutos
  }
}