import { useState, useEffect } from 'react';
import { useUserStore } from '../store/useUserStore';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast'; 
import styles from "../styles/Home.module.scss";

const Home = () => {
  const [inputName, setInputName] = useState('');
  const { name, setName } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setName(storedName);
      setInputName(storedName);
    }
  }, [setName]);

  const saveName = () => {
    if (inputName.trim()) {
      localStorage.setItem('userName', inputName);
      setName(inputName);
      toast.success('Имя успешно сохранено!'); 
      return true; 
    } else {
      toast.error('Введите имя перед сохранением.'); 
      return false; 
    }
  };

  const handleGeneratorClick = () => {
    if (saveName()) {
      setTimeout(() => {
        router.push('/password-generator');
      }, 1500); 
    } else {
      toast.error('Пожалуйста, впишите имя и нажмите Enter.'); 
    }
  };

  const handleCalculatorClick = () => {
    if (saveName()) {
      setTimeout(() => {
        router.push('/calculator');
      }, 1500); 
    } else {
      toast.error('Пожалуйста, впишите имя и нажмите Enter.'); 
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveName();
    }
  };

  return (
    <div className={styles.container}>
      <Toaster /> 
      <div className={styles.form}>
        <h1>Начать</h1>
        <p> Напишите ваше имя</p>
        <input
          type="text"
          value={inputName}
          onChange={handleInputChange}
          placeholder="Ваше имя"
          onKeyPress={handleKeyPress}
        />
        <div className={styles.buttons}>
          <button className="calculator" onClick={handleCalculatorClick}>
            Открыть калькулятор
          </button>
          <button className="generator" onClick={handleGeneratorClick}>
            Открыть генератор
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
