function ResultCard({ result }) {
  return (
    <div className="mt-8 space-y-6 animate-fade-in">

      <div className="bg-slate-700 rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-4">
          ATS Match Score
        </h2>

        <h1 className="text-4xl md:text-6xl font-bold text-green-400">
          {result.score}%
        </h1>

        <div className="w-full bg-slate-500 rounded-full h-4 mt-5">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${result.score}%` }}
          ></div>
        </div>

      </div>

      <div className="bg-slate-700 rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-4">
          Missing Skills
        </h2>

        <div className="flex flex-wrap gap-2">
          {result.missingKeywords.map((skill, index) => (
            <span
              key={index}
              className="bg-red-500 px-3 py-2 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>

      </div>

      <div className="bg-slate-700 rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-4">
          AI Recommendations
        </h2>

        <ul className="space-y-3">
          {result.suggestions.map((item, index) => (
            <li key={index}>
              ✅ {item}
            </li>
          ))}
        </ul>

      </div>

    </div>
  );
}

export default ResultCard;