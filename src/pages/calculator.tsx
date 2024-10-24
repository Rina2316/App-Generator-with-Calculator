import { useState } from 'react';
import { Parser } from 'expr-eval';
import styles from "../styles/calculator.module.scss";
import Header from '../components/Header';

const Calculator = () => {
  const [input, setInput] = useState('0'); 
  const [result, setResult] = useState<string | null>(null); 
  const [history, setHistory] = useState<string[]>([]); 

  const handleButtonClick = (value: string) => {
    setInput((prev) => (prev === '0' ? value : prev + value)); 
  };

  const handleClear = () => {
    setInput('0');
    setResult(null); 
  };

  const handlePlusMinus = () => {
    setInput((prev) => (prev[0] === '-' ? prev.slice(1) : '-' + prev)); 
  };

  const handlePercentage = () => {
    try {
      const parser = new Parser();
      const evaluatedResult = parser.evaluate(input) / 100;
      setResult(evaluatedResult.toString());
      setInput(evaluatedResult.toString()); 
      setHistory((prev) => [...prev, `${input} = ${evaluatedResult}`]);
    } catch {
      setInput('Ошибка');
    }
  };

  const handleCalculate = () => {
    try {
      const parser = new Parser();
      const evaluatedResult = parser.evaluate(input);
      setResult(evaluatedResult.toString()); 
      setInput(evaluatedResult.toString()); 
      setHistory((prev) => [...prev, `${input} = ${evaluatedResult}`]);
    } catch {
      setInput('Ошибка');
    }
  };
  const handleDeleteLast = () => {
    setInput((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0')); 
  };

  return (

    <div>
      <Header/>
    <div className={styles.container}>
      <div className={styles.calculator}>
        <div className={styles.display}>
          <div className={styles.oldResult}>{result !== null ? result : ''}</div> 
          <div className={styles.currentInput}>{input}</div> 
        </div>
        <div className={styles.buttonGrid}>
          <button onClick={handleClear} className={styles.specialButton} >C</button>
          <button onClick={handlePlusMinus} className={styles.specialButton}>+/-</button>
          <button onClick={handlePercentage} className={styles.specialButton}>%</button>
          <button onClick={() => handleButtonClick('/')} className={styles.operatorButton}>/</button>
          <button onClick={() => handleButtonClick('7')} className={styles.numberButton}>7</button>
          <button onClick={() => handleButtonClick('8')} className={styles.numberButton}>8</button>
          <button onClick={() => handleButtonClick('9')} className={styles.numberButton}>9</button>
          <button onClick={() => handleButtonClick('*')} className={styles.operatorButton}>*</button>
          <button onClick={() => handleButtonClick('4')} className={styles.numberButton}>4</button>
          <button onClick={() => handleButtonClick('5')} className={styles.numberButton}>5</button>
          <button onClick={() => handleButtonClick('6')} className={styles.numberButton}>6</button>
          <button onClick={() => handleButtonClick('-')} className={styles.operatorButton}>-</button>
          <button onClick={() => handleButtonClick('1')} className={styles.numberButton}>1</button>
          <button onClick={() => handleButtonClick('2')} className={styles.numberButton}>2</button>
          <button onClick={() => handleButtonClick('3')} className={styles.numberButton}>3</button>
          <button onClick={() => handleButtonClick('+')} className={styles.operatorButton}>+</button>
            <button onClick={() => handleButtonClick('.')} className={styles.numberButton}>.</button>
          <button onClick={() => handleButtonClick('0')} className={`${styles.numberButton} ${styles.zeroButton}`}>0</button>
          <button onClick={handleDeleteLast} className={styles.numberButton}>&#9003;</button>
          <button onClick={handleCalculate} className={styles.operatorButton} >=</button> 
        </div>
      </div>
    </div>
    </div>
  );
};

export default Calculator;
