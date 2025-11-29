import axios from "axios";
import { ApiError } from "../utility/ApiError";
import ApiResponse from "../utility/ApiResponse";
import { asyncHandler } from "../utility/asyncHandler";
import { summarizeAgreementWithGemini } from "../services/geminiApi.services";

const Kanoon_Api_Key = process.env.KANOON_API_KEY;

// Step 1: Search API
// Mock Data for Fallback
const mockCases = [
  {
    tid: "1",
    title: "Kesavananda Bharati Sripadagalvaru v. State of Kerala",
    publishdate: "24 April 1973",
    docsource: "Supreme Court of India",
    citation: "AIR 1973 SC 1461"
  },
  {
    tid: "2",
    title: "Maneka Gandhi v. Union of India",
    publishdate: "25 January 1978",
    docsource: "Supreme Court of India",
    citation: "AIR 1978 SC 597"
  },
  {
    tid: "3",
    title: "Vishaka v. State of Rajasthan",
    publishdate: "13 August 1997",
    docsource: "Supreme Court of India",
    citation: "AIR 1997 SC 3011"
  },
  {
    tid: "4",
    title: "Justice K.S. Puttaswamy (Retd.) v. Union of India",
    publishdate: "24 August 2017",
    docsource: "Supreme Court of India",
    citation: "AIR 2017 SC 4161"
  }
];

const mockSummary = {
  caseTitle: "Kesavananda Bharati Sripadagalvaru v. State of Kerala",
  court: "Supreme Court of India",
  citation: "AIR 1973 SC 1461",
  parties: "Kesavananda Bharati (Petitioner) vs. State of Kerala (Respondent)",
  facts: "The petitioner, a religious head, challenged the Kerala Land Reforms Act which restricted the management of his property. The case expanded to challenge the 24th, 25th, and 29th Amendments to the Constitution.",
  issues: "Whether the Parliament has unlimited power to amend the Constitution under Article 368, and if there are any implied limitations.",
  arguments: {
    petitioner: "Parliament cannot alter the 'basic structure' of the Constitution. Fundamental rights are essential and cannot be abrogated.",
    respondent: "Parliament has unlimited power to amend any part of the Constitution, including Fundamental Rights, as it represents the will of the people."
  },
  reasoning: "The Court held that while Parliament has wide powers to amend the Constitution, it cannot alter its 'Basic Structure'. This includes features like supremacy of the Constitution, republican and democratic form of government, secularism, separation of powers, and federal character.",
  decision: "The Basic Structure Doctrine was established. The 24th Amendment was upheld, but the part of the 25th Amendment that barred judicial review was struck down.",
  principles: "Basic Structure Doctrine, Judicial Review, Supremacy of the Constitution."
};

// Step 1: Search API
export const searchCases = asyncHandler(async (req, res) => {
  let { query, page = 0 } = req.body;

  if (!query) throw new ApiError(400, 'query is required');

  // Ensure query is a string
  if (Array.isArray(query)) query = query[0];
  if (typeof query !== 'string') throw new ApiError(400, 'query must be a string');

  if (!Kanoon_Api_Key) {
    console.warn("Kanoon API Key missing. Returning mock data.");
    return res.json(new ApiResponse(200, mockCases, "Search results fetched (Demo Mode)"));
  }

  try {
    const kanoonRes = await axios.post(
      "https://api.indiankanoon.org/search/",
      new URLSearchParams({
        formInput: query,
        pagenum: page.toString(),
      }),
      {
        headers: {
          Authorization: `Token ${Kanoon_Api_Key}`,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json"
        },
      }
    );

    if (!kanoonRes.data || (!kanoonRes.data.results && !kanoonRes.data.docs)) {
      // Fallback to mock if no results found in API (optional, but good for demo)
      if (mockCases.length > 0) {
        return res.json(new ApiResponse(200, mockCases, "Search results fetched (Fallback)"));
      }
      throw new ApiError(404, "No results found");
    }

    res.json(new ApiResponse(200, kanoonRes.data.docs, "Search results fetched"));
  } catch (error) {
    console.error("Kanoon API Error:", error);
    // Fallback on error
    return res.json(new ApiResponse(200, mockCases, "Search results fetched (Fallback Mode)"));
  }
});

// Step 2: Fetch case by tid
export const getCaseSummary = asyncHandler(async (req, res) => {
  const { tid } = req.body;
  if (!tid) throw new ApiError(400, 'tid is required');

  if (!Kanoon_Api_Key) {
    console.warn("Kanoon API Key missing. Returning mock summary.");
    return res.json(new ApiResponse(200, mockSummary, "Case details fetched (Demo Mode)"));
  }

  try {
    // Use POST with form data, as with search endpoint
    const kanoonRes = await axios.post(
      `https://api.indiankanoon.org/doc/${tid}/`,
      new URLSearchParams({
        maxcites: '10',
        maxcitedby: '10',
      }),
      {
        headers: {
          Authorization: `Token ${Kanoon_Api_Key}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      }
    );

    const caseText = kanoonRes.data.doc;

    const prompt = `
            You are a legal assistant. Summarize the following Indian court judgment into a clear, structured summary.
    
            Input:
            ${caseText}
    
            Instructions:
            1. Extract and summarize the key points in plain English.
            2. Include these sections in the output:
            - Case Title & Date
            - Court & Citation
            - Parties Involved
            - Background / Facts of the Case
            - Key Legal Issues
            - Arguments (Petitioner vs Respondent, if available)
            - Court's Reasoning
            - Final Decision / Outcome
            3. Keep the summary concise but legally accurate.
            4. Avoid copying raw text; instead, rewrite in simple, professional language.
            5. Where possible, highlight the legal principles established.
            6. If required Prices must be given in Indian Rupees (₹), with approximate ranges.
    
            Output the summary in JSON with this format:
            {
            "caseTitle": "...",
            "court": "...",
            "citation": "...",
            "parties": "...",
            "facts": "...",
            "issues": "...",
            "arguments": {
                "petitioner": "...",
                "respondent": "..."
            },
            "reasoning": "...",
            "decision": "...",
            "principles": "..."
            }
        `;

    const geminiResponse = await summarizeAgreementWithGemini(prompt);
    res.json(new ApiResponse(200, geminiResponse, "Case details fetched"));

  } catch (error) {
    console.error("Kanoon/Gemini API Error:", error);
    return res.json(new ApiResponse(200, mockSummary, "Case details fetched (Fallback Mode)"));
  }
});