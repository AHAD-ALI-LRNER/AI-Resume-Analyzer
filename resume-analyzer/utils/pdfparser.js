const pdfParse = require("pdf-parse");

async function extractText(fileBuffer) {
    const pdfData = await pdfParse(fileBuffer);
    return pdfData.text;
}

module.exports = extractText;