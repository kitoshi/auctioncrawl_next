'use client';
import Table from './components/Table';
import { useGlobalContext } from './context/GlobalContext';
import styles from './page.module.css';

export default function Home() {
  const data = useGlobalContext();
  return (
    <main className={styles.main}>
      <Table data={data} />
    </main>
  );
}
