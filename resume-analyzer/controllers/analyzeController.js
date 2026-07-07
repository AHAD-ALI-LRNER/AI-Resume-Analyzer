const extractText = require("../utils/pdfparser");
const analyzeWithGemini = require("../services/geminiservices");

async function analyzeResume(req, res) {
    try {

    if (!req.file) {
    return res.status(400).json({
        error: "Please upload a PDF resume."
    });
    }

    if (!req.body.jobDescription) {
    return res.status(400).json({
        error: "Please enter a job description."
    });
    }
        const fileBuffer = req.file.buffer;
        const jobDescription = req.body.jobDescription;

        const resumeText = await extractText(fileBuffer);

        const prompt = `
You are a professional ATS Resume Analyzer.

Compare the following resume with the job description.

Return ONLY valid JSON.

{
  "score": number,
  "missingKeywords": [],
  "suggestions": []
}

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

        const response = await analyzeWithGemini(prompt);

        const cleanedResponse = response
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const parsed = JSON.parse(cleanedResponse);

        res.json(parsed);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

module.exports = {
    analyzeResume
};