import { createRef, useEffect, useState } from "react";
import zxcvbn from "zxcvbn";

const chars = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numeric: "0123456789",
  symbols: "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~",
};
const PasswordGenerator = () => {
  const [showPasswordField, setShow] = useState(false);
  const togglePass = () => setShow(!showPasswordField);
  const [passwordScore, setPassScore] = useState(0);
  const [charsLength, setCharsLength] = useState(12);
  const [password, setPass] = useState("");

  const charsSymbolsRef = createRef<HTMLInputElement>();
  const charsLowerRef = createRef<HTMLInputElement>();
  const charsUpperRef = createRef<HTMLInputElement>();
  const charsNumericRef = createRef<HTMLInputElement>();

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  const generatePassword = () => {
    setPass(
      shuffleArray(
        (
          (charsLowerRef.current.checked ? chars.lower : "") +
          (charsUpperRef.current.checked ? chars.upper : "") +
          (charsNumericRef.current.checked ? chars.numeric : "") +
          (charsSymbolsRef.current.checked ? chars.symbols : "")
        ).split("")
      )
        .join("")
        .substring(0, charsLength)
    );
  };

  useEffect(() => {
    generatePassword();
  }, [charsLength]);

  useEffect(() => {
    if (!password) {
      return setPassScore(0);
    }
    setPassScore(zxcvbn(password).score + 1);
  }, [password]);
  return (
    <div className="w-full mx-auto rounded-lg bg-white shadow p-5 text-gray-800 max-w-md">
      <div className="relative mb-2">
        <input
          value={password}
          type={showPasswordField ? "text" : "password"}
          id="password"
          className="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
          placeholder="Password"
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            setPass(target.value);
          }}
        />
        <button
          onClick={togglePass}
          className="block w-7 h-7 text-center text-xl leading-0 absolute top-2 right-2 text-gray-400 focus:outline-none hover:text-indigo-500 transition-colors"
        >
          <i
            className={`mdi mdi-${
              !showPasswordField ? "eye-outline" : "eye-off-outline"
            }`}
          />
        </button>
      </div>
      <div className="flex -mx-1">
        {[1, 2, 3, 4, 5].map((v, i) => {
          return (
            <div className="w-1/5 px-1" key={v}>
              <div
                className={`h-2 rounded-xl transition-colors ${
                  i < passwordScore
                    ? passwordScore <= 2
                      ? "bg-red-400"
                      : passwordScore <= 4
                      ? "bg-yellow-400"
                      : "bg-green-500"
                    : "bg-gray-200"
                }`}
              />
            </div>
          );
        })}
      </div>
      <hr className="my-5 border border-gray-200" />
      <div className="mb-2">
        <label className="block text-xs font-semibold text-gray-500 mb-2">
          PASSWORD LENGTH
        </label>
        <input
          className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
          placeholder="Length"
          type="number"
          min="1"
          max="30"
          step="1"
          value={charsLength}
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            setCharsLength(Number(target.value));
          }}
        />
        <input
          className="charsLength w-full"
          type="range"
          min="1"
          max="30"
          step="1"
          value={charsLength}
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            setCharsLength(Number(target.value));
          }}
        />
      </div>
      <div className="flex -mx-2 mb-2">
        <div className="w-1/2 px-2">
          <label htmlFor="charsLower" className="flex gap-2 items-center">
            <input
              ref={charsLowerRef}
              type="checkbox"
              className="align-middle"
              id="charsLower"
              onInput={generatePassword}
              defaultChecked
            />
            <span className="text-xs font-semibold text-gray-500">
              LOWERCASE
            </span>
          </label>
        </div>
        <div className="w-1/2 px-2">
          <label htmlFor="charsUpper" className="flex gap-2 items-center">
            <input
              ref={charsUpperRef}
              type="checkbox"
              className="align-middle"
              id="charsUpper"
              onInput={generatePassword}
              defaultChecked
            />
            <span className="text-xs font-semibold text-gray-500">
              UPPERCASE
            </span>
          </label>
        </div>
      </div>
      <div className="flex -mx-2">
        <div className="w-1/2 px-2">
          <label htmlFor="charsNumeric" className="flex gap-2 items-center">
            <input
              ref={charsNumericRef}
              type="checkbox"
              className="align-middle"
              id="charsNumeric"
              onInput={generatePassword}
              defaultChecked
            />
            <span className="text-xs font-semibold text-gray-500">NUMBERS</span>
          </label>
        </div>
        <div className="w-1/2 px-2">
          <label htmlFor="charsSymbols" className="flex gap-2 items-center">
            <input
              ref={charsSymbolsRef}
              type="checkbox"
              className="align-middle"
              id="charsSymbols"
              onInput={generatePassword}
              defaultChecked
            />
            <span className="text-xs font-semibold text-gray-500">SYMBOLS</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
