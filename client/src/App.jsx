import { useState } from "react";
import UploadForm from "./components/UploadForm";
import ResultCard from "./components/ResultCard";

function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white flex flex-col items-center px-4 py-8">

      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center mb-10">
        AI Resume Analyzer
      </h1>

      <div className="w-full max-w-4xl bg-slate-800 rounded-2xl shadow-xl p-4 md:p-8">

        <UploadForm setResult={setResult} />

        {result && (
          <ResultCard result={result} />
        )}

      </div>

    </div>
  );
}

export default App;