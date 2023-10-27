/* eslint-disable no-console */
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

// eslint-disable-next-line import/extensions
import Layout from '@/components/layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
