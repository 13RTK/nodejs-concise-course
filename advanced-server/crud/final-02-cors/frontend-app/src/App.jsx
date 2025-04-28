import { useRef, useState } from 'react';
import './style.css';

export default function App() {
  // <img onError=fetch('http://localhost:3000') src='invalid.url.com'>
  const defaultValue = "<img onError=alert('Hacked.') src='invalid.url.com'>";
  const [value, setValue] = useState(defaultValue);
  const divRef = useRef(null);

  return (
    <div className="App">
      <h1>React XSS example</h1>
      <h2>Put something dangerous in the input below and press "Send".</h2>

      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
      <div>
        <button
          onClick={() => {
            divRef.current.innerHTML = value;
          }}
        >
          Send
        </button>
      </div>
      <div ref={divRef}></div>
    </div>
  );
}
