import React from "react";
import { useState } from "react";
function HomePage() {
  const[formData, setFormData] = useState({
    companyName: "",
    applyingAs: "Frehser",
    coverLetterTone: "casual",
    jobDescription: "",
    currentResume: ""
  })
  //AIzaSyBOsIE2EDw5FPKBYs2TF1m936aIE1Z6eQQ
  const [geminiresponse, setGeminiResponseData] = useState("");
  async function handleGenerateData() {
    console.log('Form Data:', formData);
    const prompt= ` You are a professional career coach and resume optimization expert. 
Your task is to generate a personalized cover letter, improve the resume content, 
and provide an ATS (Applicant Tracking System) analysis.

Inputs:
Company Name: ${formData.companyName}
Experience Level: ${formData.applyingAsA}  (Fresher / Experienced)
Job Description: ${formData.jobDescription}
Current Resume: ${formData.currentResume} (If empty, assume no resume exists and create a draft)
Preferred Tone: ${formData.coverLetterTone}

Output (format clearly in sections):

1. Tailored Cover Letter  
Write a professional cover letter addressed to ${formData.companyName}.  
Use the specified tone: ${formData.coverLetterTone}.  
Highlight relevant skills and experiences based on the job description.  

2. Updated Resume Content  
Suggest optimized resume summary, bullet points, and skills tailored to ${formData.jobDescription}.  
Ensure the content is concise, achievement-focused, and ATS-friendly.  

3. Keyword Match Analysis  
Extract the most important keywords from the job description.  
Check if they exist in the provided resume (if given).  
List missing keywords that should be added.  

4. ATS Score Estimate (0–100)  
Provide a rough ATS match score for the current resume against the job description.  
Explain the reasoning briefly (e.g., missing keywords, formatting issues, irrelevant content)
`
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const options = {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    'X-goog-api-key': 'AIzaSyBOsIE2EDw5FPKBYs2TF1m936aIE1Z6eQQ'
  },
  body: `{"contents":[{"parts":[{"text":"${prompt}"}]}]}`
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log("Generated Gemini data",data.candidates[0].content.parts[0]);
  setGeminiResponseData(data.candidates[0].content.parts[0].text);
} catch (error) {
  console.error("Error generating Gemini data:", error);
}
} // <-- Close handleGenerateData function

  return (
      <div style={{
        minHeight: '100vh',
        background: 'white',
        padding: '40px 0'
      }}>
        <div style={{maxWidth: 700, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: 32}}>
          <header style={{textAlign: 'center', marginBottom: 32}}>
            
            <h1 style={{color: '#1976d2', fontWeight: 700, fontSize: 32, marginBottom: 8}}>Resume Builder</h1>
            <p style={{color: '#555', fontSize: 18}}>Create and customize your resume with ease.</p>
          </header>
        <form style={{marginBottom: 32}}>
          <div style={{marginBottom: 20}}>
            <label htmlFor="exampleInputEmail1" style={{fontWeight: 500, display: 'block', marginBottom: 6}}>Company Name</label>
            <input type="text" id="exampleInputEmail1" aria-describedby="emailHelp"
              value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})}
              style={{width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #ccc'}}
            />
            <div id="emailHelp" style={{color: '#888', fontSize: 13, marginTop: 2}}>Company you are applying</div>
          </div>
          <div style={{marginBottom: 20}}>
            <label style={{fontWeight: 500, display: 'block', marginBottom: 6}}>Applying As</label>
            <select
              value={formData.applyingAs} onChange={(e) => setFormData({...formData, applyingAs: e.target.value})}
              style={{width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #ccc'}}>
              <option value="">Applying as a</option>
              <option value="Fresher">Fresher</option>
              <option value="Experienced">Experienced</option>
            </select>
          </div>
          <div style={{marginBottom: 20}}>
            <label style={{fontWeight: 500, display: 'block', marginBottom: 6}}>Cover Letter Tone</label>
            <select
              value={formData.coverLetterTone} onChange={(e) => setFormData({...formData, coverLetterTone: e.target.value})}
              style={{width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #ccc'}}>
              <option value="">Cover letter tone</option>
              <option value="Formal">Formal</option>
              <option value="Informal">Informal</option>
              <option value="Casual">Casual</option>
            </select>
          </div>
          <div style={{marginBottom: 20}}>
            <label htmlFor="jobDecription" style={{fontWeight: 500, display: 'block', marginBottom: 6}}>Job Description</label>
            <textarea name="JobDescription" id="jobDecription" rows="4"
              value={formData.jobDescription}
              onChange={(e) => setFormData({...formData, jobDescription: e.target.value})}
              style={{width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #ccc', resize: 'vertical'}}
            ></textarea>
          </div>
          <div style={{marginBottom: 20}}>
            <label htmlFor="CurrentResume" style={{fontWeight: 500, display: 'block', marginBottom: 6}}>Current Resume</label>
            <textarea name="CurrentResume" id="CurrentResume" rows="4"
              value={formData.currentResume}
              onChange={(e) => setFormData({...formData, currentResume: e.target.value})}
              style={{width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #ccc', resize: 'vertical'}}
            ></textarea>
          </div>
          <div style={{textAlign: 'center'}}>
            <button type="button" onClick={handleGenerateData} style={{background: '#1976d2', color: '#fff', fontWeight: 600, border: 'none', borderRadius: 6, padding: '12px 32px', fontSize: 18, cursor: 'pointer'}}>Generate the Cover Letter</button>
          </div>
        </form>
        <section>
          <h2 style={{color: '#388e3c', fontWeight: 700, fontSize: 24, marginBottom: 18}}>Response from Gemini</h2>
          {geminiresponse && (
            <div style={{whiteSpace: 'pre-wrap'}}>
              {(() => {
                // Split response into sections using numbered headings
                const sections = geminiresponse.split(/\n\s*\d+\. /).filter(Boolean);
                const titles = [
                  'Tailored Cover Letter',
                  'Updated Resume Content',
                  'Keyword Match Analysis',
                  'ATS Score Estimate (0–100)'
                ];
                return sections.map((section, idx) => (
                  <div key={idx} style={{marginBottom: '1.5em', border: '1px solid #eee', borderRadius: '6px', padding: '1em', background: '#fafafa'}}>
                    <h4 style={{color: '#1976d2', fontWeight: 600}}>{titles[idx] || `Section ${idx+1}`}</h4>
                    <div>{section.trim()}</div>
                  </div>
                ));
              })()}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
export default HomePage;