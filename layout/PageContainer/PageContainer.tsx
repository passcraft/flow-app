import Head from 'next/head';
import { ReactNode } from 'react';
import { Header } from '../../layout';
import styles from './PageContainer.module.css';

interface Props {
  pageTitle?: string;
  withHeader?: boolean;
  children: ReactNode;
}

const PageContainer = ({ pageTitle, withHeader = true, children }: Props) => {
  const title = 'Belong';

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main className={styles.pageContainer}>
        {withHeader ? <Header /> : null}

        {children}
      </main>
    </>
  );
};

export default PageContainer;
