import { useEffect, useState } from "react";
import "./App.css"

interface Part {
  color: string;
  text: string;
}

function App() {
  const [name, setName] = useState("^4Su^7ta^1t^7");
  const [parts, setParts] = useState<Part[]>([]);

  useEffect(() => {
    let parts: Array<Part> = [];
    let openPart: Part | undefined;
    const splits = name.split(/(\^.)/g);
    for (let i = 0; i < splits.length; i++) {
      const part = splits[i];
      if (part.startsWith("^")) {
        if (openPart) {
          parts.push(openPart);
        }
        openPart = {
          color: part.slice(1),
          text: "",
        };
      } else if (openPart) {
        openPart.text += part;
      } else {
        parts.push({
          color: "0",
          text: part,
        });
      }
    }
    if (openPart) {
      parts.push(openPart);
    }
    setParts(parts);
  }, [name]);

  return (
    <>
      <h1>Warsow name resolver</h1>
      <div className="card">
        <input onChange={(e) => setName(e.target.value)} value={name} />
      </div>
      <div className="card">
        <div className="result">
          {parts.map((part, i) => (
            <span key={i} className={`color-${part.color}`}>
              {part.text}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
