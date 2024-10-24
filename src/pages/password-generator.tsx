import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import Header from '../components/Header';
import styles from "../styles/password-generator.module.scss";

const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [avoidRepeats, setAvoidRepeats] = useState(false);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [isValidLength, setIsValidLength] = useState(true);

  const handlePasswordLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPasswordLength(value);
    setIsValidLength(value > 0); 

    if (value <= 0) {
      toast.error("Укажите длину больше 0"); 
    }
  };

  const generatePasswords = () => {
    if (!isValidLength) return;

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '?\\';
    let charSet = '';

    if (includeUppercase) charSet += uppercaseChars;
    if (includeLowercase) charSet += lowercaseChars;
    if (includeNumbers) charSet += numberChars;
    if (includeSymbols) charSet += symbolChars;

    const generatedPasswords: string[] = [];
    
    for (let j = 0; j < 5; j++) {
      let generatedPassword = '';
      const usedChars = new Set<string>();

      while (generatedPassword.length < passwordLength) {
        const randomChar = charSet.charAt(Math.floor(Math.random() * charSet.length));

        if (!avoidRepeats || !usedChars.has(randomChar)) {
          generatedPassword += randomChar;
          usedChars.add(randomChar);
        }

        if (!avoidRepeats && generatedPassword.length === passwordLength) {
          break;
        }
      }

      generatedPasswords.push(generatedPassword);
    }

    setPasswords(generatedPasswords);
    toast.success("Пароли успешно сгенерированы!"); 
  };

  return (
    <div>
      <Header />
      <ToastContainer /> 
      <div className={styles.passwordGenerator}>
        <div className={styles.leftColumn}>
          <h1>Генератор паролей</h1>

          <label className={styles.lengthLabel}>Длина пароля:</label>
          <input
            type="text-field" 
            value={passwordLength}
            onChange={handlePasswordLengthChange}
            min="1"
            className={`${styles.inputLength} ${!isValidLength && styles.invalidInput}`}
          />

          <div className={styles.checkboxes}>
            <label>
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
              />
              Использовать прописные буквы
            </label>
            <label>
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
              />
              Использовать строчные буквы
            </label>
            <label>
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
              />
              Использовать цифры
            </label>
            <label>
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
              />
              Использовать символы (например, ?\\)
            </label>
            <label>
              <input
                type="checkbox"
                checked={avoidRepeats}
                onChange={(e) => setAvoidRepeats(e.target.checked)}
              />
              Избегать повторения символов
            </label>
          </div>

          <button className={styles.generateButton} onClick={generatePasswords}>Сгенерировать пароли</button>
        </div>
        
        {passwords.length > 0 && (
          <div className={styles.rightColumn}>
            <ul className={styles.passwordList}>
              {passwords.map((password, index) => (
                <li key={index} className={styles.passwordItem}>
                  <span className={styles.passwordText}>{password}</span>
                  <button 
                    className={styles.copyButton}
                    onClick={() => {
                      navigator.clipboard.writeText(password);
                      toast.success("Пароль скопирован!"); 
                    }}
                  >
                    <i className="fa fa-copy"></i> Скопировать
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordGenerator;

