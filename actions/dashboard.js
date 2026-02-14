// "use server"

// import { auth } from "@clerk/nextjs/server";

// export async function getIndustryInsights() {
//      const { userId } = await auth();
//         if (!userId) throw new Error("Unauthorized");
    
//         const user = await db.user.findUnique({
//             where: {
//                 clerkUserId: userId,
//             }
//         })
    
//         if (!user) throw new Error("User not found")
// }

// "use server";

// import { db } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";
// import { openrouter } from "@/lib/openrouter"; // ← USE THIS

// export const generateAIInsights = async (industry) => {
//   const prompt = `
// Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
// {
//   "salaryRanges": [
//     { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
//   ],
//   "growthRate": number,
//   "demandLevel": "HIGH" | "MEDIUM" | "LOW",
//   "topSkills": ["skill1", "skill2"],
//   "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
//   "keyTrends": ["trend1", "trend2"],
//   "recommendedSkills": ["skill1", "skill2"]
// }

// IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
// Include at least 5 common roles for salary ranges.
// Growth rate should be a percentage.
// Include at least 5 skills and trends.
// `;

//   const completion = await openrouter.chat.completions.create({
//     model: "openai/gpt-oss-120b:free",
//     messages: [
//       { role: "system", content: "You are an expert AI career analyst." },
//       { role: "user", content: prompt },
//     ],
//     temperature: 0.4,
//   });

//   const text = completion.choices[0].message.content.trim();
//   return JSON.parse(text);
// };

// export async function getIndustryInsights() {
//   const { userId } = await auth();
//   if (!userId) throw new Error("Unauthorized");

//   const user = await db.user.findUnique({
//     where: { clerkUserId: userId },
//     include:{
//         industryInsight:true,
//     }
//   });

//   if (!user) throw new Error("user not found");

//   if (!user.industryInsight) {
//     const insights = await generateAIInsights(user.industry);

//     const industryInsight = await db.industryInsight.create({
//       data: {
//         industry: user.industry,
//         ...insights,
//         nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//       },
//     });

//     return industryInsight;
//   }

//   return user.industryInsight;
// }

// "use server";

// import { db } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";
// import { openrouter } from "@/lib/openrouter"; // ← USE THIS

// export const generateAIInsights = async (industry) => {
//   const prompt = `
// Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
// {
//   "salaryRanges": [
//     { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
//   ],
//   "growthRate": number,
//   "demandLevel": "HIGH" | "MEDIUM" | "LOW",
//   "topSkills": ["skill1", "skill2"],
//   "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
//   "keyTrends": ["trend1", "trend2"],
//   "recommendedSkills": ["skill1", "skill2"]
// }

// IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
// Include at least 5 common roles for salary ranges.
// Growth rate should be a percentage.
// Include at least 5 skills and trends.
// `;

//   const completion = await openrouter.chat.completions.create({
//     model: "openai/gpt-oss-120b:free",
//     messages: [
//       { role: "system", content: "You are an expert AI career analyst." },
//       { role: "user", content: prompt },
//     ],
//     temperature: 0.4,
//   });

//   const text = completion.choices[0].message.content.trim();
//   return JSON.parse(text);
// };

// export async function getIndustryInsights() {
//   const { userId } = await auth();
//   if (!userId) throw new Error("Unauthorized");

//   const user = await db.user.findUnique({
//     where: { clerkUserId: userId },
//     include:{
//         industryInsight:true,
//     }
//   });

//   if (!user) throw new Error("user not found");

//   if (!user.industryInsight) {
//     const insights = await generateAIInsights(user.industry);

//     const industryInsight = await db.industryInsight.create({
//       data: {
//         industry: user.industry,
//         ...insights,
//         nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//       },
//     });

//     return industryInsight;
//   }

//   return user.industryInsight;
// }

// "use server";

// import { db } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";
// import { openrouter } from "@/lib/openrouter";

// /* ---------------- AI GENERATION ---------------- */

// export const generateAIInsights = async (industry) => {
//   if (!industry) {
//     throw new Error("Industry is required to generate insights");
//   }

//   const prompt = `
// Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
// {
//   "salaryRanges": [
//     { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
//   ],
//   "growthRate": number,
//   "demandLevel": "HIGH" | "MEDIUM" | "LOW",
//   "topSkills": ["skill1", "skill2"],
//   "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
//   "keyTrends": ["trend1", "trend2"],
//   "recommendedSkills": ["skill1", "skill2"]
// }
// `;

//   const completion = await openrouter.chat.completions.create({
//     model: "openai/gpt-oss-120b:free",
//     messages: [
//       { role: "system", content: "You are an expert AI career analyst." },
//       { role: "user", content: prompt },
//     ],
//     temperature: 0.4,
//   });

//   return JSON.parse(completion.choices[0].message.content.trim());
// };

// /* ---------------- DASHBOARD LOGIC ---------------- */

// export async function getIndustryInsights() {
//   const { userId } = await auth();
//   if (!userId) throw new Error("Unauthorized");

//   const user = await prisma.user.findUnique({
//     where: { clerkUserId: userId },
//     include: { industryInsight: true },
//   });

//   if (!user) throw new Error("User not found");

//   // 🚨 REQUIRED GUARD
//   if (!user.industry) {
//     return { needsOnboarding: true };
//   }

//   if (!user.industryInsight) {
//     const insights = await generateAIInsights(user.industry);

//     return await prisma.industryInsight.create({
//       data: {
//         industry: user.industry,
//         ...insights,
//         nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//       },
//     });
//   }

//   return user.industryInsight;
// }

// "use server";

// import { db } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";
// import { GoogleGenAI } from "@google/genai";

// const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// export const generateAIInsights = async (industry) => {
//   const prompt = `
//           Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
//           {
//             "salaryRanges": [
//               { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
//             ],
//             "growthRate": number,
//             "demandLevel": "High" | "Medium" | "Low",
//             "topSkills": ["skill1", "skill2"],
//             "marketOutlook": "Positive" | "Neutral" | "Negative",
//             "keyTrends": ["trend1", "trend2"],
//             "recommendedSkills": ["skill1", "skill2"]
//           }
          
//           IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
//           Include at least 5 common roles for salary ranges.
//           Growth rate should be a percentage.
//           Include at least 5 skills and trends.
//         `;

//   const result = await model.generateContent(prompt);
//   const response = result.response;
//   const text = response.text();
//   const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

//   return JSON.parse(cleanedText);
// };

// export async function getIndustryInsights() {
//   const { userId } = await auth();
//   if (!userId) throw new Error("Unauthorized");

//   const user = await db.user.findUnique({
//     where: { clerkUserId: userId },
//     include: {
//       industryInsight: true,
//     },
//   });

//   if (!user) throw new Error("User not found");

//   // If no insights exist, generate them
//   if (!user.industryInsight) {
//     const insights = await generateAIInsights(user.industry);

//     const industryInsight = await db.industryInsight.create({
//       data: {
//         industry: user.industry,
//         ...insights,
//         nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//       },
//     });

//     return industryInsight;
//   }

//   return user.industryInsight;
// }

"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";

/* ================== GENAI SETUP (FIXED) ================== */

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/* ================== AI INSIGHTS ================== */

export const generateAIInsights = async (industry) => {
  if (!industry) {
    throw new Error("Industry is required to generate insights");
  }

  const prompt = `
Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format:
{
  "salaryRanges": [
    { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
  ],
  "growthRate": number,
  "demandLevel": "HIGH" | "MEDIUM" | "LOW",
  "topSkills": ["skill1", "skill2"],
  "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
  "keyTrends": ["trend1", "trend2"],
  "recommendedSkills": ["skill1", "skill2"]
}
IMPORTANT:
- Return ONLY valid JSON
- No markdown
- No explanations
`;

  const result = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  });

  const text =
    result?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  const cleanedText = text.replace(/```(?:json)?/g, "").trim();

  try {
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("❌ Gemini returned invalid JSON:", cleanedText);
    throw new Error("Failed to parse AI insights");
  }
};

/* ================== DASHBOARD DATA ================== */

export async function getIndustryInsights() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      industryInsight: true,
    },
  });

  if (!user) throw new Error("User not found");

  // 🚨 Guard: onboarding not completed
  if (!user.industry) {
    return { needsOnboarding: true };
  }

  // Generate insights if missing
  if (!user.industryInsight) {
    const insights = await generateAIInsights(user.industry);

    const industryInsight = await db.industryInsight.create({
      data: {
        industry: user.industry,
        ...insights,
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return industryInsight;
  }

  return user.industryInsight;
}

