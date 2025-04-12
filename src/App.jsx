import Keypad from './keypad';
import './App.css';
import React, { useState } from 'react';
import { useEffect } from 'react';

function CalculatorApp() {
  let [Input, setInput] = useState('');

  function handleClick(value) {
    setInput(Input + value);
  }

  function Calculate() {
    try {
      let outputVal = eval(Input);
      setInput(outputVal.toString());
    } catch (error) {
      setInput("Error");
    }
  }

  function handleClear() {
    setInput('');
  }

   // ✅ Handle physical keyboard input
   useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;
      if (/\d/.test(key) || ['+', '-', '*', '/'].includes(key)) {
        handleClick(key);
      } else if (key === 'Enter') {
        Calculate();
      } else if (key === 'Backspace') {
        setInput(prev => prev.slice(0, -1));
      } else if (key === 'c' || key === 'C') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [Input]);

  return (
    <div className='container'>
      <h1>Calculator App using React</h1>
      <div className='calculator'>
        <input type='text' value={Input} className='output' readOnly />
        <Keypad handleClick={handleClick} handleClear={handleClear} Calculate={Calculate} />
      </div>
    </div>
  );
}

export default CalculatorApp;
