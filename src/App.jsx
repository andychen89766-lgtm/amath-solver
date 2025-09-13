import { useState } from "react";
import { evaluate } from "mathjs";

export default function App() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [firstTerm, setFirstTerm] = useState(1);
  const [diffRatio, setDiffRatio] = useState(1);
  const [count, setCount] = useState(5);
  const [sequence, setSequence] = useState([]);

  const evaluateExpression = () => {
    try {
      const r = evaluate(expression);
      setResult(String(r));
    } catch (e) {
      setResult("Error");
    }
  };

  const generateArithmetic = () => {
    const a = Number(firstTerm);
    const d = Number(diffRatio);
    const n = Math.max(0, Number(count) || 0);
    const seq = Array.from({ length: n }, (_, i) => a + i * d);
    setSequence(seq);
  };

  const generateGeometric = () => {
    const a = Number(firstTerm);
    const r = Number(diffRatio);
    const n = Math.max(0, Number(count) || 0);
    const seq = Array.from({ length: n }, (_, i) => a * r ** i);
    setSequence(seq);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50 p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">📐 Amath Solver</h1>
        <p className="text-gray-600 mt-2">Quick math tools and practice in one place</p>
      </header>

      <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="p-6 bg-white rounded-2xl shadow">
          <h2 className="text-2xl mb-4">Calculator</h2>
          <div className="flex gap-2 mb-3">
            <input
              className="border rounded px-3 py-2 flex-1"
              placeholder="Enter expression (e.g., 2+3*4)"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
            />
            <button onClick={evaluateExpression} className="bg-blue-600 text-white px-4 rounded">
              Solve
            </button>
          </div>
          <p>Result: <span className="font-bold">{result}</span></p>
        </section>

        <section className="p-6 bg-white rounded-2xl shadow">
          <h2 className="text-2xl mb-4">Sequences</h2>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <input
              type="number"
              className="border rounded px-2 py-1"
              value={firstTerm}
              onChange={(e) => setFirstTerm(e.target.value)}
              placeholder="First term"
            />
            <input
              type="number"
              className="border rounded px-2 py-1"
              value={diffRatio}
              onChange={(e) => setDiffRatio(e.target.value)}
              placeholder="Diff / Ratio"
            />
            <input
              type="number"
              className="border rounded px-2 py-1"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              placeholder="# terms"
            />
          </div>
          <div className="flex gap-2 mb-3">
            <button onClick={generateArithmetic} className="px-3 py-1 border rounded">Arithmetic</button>
            <button onClick={generateGeometric} className="px-3 py-1 border rounded">Geometric</button>
          </div>
          {sequence.length > 0 && <p>Sequence: <span className="font-mono">{sequence.join(", ")}</span></p>}
        </section>
      </main>

      <footer className="bg-gray-900 text-white text-center py-4 mt-8 rounded-t-2xl shadow-inner">
        <p className="text-sm">Founded by <span className="font-semibold">Andy Chen</span></p>
        <p className="text-sm">
          Contact: <a href="mailto:andychen89766@gmail.com" className="underline hover:text-gray-300">andychen89766@gmail.com</a>
        </p>
      </footer>
    </div>
  );
}