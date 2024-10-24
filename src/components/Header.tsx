import Link from 'next/link'; 
import { useUserStore } from '../store/useUserStore';
import styles from "../styles/header.module.scss";

const Header = () => {
  const { name } = useUserStore();


  const getFirstLetter = (userName: string) => {
    return userName ? userName.charAt(0).toUpperCase() : '';
  };

  return (
    <header className={styles.header}>
      <h2 className={styles.appName}>МатПриложение</h2>
      <nav className={styles.nav}>
        <Link href="/" passHref>
          <button className={styles.navButton}>Главная</button>
        </Link>
        <Link href="/password-generator" passHref>
          <button className={styles.navButton}>Генератор</button>
        </Link>
        <Link href="/calculator" passHref>
          <button className={styles.navButton}>Калькулятор</button>
        </Link>
      </nav>
      <div className={styles.userInfo}>
        <h2>Имя пользователя: {name}</h2>
        <div className={styles.userIcon}>{getFirstLetter(name)}</div>
      </div>
    </header>
  );
};

export default Header;
