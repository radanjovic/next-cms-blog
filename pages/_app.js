import '../styles/globals.scss';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

export default function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <title>Next CMS Blog</title>
      <link rel='icon' href='/favicon.ico' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='author' content='Radan Jovic' />
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
  
}

