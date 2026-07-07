import { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

function UploadForm({ setResult }) {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);

const onDrop = (acceptedFiles) => {
  if (acceptedFiles.length > 0) {
    setResume(acceptedFiles[0]);
  }
};

const { getRootProps, getInputProps, isDragActive } = useDropzone({
  onDrop,
  accept: {
    "application/pdf": [".pdf"],
  },
  maxSize: 5 * 1024 * 1024,
  multiple: false,
});


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Resume uploaded?
if (!resume) {
    alert("Please upload a PDF resume.");
    return;
}

// Only PDF allowed
if (resume.type !== "application/pdf") {
    alert("Only PDF files are allowed.");
    return;
}

// Maximum size 5 MB
if (resume.size > 5 * 1024 * 1024) {
    alert("Maximum PDF size is 5 MB.");
    return;
}

// Job description entered?
if (!jobDescription.trim()) {
    alert("Please enter a job description.");
    return;
}

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobDescription", jobDescription);

    try {
      setLoading(true);

      const response = await axios.post(
        "https://ai-resume-analyzer-0cl3.onrender.com/analyze",
        formData
      );

      setResult(response.data);
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="space-y-6 bg-slate-800 p-5 md:p-8 rounded-2xl shadow-2xl"
>

      <div>
        <label className="block text-lg font-semibold mb-2">
          📄 Upload Resume
        </label>

    <div
  {...getRootProps()}
  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
    isDragActive
      ? "border-cyan-400 bg-slate-700"
      : "border-slate-500 bg-slate-800 hover:border-cyan-500"
  }`}
>
  <input {...getInputProps()} />

  {resume ? (
    <>
      <p className="text-green-400 font-semibold">
        ✅ {resume.name}
      </p>

      <p className="text-gray-400 mt-2">
        {(resume.size / 1024 / 1024).toFixed(2)} MB
      </p>
    </>
  ) : (
    <>
      <p className="text-xl">
        📄 Drag & Drop your Resume here
      </p>

      <p className="text-gray-400 mt-2">
        or click to browse
      </p>

      <p className="text-sm text-gray-500 mt-3">
        PDF only • Max 5 MB
      </p>
    </>
  )}
</div>
      </div>

      <div>
        <label className="block text-lg font-semibold mb-2">
          📝 Job Description
        </label>

        <textarea
          rows="8"
          placeholder="Paste Job Description..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="w-full rounded-xl bg-slate-700 p-4 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-linear-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] transition-all duration-300 rounded-xl py-4 text-lg font-bold"
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

    </form>
  );
}

export default UploadForm;