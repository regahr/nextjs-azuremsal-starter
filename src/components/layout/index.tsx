import Head from 'next/head';

import Header from './Header';

export default function Layout({ children }: any) {
  return (
    <>
      <Head>
        <title>Adhoc</title>
      </Head>
      <Header />
      <main>{children}</main>
    </>
  );
}
