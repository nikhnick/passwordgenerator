import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [passwordLength, setPasswordLength] = useState(6);
  const [isNumber, setIsNumber] = useState(false);
  const [isChar, setIsChar] = useState(false);
  const [password, setPassword] = useState(false);
  const passwordRef = useRef(null);

  const generatePasswordString = useCallback(() => {
    let pwd = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isNumber) str += "1234567890";

    if (isChar) str += "@#$%&*+-\\/_=";

    for (let i = 0; i < passwordLength; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pwd += str.charAt(char);
    }

    setPassword(pwd);
  },[passwordLength, isNumber, isChar]);

  const copyText = () => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
    
  };

  useEffect(() => {
    generatePasswordString();
  }, [passwordLength, isNumber, isChar]);

  return (
    <div className="container text-center mt-3">
      <h2>Password Generator</h2>
      <div className="row">
        <div className="col-md-6 offset-md-3 mt-4">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon2"
              value={password}
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyText}
              className="input-group-text"
              id="basic-addon2"
            >
              Copy
            </button>
          </div>
          <div
            className="row g-3 align-items-center me-2"
            style={{ display: "inline-block" }}
          >
            <div className="col-auto">
              Length{" "}
              <input
                id="inputPassword6"
                aria-describedby="passwordHelpInline"
                type="range"
                name="passworrLength"
                min={5}
                max={20}
                value={passwordLength}
                onChange={(e) => setPasswordLength(e.target.value)}
              />
              {passwordLength}
            </div>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox1"
              value={isNumber}
              onChange={() => {
                setIsNumber((num) => !num);
              }}
            />
            <label className="form-check-label">Numbers</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox2"
              value={isChar}
              onChange={() => {
                setIsChar((char) => !char);
              }}
            />
            <label className="form-check-label">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
