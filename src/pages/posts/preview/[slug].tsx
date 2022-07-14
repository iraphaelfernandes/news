import { GetStaticProps } from "next";
import {getSession} from "next-auth/client"
import Head from "next/head";
import { RichText } from "prismic-dom";
import { getPrismicClient } from  "../../../services/prismic";
import styles from '../post.module.scss'


interface PostPreviewProps{
  
  post:{
    
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
}

export default function PostPreview({post}:PostPreviewProps){
  
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
          className={styles.postContent}
          dangerouslySetInnerHTML={{__html: post.content}}/>
        </article>
      </main>
    </>
  );
}


export const getStaticPaths = () => {
  
  return {
    paths: [],
    fallback: 'blocking'
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
    
    content: response.data.content.find(content => content.type ==='paragraph')?.text ?? '',
    
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
      
    }
  }
}